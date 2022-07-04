const puppeteer = require('puppeteer');
const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.goto('https://dialogflow.cloud.google.com/#/agent/whatsapp-chatbot-290018/intents')

await page.setViewport({ width: 1267, height: 571 })

await page.waitForSelector('.ng-isolate-scope > .list-group-item > .ng-scope > .list-batch > .md-container')
await page.click('.ng-isolate-scope > .list-group-item > .ng-scope > .list-batch > .md-container')

await page.waitForSelector('.ng-scope > .intents > .ng-scope > .list-batch-actions > .md-button:nth-child(3)')
await page.click('.ng-scope > .intents > .ng-scope > .list-batch-actions > .md-button:nth-child(3)')

await page.waitForSelector('.ng-scope > .md-dialog-content > .md-block:nth-child(4) > .md-primary > .md-container')
await page.click('.ng-scope > .md-dialog-content > .md-block:nth-child(4) > .md-primary > .md-container')

await page.waitForSelector('.ng-scope > .md-dialog-content > .md-block > .ng-scope > .md-container')
await page.click('.ng-scope > .md-dialog-content > .md-block > .ng-scope > .md-container')

await page.waitForSelector('#select_31')
await page.click('#select_31')

await page.waitForSelector('#select_option_36')
await page.click('#select_option_36')

await page.waitForSelector('.md-dialog-container > #dialogContent_29 > .ng-isolate-scope > .ng-scope > .md-button:nth-child(3)')
await page.click('.md-dialog-container > #dialogContent_29 > .ng-isolate-scope > .ng-scope > .md-button:nth-child(3)')

await page.waitForSelector('.md-dialog-container > #dialogContent_29 > .ng-isolate-scope > .ng-scope > .md-button:nth-child(3)')
await page.click('.md-dialog-container > #dialogContent_29 > .ng-isolate-scope > .ng-scope > .md-button:nth-child(3)')

await page.waitForSelector('.ng-isolate-scope > .list-group-item > .ng-scope > .list-batch > .md-container')
await page.click('.ng-isolate-scope > .list-group-item > .ng-scope > .list-batch > .md-container')

await browser.close()