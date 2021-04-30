const {snapshot} = require('./screen');
const puppeteer = require('puppeteer');
describe("Test Start", () => {
    beforeEach(async () => {
        await page.goto('http://localhost:8080', { waitUntil: 'domcontentloaded' });
    })

    test("Title Check", async () => {
        const title = await page.title();
        console.log("페이지 : ", page);
        expect(title).toBe('client');
    })

    describe("User Test", () => {
        beforeEach(async () => {
            const idInput = '.idInput';
            const pwInput = '.pwInput';
            const submit = '.signIn';
            console.log(idInput, pwInput);
            await page.type(idInput, "1234");
            await page.type(pwInput, "1234");
            await page.click(submit);

            await snapshot('login-Test');
            await page.on("dialog", async (dialog) => {
                await dialog.dismiss();
                return dialog.message()
            })
        })

        test("Logout Test", async () => {
            // await page.click('.logout')
            // await page.on('dialog', async (dialog) => {
            //     console.log(await dialog.message());
            // })
        })
    })

})