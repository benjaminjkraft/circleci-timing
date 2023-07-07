const { timeout } = require(".")

beforeAll(async () => {
    await timeout(1000) // simulate slow startup
})

it("is slow", async () => {
    await timeout(10) // simulate slow-ish test
})
