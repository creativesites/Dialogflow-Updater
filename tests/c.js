if (done === true) {
  c = 0.25
  window.setProgressBar(c)

  try {
    const url1 = 'https://dialogflow.cloud.google.com';
    //const window = new BrowserWindow();
    await window.loadURL(url1);
    const page1 = await pie.getPage(browser, window);
    await page1.waitForTimeout(15000);
    async function Backup() {
      await page1.waitForTimeout(10000);
      //click settings
      await page1.waitForSelector(`#link-settings-agent`, {
        timeout: 5000
      });
      //await scrollIntoViewIfNeeded(element, timeout);
      await page1.waitForTimeout(1500);
      console.log('selecting settings')
      await page1.click(`#link-settings-agent`);

      //click import/export
      await page1.waitForSelector(`aria/Export and Import`, {
        timeout: 5000
      });
      //await scrollIntoViewIfNeeded(element, timeout);
      await page1.waitForTimeout(1500);
      console.log('selecting import/export')
      await page1.click(`aria/Export and Import`);

      //click export button

      console.log('selecting export button')
      await page1.waitForTimeout(1000);
      const client = await page1.target().createCDPSession();
      await client.send("Page.setDownloadBehavior", {
        behavior: "allow",
        downloadPath: path.resolve(__dirname, "download")
      });

      await page1.waitForSelector(`aria/EXPORT AS ZIP`, {
        timeout: 5000
      });
      //await scrollIntoViewIfNeeded(element, timeout);
      await page1.waitForTimeout(2000);
      await page1.click(`aria/EXPORT AS ZIP`)



      await page1.waitForTimeout(15000);
    }
   
    async function runBackup(){
      await page1.waitForTimeout(5000);
    //await page1.waitForTimeout(10000);
    console.log('BACKUP')
    try {
      for (const el of changeAgents1) {
        try {
          console.log(`Backing up ${el}`)
          NOTIFICATION_TITLE = 'Backup Agents';
          NOTIFICATION_BODY = `Backing up ${el}`;
          showNotification()
          //select select agent button
          await page1.waitForTimeout(9000);
          await page1.waitForSelector('#agents-dropdown-toggle > span.icon-right.icon-caret', {
            timeout: 5000
          });
          await page1.waitForTimeout(1000);
          console.log('selecting select agent button')
          await page1.click('#agents-dropdown-toggle > span.icon-right.icon-caret')

          try {
            //select agent
            //scroll if needed
            await page1.waitForTimeout(5000);
            await page1.waitForSelector(`aria/${el}`, {
              timeout: 5000
            });
            //await scrollIntoViewIfNeeded(element, timeout);
            await page1.waitForTimeout(1000);
            console.log('selecting agent to copy from')
            await page1.click(`aria/${el}`);
            await Backup()
          } catch (error) {
            console.log('agent already selected')
            await page1.reload({
              waitUntil: ["networkidle0", "domcontentloaded"]
            });
            await page1.waitForTimeout(15000);
            await Backup()
          }


        } catch (error) {
          console.log(error)
          NOTIFICATION_TITLE = 'Backup Agents Error Occured';
          NOTIFICATION_BODY = error.message;
          showNotification()
        }
        c = 0.3
        window.setProgressBar(c)
        NOTIFICATION_TITLE = 'Backup Agents Finished';
        NOTIFICATION_BODY = 'Updating Entities Now';
        showNotification()
      }
    } catch (error) {
      appErrMsg = error.message;
      appErrStage = 'BACKUP';
      appErrM = `The following error occured on the BACKUP AGENTS stage: \n${error.message} `;
      NOTIFICATION_TITLE = 'OPERATION STOPPED!';
      NOTIFICATION_BODY = appErrM;
      showNotification()
      done = false;
      appErr = true;
    }
    }
    //await runBackup()
    
    

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
              await page1.waitForTimeout(5000);
              await page1.hover(`#main > div > div.workplace.ng-scope > div > div > div.ng-scope > ul > li:nth-child(${ints1[0]}) > intents-list-item > div > div > span`, {
                timeout: 5000
              })
              await page1.waitForTimeout(2000);
              log.info('hovering over intent')
              await page1.waitForTimeout(5000);
  
              for (const e5 of ints1) {
                //select intents
                //scroll into view
                await page1.waitForTimeout(1000);
                await page1.waitForSelector(`#main > div > div.workplace.ng-scope > div > div > div.ng-scope > ul > li:nth-child(${e5}) > intents-list-item > div > div > md-checkbox > div.md-container.md-ink-ripple`, {
                  timeout: 5000
                });
                await page1.waitForTimeout(2000);
                log.info(`selecting intent`)
                await page1.click(`#main > div > div.workplace.ng-scope > div > div > div.ng-scope > ul > li:nth-child(${e5}) > intents-list-item > div > div > md-checkbox > div.md-container.md-ink-ripple`)
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
  
          for (let idx = 0; idx < changeAgents.length; idx++) {
            const el5 = changeAgents[idx];
            console.log(`Updating ${el5} Intents`)
            NOTIFICATION_TITLE = `Updating ${el5} Intents`;
            NOTIFICATION_BODY = `running ${el5}`;
            showNotification()
            
              //hover 
              await page1.waitForTimeout(5000);
              await page1.hover(`#main > div > div.workplace.ng-scope > div > div > div.ng-scope > ul > li:nth-child(${ints1[0]}) > intents-list-item > div > div > span`, {
                timeout: 5000
              })
              await page1.waitForTimeout(2000);
              log.info('hovering over intent')
              await page1.waitForTimeout(5000);
  
              for (const e5 of ints1) {
                //select intents
                //scroll into view
                await page1.waitForTimeout(1000);
                await page1.waitForSelector(`#main > div > div.workplace.ng-scope > div > div > div.ng-scope > ul > li:nth-child(${e5}) > intents-list-item > div > div > md-checkbox > div.md-container.md-ink-ripple`, {
                  timeout: 5000
                });
                await page1.waitForTimeout(2000);
                log.info(`selecting intent`)
                await page1.click(`#main > div > div.workplace.ng-scope > div > div > div.ng-scope > ul > li:nth-child(${e5}) > intents-list-item > div > div > md-checkbox > div.md-container.md-ink-ripple`)
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
    

  } catch (error) {
      appErrMsg = error.message;
      appErrStage = 'INTENTS';
      appErrM = `The following error occured on the UPDATE INTENTS stage: \n${error.message} `;
      NOTIFICATION_TITLE = 'OPERATION STOPPED!';
      NOTIFICATION_BODY = appErrM;
      showNotification()
      done = false;
      appErr = true;
  }

}