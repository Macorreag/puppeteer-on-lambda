import chromium from 'chrome-aws-lambda';
import aws from 'aws-sdk';



const lambda = new aws.Lambda();


export async function handler(event) {
    
  
  
    await run();

    // await lambda.updateFunctionConfiguration({
    //     FunctionName: 'arn:aws:lambda:us-east-1:447834641714:function:puppeteer-on-lambda',
    //     Environment: {
    //         Variables: {}
    //     }
    // }).promise();

    const response = {
        statusCode: 200,
        body: ''
    };

    return response;
}

export async function run() {

    // const newProxyUrl = await proxyChain.anonymizeProxy({ url: `http://185.42.241.171:8080` });
  const newProxyUrl = "http://178.33.116.92:3128";

    console.log(chromium.args)
    // [
    //   '--allow-running-insecure-content',
    //   '--autoplay-policy=user-gesture-required',
    //   '--disable-component-update',
    //   '--disable-domain-reliability',
    //   '--disable-features=AudioServiceOutOfProcess,IsolateOrigins,site-per-process',
    //   '--disable-print-preview',
    //   '--disable-setuid-sandbox',
    //   '--disable-site-isolation-trials',
    //   '--disable-speech-api',
    //   '--disable-web-security',
    //   '--disk-cache-size=33554432',
    //   '--enable-features=SharedArrayBuffer',
    //   '--hide-scrollbars',
    //   '--ignore-gpu-blocklist',
    //   '--in-process-gpu',
    //   '--mute-audio',
    //   '--no-default-browser-check',
    //   '--no-pings',
    //   '--no-sandbox',
    //   '--no-zygote',
    //   '--use-gl=swiftshader',
    //   '--window-size=1920,1080',
    //   '--single-process'
    // ]
    
    const browser = await chromium.puppeteer.launch({

      // args: chromium.args.concat(['--proxy-server=178.33.116.92:3128', '--no-sandbox']), //Proxy for enter to
      args: chromium.args.concat([`--proxy-server=${newProxyUrl}`, '--no-sandbox']),

        // args: ['--proxy-server=178.33.116.92:3128',  '--no-sandbox'], //Proxy for enter to
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        // headless: chromium.headless,
        headless: false,
        ignoreHTTPSErrors: true,
        ignoreDefaultArgs: []
    });




    const page = await browser.newPage();
    // await page.setDefaultTimeout(0)

    // await page.authenticate({
    //   username: "tets",
    //   password: "RLKOhJGLIx9VAQ7vh9otbg"
    // })
    
  // await page.setDefaultTimeout((360 * 1000))
  let error = true;

  while (error) {
    await page.goto('https://pasion.com/', { waitUntil: 'networkidle2', timeout: 360000 }).then(() => {
      error = false;
      console.log('success')
    }).catch((res) => {
      error = true;
      console.log('fails', res)
    })
  }

    const body = await page.$eval('body', element => element.textContent);

    console.log('body', body);


    await browser.close();
}
