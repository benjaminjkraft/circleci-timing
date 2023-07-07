const { timeout } = require(".")

beforeAll(async () => {
    await timeout(100) // simulate slow startup
})

it("is fast", () => {})
