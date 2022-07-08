const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const puppeteerExtra = require('puppeteer-extra');
const stealthPlugin = require('puppeteer-extra-plugin-stealth');
const dotenv = require('dotenv');
const readline = require('readline');
const ChromeLauncher = require('chrome-launcher');
const forEachAsync = require('forEachAsync');
var Sequence = require('sequence-js')
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
  const browser = await puppeteerExtra.launch({ headless: false, defaultViewport: null,args: [
    '--disable-web-security',
    '--disable-features=IsolateOrigins,site-per-process'
  ] });
  let agentsLen = changeAgents.length;
  
  
    // Close the new tab that chromium always opens first.
    
    // Create sequence and add some callbacks
   
    // loginSequence.exec(request, response) // will work fine, but no point here
    async function login(){
      const page = await browser.newPage();
      const pages = await browser.pages();
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
      await page.type('input[type="password"]', process.env.password);
      await page.waitForTimeout(2500);
      await page.keyboard.press('Enter');
      return
    }
    
    async function setUp(){
      const url = 'https://dialogflow.cloud.google.com';
      
      const page1 = await browser.newPage();
      await page1.waitForTimeout(15000);
      await page1.goto(url, {waitUntil: 'networkidle2', timeout: 0});
      await page1.setViewport({ width: 1267, height: 571 })
      await page1.waitForTimeout(5000);
      
      await page1.waitForTimeout(10000);
      //select select agent button
      await page1.waitForTimeout(1000);
      await page1.waitForSelector('#agents-dropdown-toggle > span.icon-right.icon-caret',{ timeout: 0 });
      await page1.waitForTimeout(2000);
      console.log('selecting select agent button')
      await page1.click('#agents-dropdown-toggle > span.icon-right.icon-caret')

      //select agent
      //scroll if needed
      await page1.waitForTimeout(2000);
      await page1.waitForSelector(`aria/${agent}`,{ timeout: 0 });
      //await scrollIntoViewIfNeeded(element, timeout);
      await page1.waitForTimeout(1000);
      console.log('selecting agent to copy from')
      await page1.click(`aria/${agent}`)
      await page1.waitForTimeout(5000);
      await page1.waitForTimeout(5000);
      return page1
    }
   
    
    login()
    .then(()=>{
      setUp()
      .then(async(page1)=>{
        await changeAgents.forEach(async(el, idx)=>{
          await setTimeout(async() => {
             //hover 
            await page1.waitForTimeout(5000);
            await page1.hover(`aria/${ints.name}`,{ timeout: 0 })
            await page1.waitForTimeout(2000);
            console.log('hovering over intent')
            await page1.waitForTimeout(5000);
                //select intents
                //scroll into view
                await page1.waitForTimeout(1000);
                await page1.waitForSelector(`#main > div > div.workplace.ng-scope > div > div > div.ng-scope > ul > li:nth-child(${ints.num}) > intents-list-item > div > div > md-checkbox > div.md-container.md-ink-ripple`,{ timeout: 0 });
                await page1.waitForTimeout(2000);
                console.log(`selecting intent`)
                await page1.click(`#main > div > div.workplace.ng-scope > div > div > div.ng-scope > ul > li:nth-child(${ints.num}) > intents-list-item > div > div > md-checkbox > div.md-container.md-ink-ripple`)
            await page1.waitForTimeout(1000);
              await page1.waitForSelector('aria/COPY',{ timeout: 0 });
              await page1.waitForTimeout(1000);
              console.log('selecting copy button')
              await page1.click('aria/COPY')

              //select intents and entities
              await page1.waitForSelector('.ng-scope > .md-dialog-content > .md-block:nth-child(4) > .md-primary > .md-container',{ timeout: 0 });
              await page1.waitForTimeout(2000);
              console.log('selecting overwrite entities')
              await page1.click('.ng-scope > .md-dialog-content > .md-block:nth-child(4) > .md-primary > .md-container')
              await page1.waitForTimeout(1000);
              await page1.waitForSelector('.ng-scope > .md-dialog-content > .md-block:nth-child(5) > .md-primary > .md-container',{ timeout: 0 });
              await page1.waitForTimeout(1000);
              console.log('selecting overwrite intents')
              await page1.click('.ng-scope > .md-dialog-content > .md-block:nth-child(5) > .md-primary > .md-container')
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
            
          }, 30000 * idx);
          
        })
      })
    })
    
    
   
}
let agnt = '3V-200-AS2-3238142611'
let intss = {
  name: '5-VoicemailNN Expand follow-up intents',
  num: '6'
}
let changeAgents = ['AvondalePolice [en]', 'Attendance [en]']
test(agnt, intss, changeAgents)