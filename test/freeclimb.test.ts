import { expect, test } from "@oclif/test"
import { FreeClimbApi } from "../src/freeclimb"

describe("FreeClimbApi class", () => {
    const errorResponse = { errorCause: "intentional" }
    const errorResponseReturn = `"errorCause": "intentional"`
    const errorer = { error: (message: string, _: any) => console.error(message) }
    const endpoint = test
        .nock("https://www.freeclimb.com", async (api) =>
            api.get(`/apiserver/AutomatedTestEndpoint`, {}).reply(400, errorResponse)
        )
        .stderr()
    endpoint
        .do(() =>
            new FreeClimbApi("AutomatedTestEndpoint", false, console).apiCall(
                "GET",
                {},
                () => "this callback is never run",
                (err) => {
                    console.error(
                        `Here is a custom error callback, and this is the error data:${JSON.stringify(
                            err.response.data
                        )}`
                    )
                }
            )
        )
        .it("executes the custom callback", (ctx) => {
            expect(ctx.stderr).to.contain(
                `Here is a custom error callback, and this is the error data:${JSON.stringify(
                    errorResponse
                )}`
            )
        })
    endpoint
        .do(() =>
            new FreeClimbApi("AutomatedTestEndpoint", false, errorer).apiCall(
                "GET",
                {},
                () => "this callback is never run"
            )
        )
        .it("executes the default callback", (ctx) => {
            expect(ctx.stderr).to.contain(errorResponseReturn)
        })
})
