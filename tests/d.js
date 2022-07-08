const innit = async () => {
    const browser = await puppeteer.connect({
      browserWSEndpoint: 'ws://localhost:3000?keepalive=300000'
    });
    const page = await browser.newPage();
  
    /*Your login code*/
  
    browser.disconnect(); //You MUST user browser.disconnect() rather than
                           //browser.close(), as it kills everything, careful!
  }