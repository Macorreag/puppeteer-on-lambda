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
    const browser = await chromium.puppeteer.launch({
      args: chromium.args.concat(["--proxy-server=185.42.241.171:8080"]), //Proxy for enter to
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
        ignoreDefaultArgs: ['--disable-extensions']
    });

    const page = await browser.newPage();

    await page.goto('https://lumtest.com/myip.json');
    const body = await page.$eval('body', element => element.textContent);

    console.log('body', body);

    await browser.close();
}