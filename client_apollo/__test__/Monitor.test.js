const monitor = require('../src/components/Monitor')

describe("Login Unit Test", () => {
    test("Session Check Unit Test", async () => {
        expect(await monitor.resolvers.Query.idCheck()).toBe(false)
    })


})