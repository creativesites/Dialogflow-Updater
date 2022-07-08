const { chromium } = require('playwright')
const fs = require('fs');
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

(async () => {
  const browser = await chromium.launch()
  const context = await browser.newContext()

  const page = await context.newPage()

  await page.goto('https://accounts.google.com/signin/v2/identifier')

  await page.type('#identifierId', 'creativesites263@gmail.com')
  await page.keyboard.press('Enter');
  await page.waitForTimeout(3500)
  console.log('Finishing up...');
    // Wait for password input
    const password = await prompt('Enter your password: ', true);
    await page.waitForSelector('input[type="password"]');
    await page.type('input[type="password"]', password);
    await page.waitForTimeout(2500);
    await page.keyboard.press('Enter');
  

  await page.waitForNavigation()

  const cookies = await context.cookies()
  const cookieJson = JSON.stringify(cookies)

  fs.writeFileSync('cookies.json', cookieJson)

  await browser.close()
})()