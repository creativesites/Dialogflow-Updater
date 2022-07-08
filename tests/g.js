const puppeteer = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth'); // Use v2.4.5 instead of latest
const readline = require('readline');

puppeteer.use(pluginStealth());

// Use '-h' arg for headful login.
const headless = !process.argv.includes('-h');

// Prompt user for email and password.
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

// Launch puppeteer browser.
let d;
const a = prompt('Enter your agentName: ', false);
console.log(a)
const b = prompt('Enter intentName: ', false);
console.log(b)
const c = prompt('Enter targets names seperated by a space: ', false);
console.log(c)
