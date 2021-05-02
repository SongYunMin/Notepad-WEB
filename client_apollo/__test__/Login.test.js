const {snapshot} = require('./screen');
const puppeteer = require('puppeteer');
let browser, page;

describe("User Test", () => {
    // Describe 에서 Promise 를 반환할 수 없음
    // 테스트를 위해 로그인을 수행함
    beforeEach(async () => {
        browser = await puppeteer.launch({headless: false});
        page = await browser.newPage();
        await page.setViewport({
            width: 1366,
            height: 768
        })
        await page.goto('http://localhost:8080', {waitUntil: 'domcontentloaded'});
        await page.type('.idInput', "1234");
        await page.type('.pwInput', "1234");
        await page.click('.signIn');

        // const id = await page.$('.logout');
        // console.log(id);

        await snapshot('User-Before');

    })

    it('Logout Test', async () => {
        await page.waitForSelector('.logout', {timeout: 2000});
        await page.click('.logout');
        await page.on('alert', async dialog => {
            return await dialog.dismiss();
        })
    })
})