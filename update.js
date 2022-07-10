const {BrowserWindow, app, Tray, Menu, nativeImage} = require("electron");
const pie = require("puppeteer-in-electron")
const puppeteer = require("puppeteer-core");
const readline = require('readline');
const path = require('path')
const prompt2 = require('electron-prompt');
const NOTIFICATION_TITLE = 'Dialogflow Updater'
const NOTIFICATION_BODY = 'Dialogflow Updater Main process started';
(async () =>{
    await pie.initialize(app);
})();

let tray
function showNotification () {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

let done = false;
let agent;
let ints1;
let changeAgents;
let c = 0;
async function main () {

  
  const browser = await pie.connect(app, puppeteer);
 
  const window = new BrowserWindow({
    width: 1267,
    height: 700,
    webPreferences: {
        webSecurity: false,
        webviewTag: true,
        // devTools: true,
        nodeIntegration: true,
        nodeIntegrationInSubFrames: true,
        // preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '/assets/dfu.png'),
  });
  const url = "https://accounts.google.com/signin/v2/identifier";
  await window.loadURL(url);
  window.setProgressBar(c)
  const page = await pie.getPage(browser, window);
  await page.setViewport({ width: 1267, height: 571 })
  await page.waitForTimeout(2500);
    c = 0.1
    window.setProgressBar(c)
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
            console.log('user cancelled');
        } else {
            console.log('agent', r);
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
            console.log('user cancelled');
        } else {
            console.log('int index', r);
            ints1 = r
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
            console.log('user cancelled');
        } else {
            
            let changeAgents2 = r.split(' ');
            changeAgents = changeAgents2.map((elt)=>{
                let gh = elt + ' [en]'
                return gh
            })
            console.log('targets', changeAgents);
        }
    })
    .catch(console.error);
    await page.waitForTimeout(5500);
    await prompt2({
        title: 'Login Status',
        label: 'Are you logged in (true or false):',
        value: 'true',
        inputAttrs: {
            type: 'text',
            required: true
        },
        type: 'input'
    })
    .then(async(r) => {
        if(r === null) {
            console.log('user cancelled');
        } else {
            
           done = JSON.parse(r);
            console.log('done', done);
            
        }
    })
    .catch(console.error);
    if(done === true){
        c = 0.25
        window.setProgressBar(c)
        try {
            const url1 = 'https://dialogflow.cloud.google.com';
            //const window = new BrowserWindow();
              await window.loadURL(url1);
              const page1 = await pie.getPage(browser, window);
              await page1.waitForTimeout(15000);
              //await page1.waitForTimeout(5000);
              
              //await page1.waitForTimeout(10000);
              //select select agent button
              try {
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
                  c = 0.4
                  window.setProgressBar(c)
              } catch (error) {
                  return
              }
              await page1.waitForTimeout(5000);
              await page1.waitForTimeout(5000);
              await changeAgents.forEach(async(el, idx)=>{
                  await setTimeout(async() => {
                     //hover 
                    await page1.waitForTimeout(5000);
                    await page1.hover(`#main > div > div.workplace.ng-scope > div > div > div.ng-scope > ul > li:nth-child(${ints1}) > intents-list-item > div > div > span`,{ timeout: 0 })
                    await page1.waitForTimeout(2000);
                    console.log('hovering over intent')
                    await page1.waitForTimeout(5000);
                        //select intents
                        //scroll into view
                        await page1.waitForTimeout(1000);
                        await page1.waitForSelector(`#main > div > div.workplace.ng-scope > div > div > div.ng-scope > ul > li:nth-child(${ints1}) > intents-list-item > div > div > md-checkbox > div.md-container.md-ink-ripple`,{ timeout: 0 });
                        await page1.waitForTimeout(2000);
                        console.log(`selecting intent`)
                        await page1.click(`#main > div > div.workplace.ng-scope > div > div > div.ng-scope > ul > li:nth-child(${ints1}) > intents-list-item > div > div > md-checkbox > div.md-container.md-ink-ripple`)
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
                    c = 0.66
                    window.setProgressBar(c)
                  }, 30000 * idx);
                  
              })
              c = 1
              window.setProgressBar(c)
              NOTIFICATION_TITLE = 'Update Finished';
              NOTIFICATION_BODY = 'You can close the App';
              showNotification() 
        } catch (error) {
            NOTIFICATION_TITLE = 'An Error Occured';
            NOTIFICATION_BODY = error.message;
            showNotification()
        }
        
    }
  //console.log(page.url());
  //window.destroy();
  
      
      
      
};

const dockMenu = Menu.buildFromTemplate([
    {
      label: 'New Window',
      click () { console.log('New Window') }
    }, {
      label: 'New Window with Settings',
      submenu: [
        { label: 'Basic' },
        { label: 'Pro' }
      ]
    },
    { label: 'New Command...' }
  ])
  
  app.whenReady().then(() => {
    if (process.platform === 'darwin') {
      app.dock.setMenu(dockMenu)
    }
    const icon = nativeImage.createFromPath('./assets/dfu1.png')
    tray = new Tray(icon)
  }).then(main).then(showNotification)
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      main()
    }
  })
