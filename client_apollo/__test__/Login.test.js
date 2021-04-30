// import {shallowMount} from "@vue/test-utils";
// import Login from '../src/components/Login'
// const Login = require('../src/components/Login')
// const {shallowMount} = require('@vue/test-utils')
const {snapshot} = require('./display')

describe('Google', () => {
    beforeAll(async () => {
        await page.goto('https://google.com');

    });

    test('should be titled "Google"', async () => {
        await expect(page.title()).resolves.toMatch('Google');
    })
})

describe('Title test', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:8080');
        await snapshot('Main-Page');
    });

    it('Title Test', async () => {
        const title = await page.title();
        expect(title).toEqual('client');
    });
});
