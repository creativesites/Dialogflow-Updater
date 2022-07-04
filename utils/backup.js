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

exports.backup = async (req, res, next) => {
    let changeAgents = req.body.targets;
    console.log(req.body.targets)
    let jsonResponse = {}
    try {
        await test(changeAgents);  
        jsonResponse.message = "agents successfully backed up";
        res.status(200).json(jsonResponse);
    } catch (error) {
        res.status(401).json({
            message: "Error occured",
            error: error.mesage,
        });
    }
    
}