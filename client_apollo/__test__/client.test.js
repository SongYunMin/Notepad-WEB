const {snapshot} = require('./screen');
const puppeteer = require('puppeteer');
let browser, page;

describe("client Test", () => {
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
        await snapshot('User-Before');
        await page.click('.signIn');
    })

    it('Logout Test', async () => {
        await page.waitForSelector('.logout', {timeout: 1000});
        await page.click('.logout');
        try {
            await page.waitForSelector('.login', {timeout: 1000});
        }catch (err){
            throw err
        }
        expect(await page.$('.login')).not.toEqual(null);
        await browser.close();
    })

    it('Save Test', async () => {
        await page.waitForSelector('.save', {timeout: 1000});
        await page.click('.save');
        page.on('dialog', async dialog => {
            await dialog.dismiss();
            expect(true).toBeTruthy();
            await browser.close();
        })
    })

    it('Add Test', async () => {
        await page.waitForSelector('.tab-main', {timeout: 1000});
        const tabLength = (await page.$$('.tab-main')).length;
        await page.click('.addTabBT');
        const changeLength = (await page.$$('.tab-main')).length
        expect(changeLength).toBe(tabLength+1);
        await browser.close();
    })

    // it('Delete Test', async () => {
    //     await page.waitForSelector('.close-button', {timeout: 1000});
    // })

    it('load Test', async () => {
        await page.waitForSelector('.load', {timeout: 1000});
        await page.click('.load');
        page.on('dialog', async dialog => {
            await dialog.accept("Test");
        })
    })
})