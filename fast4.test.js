const { timeout } = require(".")

beforeAll(async () => {
    await timeout(1000) // simulate slow startup
})

it("is fast", () => {})
