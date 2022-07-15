//#tab-content-293 > div > custom-entities-list > div > ul > li:nth-child(2) > a > span




async function test(changeAgents){
    puppeteerExtra.use(stealthPlugin());
    const browser = await puppeteerExtra.launch({ headless: false, defaultViewport: null,args: [
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process'
    ] });
    console.log(changeAgents)
    
      const page = await browser.newPage();
      const pages = await browser.pages();
      // Close the new tab that chromium always opens first.
      pages[0].close();
      await page.goto('https://accounts.google.com/signin/v2/identifier', { waitUntil: 'networkidle2', timeout: 0 });
      await page.waitForSelector('#identifierId');
      //const email = await prompt('Email or phone: ');
      await page.type('#identifierId', process.env.gmailUsername);
      await page.waitForTimeout(1500);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(1500);
      const password = await prompt('Enter your password: ', true);
      console.log('Finishing up...');
      // Wait for password input
      await page.waitForSelector('input[type="password"]');
      await page.type('input[type="password"]', password);
      await page.waitForTimeout(2500);
      await page.keyboard.press('Enter');
  
      const url = 'https://dialogflow.cloud.google.com';
      setTimeout(async() => {
       
  
  
        const page1 = await browser.newPage();
        await page1.goto(url, {waitUntil: 'networkidle2', timeout: 0});
        await page1.setViewport({ width: 1267, height: 571 })
        await page1.waitForTimeout(5000);
        await page1.waitForTimeout(10000);
        await changeAgents.forEach(async(el, idx)=> {
          el = el.slice(0, -5);
          console.log(el)
          setTimeout(async() => {
            try {
              //select select agent button
              await page1.waitForTimeout(9000);
              await page1.waitForSelector('#agents-dropdown-toggle > span.icon-right.icon-caret',{ timeout: 0 });
              await page1.waitForTimeout(1000);
              console.log('selecting select agent button')
              await page1.click('#agents-dropdown-toggle > span.icon-right.icon-caret')
  
              //select agent
              //scroll if needed
              await page1.waitForTimeout(5000);
              await page1.waitForSelector(`aria/${el}`,{ timeout: 0 });
              //await scrollIntoViewIfNeeded(element, timeout);
              await page1.waitForTimeout(1000);
              console.log('selecting agent to copy from')
              await page1.click(`aria/${el}`);

              await page1.waitForTimeout(10000);
                //click settings
              await page1.waitForSelector(`#link-settings-agent`,{ timeout: 0 });
              //await scrollIntoViewIfNeeded(element, timeout);
              await page1.waitForTimeout(1500);
              console.log('selecting settings')
              await page1.click(`#link-settings-agent`);

              //click import/export
              await page1.waitForSelector(`aria/Export and Import`,{ timeout: 0 });
              //await scrollIntoViewIfNeeded(element, timeout);
              await page1.waitForTimeout(1500);
              console.log('selecting import/export')
              await page1.click(`aria/Export and Import`);

              //click export button
              await page1.waitForSelector(`aria/EXPORT AS ZIP`,{ timeout: 0 });
              //await scrollIntoViewIfNeeded(element, timeout);
              await page1.waitForTimeout(1000);
              console.log('selecting export button')
              await page1.click(`aria/EXPORT AS ZIP`);
  
            
                
            } catch (error) {
              
            }
          }, 32000 * idx );
        await browser.close()
        });
        
          
  
       
        
        
      }, 15000);
      
     
  }

  await prompt2({
    title: 'Source Agent',
    label: 'Source Agent Name:',
    value: '',
    inputAttrs: {
        type: 'text',
        required: true
    },
    type: 'input'
})
.then((r) => {
    if(r === null) {
        log.info('user cancelled');
    } else {
        log.info('agent', r);
        agent = r
    }
})
.catch(console.error);

await page.waitForTimeout(2500);
await prompt2({
    title: 'Intent Index',
    label: 'Intent Index(If intent is number 2 from the top, index is 3):',
    value: '',
    inputAttrs: {
        type: 'text',
        required: true
    },
    type: 'input'
})
.then((r) => {
    if(r === null) {
        log.info('user cancelled');
    } else {
        log.info('int index', r);
        ints1 = r.split(' ');
    }
})
.catch(console.error);
await page.waitForTimeout(2500);
await prompt2({
    title: 'Target Agents',
    label: 'Target Agents:',
    value: '',
    inputAttrs: {
        type: 'text',
        required: true
    },
    type: 'input'
})
.then((r) => {
    if(r === null) {
        log.info('user cancelled');
    } else {
        
        let changeAgents2 = r.split(' ');
        changeAgents = changeAgents2.map((elt)=>{
            let gh = elt + ' [en]'
            return gh
        })
        changeAgents1 = r.split(' ');
        log.info('targets', changeAgents);
    }
})
.catch(console.error);