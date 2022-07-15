const {
  BrowserWindow,
  app,
  Tray,
  Menu,
  nativeImage,
  ipcMain,
  ipcRenderer,
  Notification
} = require("electron");
const pie = require("puppeteer-in-electron")
const puppeteer = require("puppeteer-core");
const readline = require('readline');
const path = require('path')
const prompt2 = require('electron-prompt');
const log = require('electron-log');
const windowManager = require('electron-window-manager');
const Window = require('./Window')
const DataStore = require('./DataStore')
const {download} = require("electron-dl");
require('electron-reload')(__dirname)
let NOTIFICATION_TITLE = 'Dialogflow Updater'
let NOTIFICATION_BODY = 'Dialogflow Updater Main process started';
const TrayWindow = require("electron-tray-window");
const downloadsFolder = require('downloads-folder');
const fs = require('fs');
(async () => {
  await pie.initialize(app);
})();
const express = require('express');
const createError = require('http-errors');
var logger = require('morgan');
const cors = require('cors');
require('dotenv').config()
const { exec } = require("child_process");
var expressApp = express();
expressApp.use(function(err, req, res, next) {
 
  res.locals.message = err.message;
  res.locals.error = req.expressApp.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

const PORT = 3008;

expressApp.use(logger('dev'));
expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: false }));
//const { ipcRenderer } = require('electron')

let tray
let done1 = false;

function showNotification() {
  new Notification({
    title: NOTIFICATION_TITLE,
    body: NOTIFICATION_BODY
  }).show()
}

let done = false;
let agent
let ints1
let entsName = 'app-name';
let ents
let changeAgents
let changeAgents1
let c = 0;
let appErr = false;
let appErrMsg = '';
let appErrStage = '';
let appErrAgent = '';
let appErrM;
let updateWindow;
const agentsData = new DataStore({ name: 'Agents Main' })
//require('update-electron-app')()
let addAgentWin
let closeM = false
expressApp.post('/update', (req, res) => {
  //main1()
  
  let dt = req.body
  changeAgents = dt.targets1;
  changeAgents1 = dt.targets;
  agent = dt.source;
  ints1 = dt.intents;
  ents = dt.entities;
  closeM = true;
  main1()
  res.send('Update Started')
  
})
async function main() {


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
  const localUrl = `file://${path.join(__dirname, "html/pages/virtual-reality.html")}`;
  await window.loadURL(localUrl);
  if(closeM){
    setTimeout(() => {
      window.destroy();
    }, 3000);
  }


};
async function main1() {


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
  //const localUrl = `file://${path.join(__dirname, "index.html")}`;
  //await window.loadURL(localUrl);
  const url = "https://accounts.google.com/signin/v2/identifier";
  await window.loadURL(url);
  
    // if addTodoWin does not already exist
    //await window.loadURL(url);
    window.setProgressBar(c)
  const page = await pie.getPage(browser, window);
  // await page.setViewport({
  //   width: 1200,
  //   height: 600
  // })

  await page.waitForTimeout(2500);
  c = 0.1
  window.setProgressBar(c)

  await page.waitForTimeout(2500);
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
    .then(async (r) => {
      if (r === null) {
        log.info('user cancelled');
      } else {

        done = JSON.parse(r);
        log.info('done', done);

      }
    })
    .catch(console.error);

    
    
  if (done === true) {
    c = 0.25
    window.setProgressBar(c)

    try {
      const url1 = 'https://dialogflow.cloud.google.com';
      //const window = new BrowserWindow();
      await window.loadURL(url1);
      const page1 = await pie.getPage(browser, window);
      await page1.waitForTimeout(15000);
      async function scrollIntoViewIfNeeded(element, timeout) {
        await waitForConnected(element, timeout);
        const isInViewport = await element.isIntersectingViewport({
          threshold: 0
        });
        if (isInViewport) {
          return;
        }
        await element.evaluate(element => {
          element.scrollIntoView({
            block: 'center',
            inline: 'center',
            behavior: 'auto',
          });
        });
        await waitForInViewport(element, timeout);
      }

      async function waitForConnected(element, timeout) {
        await waitForFunction(async () => {
          return await element.getProperty('isConnected');
        }, timeout);
      }

      async function waitForInViewport(element, timeout) {
        await waitForFunction(async () => {
          return await element.isIntersectingViewport({
            threshold: 0
          });
        }, timeout);
      }

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
          downloadPath: downloadsFolder()
        });

        await page1.waitForSelector(`aria/EXPORT AS ZIP`, {
          timeout: 5000
        });
        //await scrollIntoViewIfNeeded(element, timeout);
        await page1.waitForTimeout(2000);
        await page1.click(`aria/EXPORT AS ZIP`)



        await page1.waitForTimeout(15000);
      }

      async function runBackup() {
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
            NOTIFICATION_BODY = 'Updating Intents Now';
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
      await runBackup()
      
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
      await page1.waitForTimeout(10000);
      for (let idx = 0; idx < changeAgents.length; idx++) {
        const el5 = changeAgents[idx];
        console.log(`Updating ${el5} Intents`)
        NOTIFICATION_TITLE = `Updating ${el5} Intents`;
        NOTIFICATION_BODY = `running ${el5}`;
        showNotification()

        //hover 
        try {
          await page1.waitForTimeout(1000);
          await page1.waitForXPath(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div/div[2]/ul/li[${ints1[0]}]/intents-list-item/div`)
          await page1.waitForTimeout(1000);
          let ell24 = await page1.$x(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div/div[2]/ul/li[${ints1[0]}]/intents-list-item/div`);
          await ell24[0].hover()
        } catch (error) {
          await page1.waitForTimeout(1000);
          await page1.waitForXPath(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div/div[2]/ul/li[${ints1[0]}]/intents-list-item/div`)
          await page1.waitForTimeout(1000);
          let ell24 = await page1.$x(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div/div[2]/ul/li[${ints1[0]}]/intents-list-item/div`);
          await ell24[0].hover()
        }
        
        await page1.waitForTimeout(1000);
        console.log('hovering over intent')
        await page1.waitForTimeout(1000);

        for (const e5 of ints1) {
          //select intents
          //scroll into view
         await page1.waitForTimeout(1000);

          try {
            await page1.waitForXPath(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div/div[2]/ul/li[${e5}]/intents-list-item/div/div/md-checkbox`);
            await page1.waitForTimeout(1000);
            let ell23 = await page1.$x(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div/div[2]/ul/li[${e5}]/intents-list-item/div/div/md-checkbox`);
            await ell23[0].click();
            console.log('selecting overwrite entities')
            await page1.waitForTimeout(1000);
          } catch (error) {
            await page1.waitForXPath(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div/div[2]/ul/li[${e5}]/intents-list-item/div/div/md-checkbox`);
            await page1.waitForTimeout(1000);
            let ell23 = await page1.$x(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div/div[2]/ul/li[${e5}]/intents-list-item/div/div/md-checkbox`);
            await ell23[0].click();
            console.log('selecting overwrite entities')
            await page1.waitForTimeout(1000);
          }
        }


        try {
          await page1.waitForSelector('aria/COPY', {
            timeout: 5000
          });
          await page1.waitForTimeout(1000);
          log.info('selecting copy button')
          await page1.click('aria/COPY')
        } catch (error) {
          await page1.waitForSelector('aria/COPY', {
            timeout: 5000
          });
          await page1.waitForTimeout(1000);
          log.info('selecting copy button')
          await page1.click('aria/COPY')
        }

        //select intents and entities
       try {
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
       } catch (error) {
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
       }

        //select agent
        try {
          await page1.waitForSelector('aria/Destination agent', {
            timeout: 5000
          })
          log.info('selecting selct agent')
          await page1.waitForTimeout(1000);
          await page1.click('aria/Destination agent')
        } catch (error) {
          await page1.waitForSelector('aria/Destination agent', {
            timeout: 5000
          })
          log.info('selecting selct agent')
          await page1.waitForTimeout(1000);
          await page1.click('aria/Destination agent')
        }
        

        //select the agent
        //first level loop
        //parameters
        try {
          await page1.waitForSelector(`aria/${el5}`, {
            timeout: 5000
          })
          log.info('selecting agent')
          await page1.waitForTimeout(1000);
          await page1.click(`aria/${el5}`)
        } catch (error) {
          await page1.waitForSelector(`aria/${el5}`, {
            timeout: 5000
          })
          log.info('selecting agent')
          await page1.waitForTimeout(1000);
          await page1.click(`aria/${el5}`)
        }
        

        //copy intents
        try {
          await page1.waitForSelector('aria/START', {
            timeout: 5000
          })
          log.info('selecting START')
          await page1.waitForTimeout(2000);
          await page1.click('aria/START')
        } catch (error) {
          await page1.waitForSelector('aria/START', {
            timeout: 5000
          })
          log.info('selecting START')
          await page1.waitForTimeout(2000);
          await page1.click('aria/START')
        }
        

        try {
          await page1.waitForTimeout(2000);
          await page1.waitForSelector('aria/DONE', {
            timeout: 5000
          })
          log.info('selecting DONE')
          await page1.waitForTimeout(2000);
          await page1.click('aria/DONE')
        } catch (error) {
          await page1.waitForTimeout(2000);
          await page1.waitForSelector('aria/DONE', {
            timeout: 5000
          })
          log.info('selecting DONE')
          await page1.waitForTimeout(2000);
          await page1.click('aria/DONE')
        }
        c = 0.76
        window.setProgressBar(c)
      }

    })()

    c = 1
    window.setProgressBar(c)
    NOTIFICATION_TITLE = 'Update Finished';
    NOTIFICATION_BODY = 'You can close the App';
    showNotification()
    setTimeout(() => {
      window.destroy();
    }, 5000);
  } catch (error) {
    console.log('agent already selected')
    await page1.reload({
      waitUntil: ["networkidle0", "domcontentloaded"]
    });
    await page1.waitForTimeout(15000);
    await page1.waitForTimeout(5000);
    await page1.waitForTimeout(1000);
    console.log('clicking on intents')
    try {
      await page1.waitForSelector('#link-list-intents', {
        timeout: 5000
      });
      await page1.waitForTimeout(1000);
      await page1.click('#link-list-intents')
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
          try {
            await page1.waitForTimeout(1000);
            await page1.waitForXPath(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div/div[2]/ul/li[${ints1[0]}]/intents-list-item/div`)
            await page1.waitForTimeout(1000);
            let ell24 = await page1.$x(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div/div[2]/ul/li[${ints1[0]}]/intents-list-item/div`);
            await ell24[0].hover()
          } catch (error) {
            await page1.waitForTimeout(1000);
            await page1.waitForXPath(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div/div[2]/ul/li[${ints1[0]}]/intents-list-item/div`)
            await page1.waitForTimeout(1000);
            let ell24 = await page1.$x(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div/div[2]/ul/li[${ints1[0]}]/intents-list-item/div`);
            await ell24[0].hover()
          }
          
          await page1.waitForTimeout(1000);
          console.log('hovering over intent')
          await page1.waitForTimeout(1000);
  
          for (const e5 of ints1) {
            //select intents
            //scroll into view
           await page1.waitForTimeout(1000);
  
            try {
              await page1.waitForXPath(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div/div[2]/ul/li[${e5}]/intents-list-item/div/div/md-checkbox`);
              await page1.waitForTimeout(1000);
              let ell23 = await page1.$x(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div/div[2]/ul/li[${e5}]/intents-list-item/div/div/md-checkbox`);
              await ell23[0].click();
              console.log('selecting overwrite entities')
              await page1.waitForTimeout(1000);
            } catch (error) {
              await page1.waitForXPath(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div/div[2]/ul/li[${e5}]/intents-list-item/div/div/md-checkbox`);
              await page1.waitForTimeout(1000);
              let ell23 = await page1.$x(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div/div[2]/ul/li[${e5}]/intents-list-item/div/div/md-checkbox`);
              await ell23[0].click();
              console.log('selecting overwrite entities')
              await page1.waitForTimeout(1000);
            }
          }
  
  
          try {
            await page1.waitForSelector('aria/COPY', {
              timeout: 5000
            });
            await page1.waitForTimeout(1000);
            log.info('selecting copy button')
            await page1.click('aria/COPY')
          } catch (error) {
            await page1.waitForSelector('aria/COPY', {
              timeout: 5000
            });
            await page1.waitForTimeout(1000);
            log.info('selecting copy button')
            await page1.click('aria/COPY')
          }
  
          //select intents and entities
         try {
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
         } catch (error) {
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
         }
  
          //select agent
          try {
            await page1.waitForSelector('aria/Destination agent', {
              timeout: 5000
            })
            log.info('selecting selct agent')
            await page1.waitForTimeout(1000);
            await page1.click('aria/Destination agent')
          } catch (error) {
            await page1.waitForSelector('aria/Destination agent', {
              timeout: 5000
            })
            log.info('selecting selct agent')
            await page1.waitForTimeout(1000);
            await page1.click('aria/Destination agent')
          }
          
  
          //select the agent
          //first level loop
          //parameters
          try {
            await page1.waitForSelector(`aria/${el5}`, {
              timeout: 5000
            })
            log.info('selecting agent')
            await page1.waitForTimeout(1000);
            await page1.click(`aria/${el5}`)
          } catch (error) {
            await page1.waitForSelector(`aria/${el5}`, {
              timeout: 5000
            })
            log.info('selecting agent')
            await page1.waitForTimeout(1000);
            await page1.click(`aria/${el5}`)
          }
          
  
          //copy intents
          try {
            await page1.waitForSelector('aria/START', {
              timeout: 5000
            })
            log.info('selecting START')
            await page1.waitForTimeout(2000);
            await page1.click('aria/START')
          } catch (error) {
            await page1.waitForSelector('aria/START', {
              timeout: 5000
            })
            log.info('selecting START')
            await page1.waitForTimeout(2000);
            await page1.click('aria/START')
          }
          
  
          try {
            await page1.waitForTimeout(2000);
            await page1.waitForSelector('aria/DONE', {
              timeout: 5000
            })
            log.info('selecting DONE')
            await page1.waitForTimeout(2000);
            await page1.click('aria/DONE')
          } catch (error) {
            await page1.waitForTimeout(2000);
            await page1.waitForSelector('aria/DONE', {
              timeout: 5000
            })
            log.info('selecting DONE')
            await page1.waitForTimeout(2000);
            await page1.click('aria/DONE')
          }
          c = 0.76
          window.setProgressBar(c)
        }
  
      })()
  
      c = 1
      window.setProgressBar(c)
      NOTIFICATION_TITLE = 'Update Finished';
      NOTIFICATION_BODY = 'You can close the App';
      showNotification()
      setTimeout(() => {
        window.destroy();
      }, 5000);
    } catch (error) {
      await (async () => {
        await page1.waitForTimeout(10000);
        for (let idx = 0; idx < changeAgents.length; idx++) {
          const el5 = changeAgents[idx];
          console.log(`Updating ${el5} Intents`)
          NOTIFICATION_TITLE = `Updating ${el5} Intents`;
          NOTIFICATION_BODY = `running ${el5}`;
          showNotification()
  
          //hover 
          try {
            await page1.waitForTimeout(1000);
            await page1.waitForXPath(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div/div[2]/ul/li[${ints1[0]}]/intents-list-item/div`)
            await page1.waitForTimeout(1000);
            let ell24 = await page1.$x(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div/div[2]/ul/li[${ints1[0]}]/intents-list-item/div`);
            await ell24[0].hover()
          } catch (error) {
            await page1.waitForTimeout(1000);
            await page1.waitForXPath(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div/div[2]/ul/li[${ints1[0]}]/intents-list-item/div`)
            await page1.waitForTimeout(1000);
            let ell24 = await page1.$x(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div/div[2]/ul/li[${ints1[0]}]/intents-list-item/div`);
            await ell24[0].hover()
          }
          
          await page1.waitForTimeout(1000);
          console.log('hovering over intent')
          await page1.waitForTimeout(1000);
  
          for (const e5 of ints1) {
            //select intents
            //scroll into view
           await page1.waitForTimeout(1000);
  
            try {
              await page1.waitForXPath(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div/div[2]/ul/li[${e5}]/intents-list-item/div/div/md-checkbox`);
              await page1.waitForTimeout(1000);
              let ell23 = await page1.$x(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div/div[2]/ul/li[${e5}]/intents-list-item/div/div/md-checkbox`);
              await ell23[0].click();
              console.log('selecting overwrite entities')
              await page1.waitForTimeout(1000);
            } catch (error) {
              await page1.waitForXPath(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div/div[2]/ul/li[${e5}]/intents-list-item/div/div/md-checkbox`);
              await page1.waitForTimeout(1000);
              let ell23 = await page1.$x(`/html/body/div[1]/div[2]/div/div/div/section/div/div[3]/div/div/div[2]/ul/li[${e5}]/intents-list-item/div/div/md-checkbox`);
              await ell23[0].click();
              console.log('selecting overwrite entities')
              await page1.waitForTimeout(1000);
            }
          }
  
  
          try {
            await page1.waitForSelector('aria/COPY', {
              timeout: 5000
            });
            await page1.waitForTimeout(1000);
            log.info('selecting copy button')
            await page1.click('aria/COPY')
          } catch (error) {
            await page1.waitForSelector('aria/COPY', {
              timeout: 5000
            });
            await page1.waitForTimeout(1000);
            log.info('selecting copy button')
            await page1.click('aria/COPY')
          }
  
          //select intents and entities
         try {
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
         } catch (error) {
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
         }
  
          //select agent
          try {
            await page1.waitForSelector('aria/Destination agent', {
              timeout: 5000
            })
            log.info('selecting selct agent')
            await page1.waitForTimeout(1000);
            await page1.click('aria/Destination agent')
          } catch (error) {
            await page1.waitForSelector('aria/Destination agent', {
              timeout: 5000
            })
            log.info('selecting selct agent')
            await page1.waitForTimeout(1000);
            await page1.click('aria/Destination agent')
          }
          
  
          //select the agent
          //first level loop
          //parameters
          try {
            await page1.waitForSelector(`aria/${el5}`, {
              timeout: 5000
            })
            log.info('selecting agent')
            await page1.waitForTimeout(1000);
            await page1.click(`aria/${el5}`)
          } catch (error) {
            await page1.waitForSelector(`aria/${el5}`, {
              timeout: 5000
            })
            log.info('selecting agent')
            await page1.waitForTimeout(1000);
            await page1.click(`aria/${el5}`)
          }
          
  
          //copy intents
          try {
            await page1.waitForSelector('aria/START', {
              timeout: 5000
            })
            log.info('selecting START')
            await page1.waitForTimeout(2000);
            await page1.click('aria/START')
          } catch (error) {
            await page1.waitForSelector('aria/START', {
              timeout: 5000
            })
            log.info('selecting START')
            await page1.waitForTimeout(2000);
            await page1.click('aria/START')
          }
          
  
          try {
            await page1.waitForTimeout(2000);
            await page1.waitForSelector('aria/DONE', {
              timeout: 5000
            })
            log.info('selecting DONE')
            await page1.waitForTimeout(2000);
            await page1.click('aria/DONE')
          } catch (error) {
            await page1.waitForTimeout(2000);
            await page1.waitForSelector('aria/DONE', {
              timeout: 5000
            })
            log.info('selecting DONE')
            await page1.waitForTimeout(2000);
            await page1.click('aria/DONE')
          }
          c = 0.76
          window.setProgressBar(c)
        }
  
      })()
  
      c = 1
      window.setProgressBar(c)
      NOTIFICATION_TITLE = 'Update Finished';
      NOTIFICATION_BODY = 'You can close the App';
      showNotification()
      setTimeout(() => {
        window.destroy();
      }, 5000);
    }
    
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
  
  
  //log.info(page.url());
  if (appErr === true) {
    window.destroy();
  }

  
  



};

const dockMenu = Menu.buildFromTemplate([{
    label: 'New Window',
    click() {
      log.info('New Window')
    }
  }, {
    label: 'New Window with Settings',
    submenu: [{
        label: 'Basic'
      },
      {
        label: 'Pro'
      }
    ]
  },
  {
    label: 'New Command...'
  }
])

app.whenReady().then(() => {
  if (process.platform === 'darwin') {
    app.dock.setMenu(dockMenu)
  }
  const icon = nativeImage.createFromPath('./assets/dfu1.png')
  // setTimeout(function () {
  //   TrayWindow.setOptions({
  //     trayIconPath: path.join("assets/dfu1.png"),
  //     windowUrl: `file://${path.join(__dirname, "index.html")}`,
  //     width: 800,
  //     height: 680,
  //   });
  // }, 100);
  
  // exec("lt --port 3008 --subdomain dialogflowupdater2", (error, stdout, stderr) => {
  //     if (error) {
  //         console.log(`error: ${error.message}`);
  //         exec("lt --port 3008 --subdomain dialogflowupdater2", (error, stdout, stderr) => {
  //             if (error) {
  //                 console.log(`error: ${error.message}`);
  //                 return;
  //             }
  //             if (stderr) {
  //                 console.log(`stderr: ${stderr}`);
  //                 return;
  //             }
  //             console.log(`stdout: ${stdout}`);
  //         });
  //         return;
  //     }
  //     if (stderr) {
  //         console.log(`stderr: ${stderr}`);
  //         return;
  //     }
  //     console.log(`stdout: ${stdout}`);
  // });

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
expressApp.use(function(req, res, next) {
  next(createError(404));
});

expressApp.listen(PORT, ()=> {
  
  console.log(`backend running on port ${PORT}`)})

