const puppeteer = require('puppeteer');
const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.goto('https://dialogflow.cloud.google.com/#/agent/apologetic2-hgafmo/intents')

await page.setViewport({ width: 1267, height: 571 })

await page.waitForSelector('#select_157')
await page.click('#select_157')

await page.waitForSelector('#select_option_161')
await page.click('#select_option_161')

await page.waitForSelector('.md-dialog-container > #dialogContent_155 > .ng-isolate-scope > .ng-scope > .md-button:nth-child(3)')
await page.click('.md-dialog-container > #dialogContent_155 > .ng-isolate-scope > .ng-scope > .md-button:nth-child(3)')

await page.waitForSelector('.md-dialog-container > #dialogContent_155 > .ng-isolate-scope > .ng-scope > .md-button:nth-child(3)')
await page.click('.md-dialog-container > #dialogContent_155 > .ng-isolate-scope > .ng-scope > .md-button:nth-child(3)')

await browser.close()