const { timeout } = require(".")

beforeAll(async () => {
    await timeout(100) // simulate slow startup
})

it("is slow", async () => {
    await timeout(10) // simulate slow-ish test
})
