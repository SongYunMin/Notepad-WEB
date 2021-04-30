const {snapshot} = require('./screen');
const puppeteer = require('puppeteer');

describe("Login Test", () => {
    beforeAll(async () => {
        await page.goto('http://localhost:8080', { waitUntil: 'domcontentloaded' });
    });
    test("Login Logout Test", async () => {
        const browser = await puppeteer.launch({
            headless: false
        })
        const page = await browser.newPage();
        await page.goto('http://localhost:8080', {
            waitUntil: "domcontentloaded"
        });
        const idInput = '.idInput';
        const pwInput = '.pwInput';
        const submit = '.signIn';

        await page.type(idInput, "1234");
        await page.type(pwInput, "1234");
        await page.click(submit);

        await snapshot('login-Test');
        const login = await page.on("dialog", async (dialog) => {
            await dialog.dismiss();
            return dialog.message()
        })
        if(login === '로그인 되었습니다.'){
            expect(true).toBe(true);
        }
    })
})