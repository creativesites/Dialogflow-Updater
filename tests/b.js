try {
  await page1.waitForTimeout(5000);

  NOTIFICATION_TITLE = 'Starting Updating Entities';
  NOTIFICATION_BODY = `running`;
  showNotification()
  //select select agent button
  await page1.waitForTimeout(15000);
  await page1.waitForSelector('#agents-dropdown-toggle > span.icon-right.icon-caret', {
    timeout: 5000
  });
  await page1.waitForTimeout(5000);
  console.log('selecting select agent button')
  await page1.click('#agents-dropdown-toggle > span.icon-right.icon-caret')

  try {
    //select agent
    //scroll if needed
    console.log(agent)
    await page1.waitForTimeout(1500);
    await page1.waitForSelector(`aria/${agent}`, {
      timeout: 5000
    });
    //await scrollIntoViewIfNeeded(element, timeout);
    await page1.waitForTimeout(1500);
    console.log('selecting agent to copy from')
    await page1.click(`aria/${agent}`)
    //click on entities
    await page1.waitForTimeout(10000);
    await page1.waitForSelector(`#link-list-entities > span.dl`, {
      timeout: 5000
    });
    await page1.waitForTimeout(1500);
    console.log('clicking entities button')
    await page1.click(`#link-list-entities > span.dl`)
    await page1.waitForTimeout(5000);
    await (async () => {

      for (let index = 0; index < changeAgents.length; index++) {
        const el4 = changeAgents[index];
        console.log(`Updating ${el4} Entities`)
        NOTIFICATION_TITLE = `Updating ${el4} Entities`;
        NOTIFICATION_BODY = `running ${el4}`;
        showNotification()
        await page1.waitForTimeout(10000);
        if (index === 0) {
          //hover 
          console.log('hovering over entity')
          
          await page1.waitForXPath(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/entities-page/div/md-tabs/md-tabs-content-wrapper/md-tab-content[1]/div/custom-entities-list/div/ul/li[${ents[0]}]`, {timeout: 5000});
          await page1.waitForTimeout(1000);
          let dgf = await page1.$x(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/entities-page/div/md-tabs/md-tabs-content-wrapper/md-tab-content[1]/div/custom-entities-list/div/ul/li[${ents[0]}]`, {timeout: 5000});
          await dgf[0].hover()
          


          await page1.waitForTimeout(2000);
          console.log('hovering done')
          for (let i = 0; i < ents.length; i++) {
            const e4 = ents[i]
            if (i == 22) {

              await page1.waitForTimeout(1000);
              let ghl = await page1.waitForSelector('#tab-content-13 > div > custom-entities-list > div > ul > div.paging-footer.ng-isolate-scope > div > a.next > span', {
                timeout: 5000
              });
              await scrollIntoViewIfNeeded(ghl, 5000);
              await page1.waitForTimeout(1000);
              console.log('scrolling')
              await page1.click('#tab-content-13 > div > custom-entities-list > div > ul > div.paging-footer.ng-isolate-scope > div > a.next > span')
            }
            await page1.waitForTimeout(4000);
            await page1.waitForXPath(`html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/entities-page/div/md-tabs/md-tabs-content-wrapper/md-tab-content[1]/div/custom-entities-list/div/ul/li[${e4}]/md-checkbox/div[1]`, {
              timeout: 5000
            });
            await page1.waitForTimeout(1000);
            let ell1 = await page1.$x(`html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/entities-page/div/md-tabs/md-tabs-content-wrapper/md-tab-content[1]/div/custom-entities-list/div/ul/li[${e4}]/md-checkbox/div[1]`, {
              timeout: 5000
            });
            await ell1[0].click();
          }
        }
        //select copy button
        await page1.waitForTimeout(1000);
        await page1.waitForSelector('aria/COPY', {
          timeout: 5000
        });
        await page1.waitForTimeout(1000);
        console.log('selecting copy button')
        await page1.click('aria/COPY')

        //select intents and entities
        //select intents and entities
        await page1.waitForXPath('/html/body/div[1]/div[5]/md-dialog/batch-popup/md-dialog-content/div/md-input-container[2]/md-checkbox');
        await page1.waitForTimeout(1000);
        let ell2 = await page1.$x(`/html/body/div[1]/div[5]/md-dialog/batch-popup/md-dialog-content/div/md-input-container[2]/md-checkbox`);
        await ell2[0].click();
        console.log('selecting overwrite entities')
        //await page1.click('#dialogContent_72 > batch-popup > md-dialog-content > div > md-input-container:nth-child(4) > md-checkbox')
        await page1.waitForTimeout(1000);


        //select agent
        await page1.waitForSelector('aria/Destination agent', {
          timeout: 5000
        })
        console.log('selecting selct agent')
        await page1.waitForTimeout(1000);
        await page1.click('aria/Destination agent')

        //select the agent
        //first level loop
        //parameters
        await page1.waitForSelector(`aria/${el4}`, {
          timeout: 5000
        })
        console.log('selecting agent')
        await page1.waitForTimeout(1000);
        await page1.click(`aria/${el4}`)

        //copy intents

        await page1.waitForSelector('aria/START', {
          timeout: 5000
        })
        console.log('selecting START')
        await page1.waitForTimeout(2000);
        await page1.click('aria/START')

        await page1.waitForSelector('aria/DONE', {
          timeout: 5000
        })
        console.log('selecting DONE')
        await page1.waitForTimeout(2000);
        await page1.click('aria/DONE')
      }
    })()
    c = 0.6
    window.setProgressBar(c)
    NOTIFICATION_TITLE = 'Update Entities Finished';
    NOTIFICATION_BODY = 'Updating Intents Now';
    showNotification()
    //await page1.waitForTimeout(5000);
    await page1.waitForTimeout(10000);
  } catch (error) {
    console.log('agent already selected')
    await page1.reload({
      waitUntil: ["networkidle0", "domcontentloaded"]
    });
    await page1.waitForTimeout(5000);
    //click on entities
    await page1.waitForTimeout(5000);
    await page1.waitForSelector(`#link-list-entities > span.dl`, {
      timeout: 5000
    });
    await page1.waitForTimeout(1500);
    console.log('clicking entities button')
    await page1.click(`#link-list-entities > span.dl`)
    await page1.waitForTimeout(5000);
    await (async () => {

      for (let index = 0; index < changeAgents.length; index++) {
        const el4 = changeAgents[index];
        console.log(`Updating ${el4} Entities`)
        NOTIFICATION_TITLE = `Updating ${el4} Entities`;
        NOTIFICATION_BODY = `running ${el4}`;
        showNotification()
        await page1.waitForTimeout(5000);
        if (index === 0) {
          //hover 
          console.log('hovering over entity')
          
          await page1.waitForXPath(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/entities-page/div/md-tabs/md-tabs-content-wrapper/md-tab-content[1]/div/custom-entities-list/div/ul/li[${ents[0]}]`, {timeout: 5000});
          await page1.waitForTimeout(1000);
          let dgf = await page1.$x(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/entities-page/div/md-tabs/md-tabs-content-wrapper/md-tab-content[1]/div/custom-entities-list/div/ul/li[${ents[0]}]`, {timeout: 5000});
          await dgf[0].hover()


          await page1.waitForTimeout(2000);
          console.log('hovering done')

          for (let i = 0; i < ents.length; i++) {
            const e4 = ents[i]
            if (i == 22) {

              await page1.waitForTimeout(1000);
              let ghl = await page1.waitForSelector('#tab-content-13 > div > custom-entities-list > div > ul > div.paging-footer.ng-isolate-scope > div > a.next > span', {
                timeout: 5000
              });
              await scrollIntoViewIfNeeded(ghl, 5000);
              await page1.waitForTimeout(1000);
              console.log('scrolling')
              await page1.click('#tab-content-13 > div > custom-entities-list > div > ul > div.paging-footer.ng-isolate-scope > div > a.next > span')
            }
            await page1.waitForTimeout(4000);
            await page1.waitForXPath(`html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/entities-page/div/md-tabs/md-tabs-content-wrapper/md-tab-content[1]/div/custom-entities-list/div/ul/li[${e4}]/md-checkbox/div[1]`, {
              timeout: 5000
            });
            await page1.waitForTimeout(1000);
            let ell1 = await page1.$x(`html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/entities-page/div/md-tabs/md-tabs-content-wrapper/md-tab-content[1]/div/custom-entities-list/div/ul/li[${e4}]/md-checkbox/div[1]`, {
              timeout: 5000
            });
            await ell1[0].click();
          }
        }
        //select copy button
        await page1.waitForTimeout(1000);
        await page1.waitForSelector('aria/COPY', {
          timeout: 5000
        });
        await page1.waitForTimeout(1000);
        console.log('selecting copy button')
        await page1.click('aria/COPY')

        //select intents and entities
        //select intents and entities
        await page1.waitForXPath('/html/body/div[1]/div[5]/md-dialog/batch-popup/md-dialog-content/div/md-input-container[2]/md-checkbox');
        await page1.waitForTimeout(1000);
        let ell2 = await page1.$x(`/html/body/div[1]/div[5]/md-dialog/batch-popup/md-dialog-content/div/md-input-container[2]/md-checkbox`);
        await ell2[0].click();
        console.log('selecting overwrite entities')
        //await page1.click('#dialogContent_72 > batch-popup > md-dialog-content > div > md-input-container:nth-child(4) > md-checkbox')
        await page1.waitForTimeout(1000);


        //select agent
        await page1.waitForSelector('aria/Destination agent', {
          timeout: 5000
        })
        console.log('selecting selct agent')
        await page1.waitForTimeout(1000);
        await page1.click('aria/Destination agent')

        //select the agent
        //first level loop
        //parameters
        await page1.waitForSelector(`aria/${el4}`, {
          timeout: 5000
        })
        console.log('selecting agent')
        await page1.waitForTimeout(1000);
        await page1.click(`aria/${el4}`)

        //copy intents

        await page1.waitForSelector('aria/START', {
          timeout: 5000
        })
        console.log('selecting START')
        await page1.waitForTimeout(2000);
        await page1.click('aria/START')

        await page1.waitForSelector('aria/DONE', {
          timeout: 5000
        })
        console.log('selecting DONE')
        await page1.waitForTimeout(2000);
        await page1.click('aria/DONE')
      }
    })()
    c = 0.6
    window.setProgressBar(c)
    NOTIFICATION_TITLE = 'Update Entities Finished';
    NOTIFICATION_BODY = 'Updating Intents Now';
    showNotification()
  }
} catch (error) {
  console.log(error)
  appErrMsg = error.message;
  appErrStage = 'ENTITIES';
  appErrM = `The following error occured on the UPDATE ENTITIES stage: \n${error.message} `;
  NOTIFICATION_TITLE = 'OPERATION STOPPED!';
  NOTIFICATION_BODY = appErrM;
  showNotification()
  done = false;
  appErr = true;
}


//update intents
try {
  try {
    await page1.waitForTimeout(1000);
    await page1.waitForSelector('#agents-dropdown-toggle > span.icon-right.icon-caret', {
      timeout: 5000
    });
    await page1.waitForTimeout(2000);
    log.info('selecting select agent button')

    await page1.click('#agents-dropdown-toggle > span.icon-right.icon-caret')

    //select agent
    //scroll if needed
    await page1.waitForTimeout(2000);
    await page1.waitForSelector(`aria/${agent}`, {
      timeout: 5000
    });
    //await scrollIntoViewIfNeeded(element, timeout);
    await page1.waitForTimeout(1000);
    log.info('selecting agent to copy from')

    await page1.click(`aria/${agent}`)
    c = 0.4
    window.setProgressBar(c)
    await page1.waitForTimeout(5000);
    await page1.waitForTimeout(5000);
    await (async () => {

      for (let idx = 0; idx < changeAgents.length; idx++) {
        const el5 = changeAgents[idx];
        console.log(`Updating ${el5} Intents`)
        NOTIFICATION_TITLE = `Updating ${el5} Intents`;
        NOTIFICATION_BODY = `running ${el5}`;
        showNotification()

         //hover 
         await page1.waitForTimeout(1000);
         await page1.waitForXPath(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div/div[2]/ul/li[${ints1[0]}]/intents-list-item/div`)
         await page1.waitForTimeout(1000);
         let ell24 = await page1.$x(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div/div[2]/ul/li[${ints1[0]}]/intents-list-item/div`);
         await ell24[0].hover()
         
         await page1.waitForTimeout(1000);
         console.log('hovering over intent')
         await page1.waitForTimeout(1000);

        for (const e5 of ints1) {
          //select intents
          //scroll into view
          await page1.waitForTimeout(1000);

          await page1.waitForXPath(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div/div[2]/ul/li[${e5}]/intents-list-item/div/div/md-checkbox`);
          await page1.waitForTimeout(1000);
          let ell23 = await page1.$x(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div/div[2]/ul/li[${e5}]/intents-list-item/div/div/md-checkbox`);
          await ell23[0].click();
          console.log('selecting overwrite entities')
          await page1.waitForTimeout(1000);
        }


        await page1.waitForSelector('aria/COPY', {
          timeout: 5000
        });
        await page1.waitForTimeout(1000);
        log.info('selecting copy button')
        await page1.click('aria/COPY')

        //select intents and entities
        await page1.waitForSelector('.ng-scope > .md-dialog-content > .md-block:nth-child(4) > .md-primary > .md-container', {
          timeout: 5000
        });
        await page1.waitForTimeout(2000);
        log.info('selecting overwrite entities')
        await page1.click('.ng-scope > .md-dialog-content > .md-block:nth-child(4) > .md-primary > .md-container')
        await page1.waitForTimeout(1000);
        await page1.waitForSelector('.ng-scope > .md-dialog-content > .md-block:nth-child(5) > .md-primary > .md-container', {
          timeout: 5000
        });
        await page1.waitForTimeout(1000);
        log.info('selecting overwrite intents')
        await page1.click('.ng-scope > .md-dialog-content > .md-block:nth-child(5) > .md-primary > .md-container')
        await page1.waitForTimeout(1000);

        //select agent
        await page1.waitForSelector('aria/Destination agent', {
          timeout: 5000
        })
        log.info('selecting selct agent')
        await page1.waitForTimeout(1000);
        await page1.click('aria/Destination agent')

        //select the agent
        //first level loop
        //parameters
        await page1.waitForSelector(`aria/${el5}`, {
          timeout: 5000
        })
        log.info('selecting agent')
        await page1.waitForTimeout(1000);
        await page1.click(`aria/${el5}`)

        //copy intents

        await page1.waitForSelector('aria/START', {
          timeout: 5000
        })
        log.info('selecting START')
        await page1.waitForTimeout(2000);
        await page1.click('aria/START')

        await page1.waitForSelector('aria/DONE', {
          timeout: 5000
        })
        log.info('selecting DONE')
        await page1.waitForTimeout(2000);
        await page1.click('aria/DONE')
        c = 0.76
        window.setProgressBar(c)
      }

    })()

    c = 1
    window.setProgressBar(c)
    NOTIFICATION_TITLE = 'Update Finished';
    NOTIFICATION_BODY = 'You can close the App';
    showNotification()
  } catch (error) {
    console.log('agent already selected')
    await page1.reload({
      waitUntil: ["networkidle0", "domcontentloaded"]
    });
    await page1.waitForTimeout(15000);
    await page1.waitForTimeout(5000);
    await (async () => {
      await page1.waitForTimeout(10000);
      for (let idx = 0; idx < changeAgents.length; idx++) {
        const el5 = changeAgents[idx];
        console.log(`Updating ${el5} Intents`)
        NOTIFICATION_TITLE = `Updating ${el5} Intents`;
        NOTIFICATION_BODY = `running ${el5}`;
        showNotification()

        //hover 
        await page1.waitForTimeout(1000);
        await page1.waitForXPath(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div/div[2]/ul/li[${ints1[0]}]/intents-list-item/div`)
        await page1.waitForTimeout(1000);
        let ell24 = await page1.$x(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div/div[2]/ul/li[${ints1[0]}]/intents-list-item/div`);
        await ell24[0].hover()
        
        await page1.waitForTimeout(1000);
        console.log('hovering over intent')
        await page1.waitForTimeout(1000);

        for (const e5 of ints1) {
          //select intents
          //scroll into view
         await page1.waitForTimeout(1000);

          await page1.waitForXPath(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div/div[2]/ul/li[${e5}]/intents-list-item/div/div/md-checkbox`);
          await page1.waitForTimeout(1000);
          let ell23 = await page1.$x(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div/div[2]/ul/li[${e5}]/intents-list-item/div/div/md-checkbox`);
          await ell23[0].click();
          console.log('selecting overwrite entities')
          await page1.waitForTimeout(1000);
        }


        await page1.waitForSelector('aria/COPY', {
          timeout: 5000
        });
        await page1.waitForTimeout(1000);
        log.info('selecting copy button')
        await page1.click('aria/COPY')

        //select intents and entities
        await page1.waitForSelector('.ng-scope > .md-dialog-content > .md-block:nth-child(4) > .md-primary > .md-container', {
          timeout: 5000
        });
        await page1.waitForTimeout(2000);
        log.info('selecting overwrite entities')
        await page1.click('.ng-scope > .md-dialog-content > .md-block:nth-child(4) > .md-primary > .md-container')
        await page1.waitForTimeout(1000);
        await page1.waitForSelector('.ng-scope > .md-dialog-content > .md-block:nth-child(5) > .md-primary > .md-container', {
          timeout: 5000
        });
        await page1.waitForTimeout(1000);
        log.info('selecting overwrite intents')
        await page1.click('.ng-scope > .md-dialog-content > .md-block:nth-child(5) > .md-primary > .md-container')
        await page1.waitForTimeout(1000);

        //select agent
        await page1.waitForSelector('aria/Destination agent', {
          timeout: 5000
        })
        log.info('selecting selct agent')
        await page1.waitForTimeout(1000);
        await page1.click('aria/Destination agent')

        //select the agent
        //first level loop
        //parameters
        await page1.waitForSelector(`aria/${el5}`, {
          timeout: 5000
        })
        log.info('selecting agent')
        await page1.waitForTimeout(1000);
        await page1.click(`aria/${el5}`)

        //copy intents

        await page1.waitForSelector('aria/START', {
          timeout: 5000
        })
        log.info('selecting START')
        await page1.waitForTimeout(2000);
        await page1.click('aria/START')

        await page1.waitForSelector('aria/DONE', {
          timeout: 5000
        })
        log.info('selecting DONE')
        await page1.waitForTimeout(2000);
        await page1.click('aria/DONE')
        c = 0.76
        window.setProgressBar(c)
      }

    })()

    c = 1
    window.setProgressBar(c)
    NOTIFICATION_TITLE = 'Update Finished';
    NOTIFICATION_BODY = 'You can close the App';
    showNotification()
  }
} catch (error) {
  console.log(error)
}