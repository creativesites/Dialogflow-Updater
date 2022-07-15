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

  for (const el4 of changeAgents1) {
    console.log(`Updating ${el4} Entities`)
    NOTIFICATION_TITLE = `Updating ${el4} Entities`;
    NOTIFICATION_BODY = `running ${el4}`;
    showNotification()
    await page1.waitForTimeout(5000);
    //hover 
    console.log('hovering over entity')
    await page1.waitForSelector(`aria/${entsName}`)
    await page1.hover(`aria/${entsName}`, {
      timeout: 5000
    })


    await page1.waitForTimeout(2000);
    console.log('hovering done')
    for (const e4 of ents) {
      //select intents
      //loop
      //parameters
      //scroll into view
      

      console.log(`clicking ${e4}`)
      await page1.waitForTimeout(1000);
      await page1.waitForXPath(`html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/entities-page/div/md-tabs/md-tabs-content-wrapper/md-tab-content[1]/div/custom-entities-list/div/ul/li[${e4}]/md-checkbox/div[1]`, {
        timeout: 5000
      });
      await page1.waitForTimeout(1000);
      let ell1 = await page1.$x(`html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/entities-page/div/md-tabs/md-tabs-content-wrapper/md-tab-content[1]/div/custom-entities-list/div/ul/li[${e4}]/md-checkbox/div[1]`,{
        timeout: 5000
      });
      await ell1[0].click();
     
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