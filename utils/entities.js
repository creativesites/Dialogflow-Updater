const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const puppeteerExtra = require('puppeteer-extra');
const stealthPlugin = require('puppeteer-extra-plugin-stealth');
const dotenv = require('dotenv');
const readline = require('readline');
const prompt = (query, hidden = false) =>
  new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    try {
      if (hidden) {
        const stdin = process.openStdin();
        process.stdin.on('data', (char) => {
          char = char + '';
          switch (char) {
            case '\n':
            case '\r':
            case '\u0004':
              stdin.pause();
              break;
            default:
              process.stdout.clearLine(0);
              readline.cursorTo(process.stdout, 0);
              process.stdout.write(query + Array(rl.line.length + 1).join('*'));
              break;
          }
        });
      }
      rl.question(query, (value) => {
        resolve(value);
        rl.close();
      });
    } catch (err) {
      reject(err);
    }
});

dotenv.config();
async function test(agent, ints, changeAgents){
  puppeteerExtra.use(stealthPlugin());
  const browser = await puppeteerExtra.launch({ headless: true, defaultViewport: null,args: [
    '--disable-web-security',
    '--disable-features=IsolateOrigins,site-per-process'
  ] });
 
    
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
      let agentsLen = changeAgents.length;
      await page1.waitForTimeout(10000);
       //select select agent button
       await page1.waitForTimeout(9000);
       await page1.waitForSelector('#agents-dropdown-toggle > span.icon-right.icon-caret',{ timeout: 0 });
       await page1.waitForTimeout(1000);
       console.log('selecting select agent button')
       await page1.click('#agents-dropdown-toggle > span.icon-right.icon-caret')

       //select agent
       //scroll if needed
       console.log(agent)
       await page1.waitForTimeout(1500);
       await page1.waitForSelector(`aria/${agent}`,{ timeout: 0 });
       //await scrollIntoViewIfNeeded(element, timeout);
       await page1.waitForTimeout(1500);
       console.log('selecting agent to copy from')
       await page1.click(`aria/${agent}`)

       //click on entities
       await page1.waitForTimeout(10000);
       await page1.waitForSelector(`#link-list-entities > span.dl`,{ timeout: 0 });
       await page1.waitForTimeout(1500);
       console.log('clicking entities button')
       await page1.click(`#link-list-entities > span.dl`)
      await changeAgents.forEach(async(el, idx)=> {
        console.log(el)
        setTimeout(async() => {
          try {
           

           await ints.forEach(async(e, i)=>{
            setTimeout(async() => {
                await page1.waitForTimeout(10000);
                //hover 
                await page1.hover(`aria/${e[0]}`,{ timeout: 0 })
                await page1.waitForTimeout(2000);
                console.log('hovering over intent')
                //select intents
                //loop
                //parameters
                //scroll into view
                await page1.waitForTimeout(1000);
                await page1.waitForSelector(`#tab-content-112 > div > custom-entities-list > div > ul > li:nth-child(${e[1]}) > md-checkbox > div.md-container.md-ink-ripple`,{ timeout: 0 });
                await page1.waitForTimeout(2000);
                console.log('selecting intent')
                await page1.click(`#tab-content-112 > div > custom-entities-list > div > ul > li:nth-child(${e[1]}) > md-checkbox > div.md-container.md-ink-ripple`)
                
                
            }, 28000 * i);
           })
           //select copy button
           await page1.waitForTimeout(1000);
           await page1.waitForSelector('aria/COPY',{ timeout: 0 });
           await page1.waitForTimeout(1000);
           console.log('selecting copy button')
           await page1.click('aria/COPY')

           //select intents and entities
           await page1.waitForSelector('#dialogContent_114 > batch-popup > md-dialog-content > div > md-input-container:nth-child(4) > md-checkbox > div.md-container.md-ink-ripple',{ timeout: 0 });
           await page1.waitForTimeout(2000);
           console.log('selecting overwrite entities')
           await page1.click('#dialogContent_114 > batch-popup > md-dialog-content > div > md-input-container:nth-child(4) > md-checkbox > div.md-container.md-ink-ripple')
           await page1.waitForTimeout(1000);
           

             //select agent
           await page1.waitForSelector('aria/Destination agent',{ timeout: 0 })
           console.log('selecting selct agent')
           await page1.waitForTimeout(1000);
           await page1.click('aria/Destination agent')

         //select the agent
         //first level loop
         //parameters
         await page1.waitForSelector(`aria/${el}`,{ timeout: 0 })
         console.log('selecting agent')
         await page1.waitForTimeout(1000);
         await page1.click(`aria/${el}`)

         //copy intents
         
         await page1.waitForSelector('aria/START',{ timeout: 0 })
         console.log('selecting START')
         await page1.waitForTimeout(2000);
         await page1.click('aria/START')

         await page1.waitForSelector('aria/DONE',{ timeout: 0 })
         console.log('selecting DONE')
         await page1.waitForTimeout(2000);
         await page1.click('aria/DONE')
            
              
          } catch (error) {
            
          }
        }, 41000 * idx * agentsLen);
      });
      
        
     // await browser.close()
     
      
      
    }, 15000);
    
   
}

exports.entities = async (req, res, next) =>{
    let agent = req.body.agent;
    let ints = req.body.entities;
    let changeAgents = req.body.targets;
    console.log(changeAgents)
    let jsonResponse = {};
    try {
        await test(agent, ints, changeAgents);
        jsonResponse.message = "changes successfully done";
        res.status(200).json(jsonResponse);
    } catch (error) {
        res.status(401).json({
            message: "Error occured",
            error: error.mesage,
        });
    }
}