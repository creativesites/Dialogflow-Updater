const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const puppeteerExtra = require('puppeteer-extra');
const stealthPlugin = require('puppeteer-extra-plugin-stealth');
const dotenv = require('dotenv');
const readline = require('readline');
const fs = require('fs')
const ChromeLauncher = require('chrome-launcher');
const jsonfile = require('jsonfile');
puppeteerExtra.use(stealthPlugin());
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
const innit = async () => {
  
  const browser = await puppeteerExtra.launch({ headless: false, defaultViewport: null,args: [
    '--disable-web-security',
    '--disable-features=IsolateOrigins,site-per-process'
  ] });
    const page = await browser.newPage();
    const pages = await browser.pages();
    // Close the new tab that chromium always opens first.
    pages[0].close();
    /*Your login code*/
    await page.goto('https://accounts.google.com/signin/v2/identifier', { waitUntil: 'networkidle2', timeout: 0 });
    await page.waitForSelector('#identifierId');
    //const email = await prompt('Email or phone: ');
    await page.type('#identifierId', 'creativesites263@gmail.com');
    await page.waitForTimeout(2500);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1500);
    const password = await prompt('Enter your password: ', true);
    console.log('Finishing up...');
    // Wait for password input
    await page.waitForSelector('input[type="password"]');
    await page.type('input[type="password"]', password);
    await page.waitForTimeout(2500);
    await page.keyboard.press('Enter');

    //save cookies
  
    const cookies = JSON.stringify(await page.cookies());
    const sessionStorage = await page.evaluate(() =>JSON.stringify(sessionStorage));
    const localStorage = await page.evaluate(() => JSON.stringify(localStorage));
  
    //await fs.writeFile("./session/cookies.json", cookies);
    await jsonfile.writeFile("./session/cookies.json", cookies)
    .then(res1 => {
        console.log('Write complete')
    })
    .catch(error => console.error(error)); 
    //await fs.writeFile("./session/sessionStorage.json", sessionStorage);
    await jsonfile.writeFile("./session/sessionStorage.json", sessionStorage)
    .then(res1 => {
        console.log('Write complete')
    })
    .catch(error => console.error(error)); 
    //await fs.writeFile("./session/localStorage.json", localStorage);
    await jsonfile.writeFile("./session/localStorage.json", localStorage)
    .then(res1 => {
        console.log('Write complete')
    })
    .catch(error => console.error(error)); 
    browser.disconnect();
};

const innit1 = async () => {
    const browser = await puppeteerExtra.connect({
      browserWSEndpoint: `ws://localhost:3000?keepalive=300000`,
    });
    const page = await browser.newPage();
  
    await page.goto("https://www.goodreads.com/user/sign_in");
    await page.click(".authPortalConnectButton");
    await page.waitForNetworkIdle();
    
    await page.type("#ap_email", "****");
    await page.type("#ap_password", "****");
    await page.click("#signInSubmit");
    await page.waitForNetworkIdle();
    browser.disconnect();
}

const start = async (agent, ints, changeAgents) => {
    //await innit();
    const browser = await puppeteerExtra.launch({ headless: false, defaultViewport: null,args: [
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process'
    ] });
    const page1 = await browser.newPage();
    let cookiesString;
    await jsonfile.readFile("./session/cookies.json", function (err, obj) {
      if (err) console.error(err)
      cookiesString = obj;
    })
    
  
    let sessionStorageString;
    await jsonfile.readFile("./session/sessionStorage.json", function (err, obj) {
      if (err) console.error(err)
      sessionStorageString = obj;
    })
   
  
    let localStorageString;
    await jsonfile.readFile("./session/localStorage.json", function (err, obj) {
      if (err) console.error(err)
      localStorageString = obj;
    })
    
  
    
    let cookies;
    let sessionStorage;
    let localStorage;
    setTimeout(async() => {
      cookies = JSON.parse(cookiesString);
      sessionStorage = JSON.parse(sessionStorageString);
      localStorage = JSON.parse(localStorageString);
      await page1.setCookie(...cookies);
  
    await page1.evaluate((data) => {
      for (const [key, value] of Object.entries(data)) {
        sessionStorage[key] = value;
      }
    }, sessionStorage);
  
    await page1.evaluate((data) => {
      for (const [key, value] of Object.entries(data)) {
        localStorage[key] = value;
      }
    }, sessionStorage);

    }, 3000);
   setTimeout(async() => {
    const url = 'https://dialogflow.cloud.google.com';
    
    await page1.goto(url, {waitUntil: 'networkidle2', timeout: 0});
    await page1.setViewport({ width: 1267, height: 571 })
    await page1.waitForTimeout(5000);
    let agentsLen = changeAgents.length;
    await page1.waitForTimeout(10000);
    await changeAgents.forEach(async(el, idx)=> {
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
          await page1.waitForTimeout(1500);
          await page1.waitForSelector(`aria/${agent}`,{ timeout: 0 });
          //await scrollIntoViewIfNeeded(element, timeout);
          await page1.waitForTimeout(1500);
          console.log('selecting agent to copy from')
          await page1.click(`aria/${agent}`)

          await ints.forEach(async(e, i)=>{
          setTimeout(async() => {
              await page1.waitForTimeout(10000);
              //hover 
              await page1.hover(`aria/${e.name}`,{ timeout: 0 })
              await page1.waitForTimeout(2000);
              console.log('hovering over intent')
              //select intents
              //loop
              //parameters
              //scroll into view
              await page1.waitForTimeout(1000);
              await page1.waitForSelector(`#main > div > div.workplace.ng-scope > div > div > div.ng-scope > ul > li:nth-child(${e.num}) > intents-list-item > div > div > md-checkbox > div.md-container.md-ink-ripple`,{ timeout: 0 });
              await page1.waitForTimeout(2000);
              console.log('selecting intent')
              await page1.click(`#main > div > div.workplace.ng-scope > div > div > div.ng-scope > ul > li:nth-child(${e.num}) > intents-list-item > div > div > md-checkbox > div.md-container.md-ink-ripple`)
              
              //select copy button
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
            await page1.click('aria/AvondalePolice [en]')

            //copy intents
            
            await page1.waitForSelector('aria/START',{ timeout: 0 })
            console.log('selecting START')
            await page1.waitForTimeout(2000);
            await page1.click('aria/START')

            await page1.waitForSelector('aria/DONE',{ timeout: 0 })
            console.log('selecting DONE')
            await page1.waitForTimeout(2000);
            await page1.click('aria/DONE')
          }, 28000 * i);
          })
          
            
        } catch (error) {
          
        }
      }, 41000 * idx * agentsLen);
    });
   }, 5000);
};

let agnt = '3V-200-AS2-3238142611'
let intss = [
  {
    name: '1-GreetingEA Expand follow-up intents',
    num: '4'
  },
  {
    name: '5-VoicemailNN Expand follow-up intents',
    num: '6'
  }
]
let changeAgents = ['AvondalePolice [en]']
//innit()
start(agnt, intss, changeAgents)