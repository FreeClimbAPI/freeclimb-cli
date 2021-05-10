/* WARNING: This file is automatically generated. Please edit the files in the /generation/tests directory. */
import { expect, test } from "@oclif/test"
import { cred } from "../../src/credentials"

describe("conferences:create Data Test", function () {
    const testJson = {
        message: "Response from server",
    }

    const nockServerResponse = `{
  "message": "Response from server"
}`

    test.nock("https://www.freeclimb.com", async (api) =>
        api
            .post(`/apiserver/Accounts/${await cred.accountId}/Conferences`, {})
            .query({})
            .basicAuth({ user: await cred.accountId, pass: await cred.apiKey })
            .reply(200, testJson)
    )
        .stdout()
        .command(["conferences:create"])
        .it("Test all required paramaters", async (ctx) => {
            expect(ctx.stdout).to.contain(nockServerResponse)
        })

    const testJsonErrorNoSuggestion = {
        code: 2,
        message: "Method Not Allowed",
        url: "https://docs.freeclimb.com/reference/error-and-warning-dictionary#2",
        details: {},
    }

    const nockServerResponseErrorNoSuggestion = `starting test`

    test.nock("https://www.freeclimb.com", async (api) =>
        api
            .post(`/apiserver/Accounts/${await cred.accountId}/Conferences`, {})
            .query({})
            .basicAuth({ user: await cred.accountId, pass: await cred.apiKey })
            .reply(500, testJsonErrorNoSuggestion)
    )
        .stdout()
        .command(["conferences:create"])
        .exit(3)
        .it("Test Freeclimb Api error repsonce is process correctly without a suggestion")

    test.nock("https://user-custom-domain.example.com", async (api) =>
        api
            .post(`/apiserver/Accounts/${await cred.accountId}/Conferences`, {})
            .query({})
            .basicAuth({ user: await cred.accountId, pass: await cred.apiKey })
            .reply(200, testJson)
    )
        .stdout()
        .env({ FREECLIMB_CLI_BASE_URL: "https://user-custom-domain.example.com/apiserver" })
        .command(["conferences:create"])
        .it("Sends API requests to the base URL from an environment variable", async (ctx) => {
            expect(ctx.stdout).to.contain(nockServerResponse)
        })

    const testJsonErrorWithSuggestion = {
        code: 50,
        message: "Unauthorized To Make Request",
        url: "https://docs.freeclimb.com/reference/error-and-warning-dictionary#50",
        details: {},
    }

    const nockServerResponseErrorWithSuggestion = `starting test`

    test.nock("https://www.freeclimb.com", async (api) =>
        api
            .post(`/apiserver/Accounts/${await cred.accountId}/Conferences`, {})
            .query({})
            .basicAuth({ user: await cred.accountId, pass: await cred.apiKey })
            .reply(500, testJsonErrorWithSuggestion)
    )
        .stdout()
        .command(["conferences:create"])
        .exit(3)
        .it("Test Freeclimb Api error repsonce is process correctly with a suggestion")

    test.stdout()
        .command(["conferences:create", "additionalArguments"])
        .exit(2)
        .it("Test parse error gets triggered when there is an additional argument")

    test.nock("https://www.freeclimb.com", async (api) =>
        api
            .post(`/apiserver/Accounts/${await cred.accountId}/Conferences`, {})
            .query({})
            .basicAuth({ user: await cred.accountId, pass: await cred.apiKey })
            .reply(200, undefined)
    )
        .stdout()
        .command(["conferences:create"])
        .exit(3)
        .it("Test error resulting in an unreadable response")

    test.nock("https://www.freeclimb.com", async (api) =>
        api
            .post(`/apiserver/Accounts/${await cred.accountId}/Conferences`, {
                alias: "userInput-alias",
                playBeep: "userInput-playBeep",
                record: true,
                waitUrl: "userInput-waitUrl",
                statusCallbackUrl: "userInput-statusCallbackUrl",
            })
            .query({})
            .basicAuth({ user: await cred.accountId, pass: await cred.apiKey })
            .reply(200, testJson)
    )
        .stdout()
        .command([
            "conferences:create",
            "--alias",
            "userInput-alias",
            "--playBeep",
            "userInput-playBeep",
            "--record",
            "true",
            "--waitUrl",
            "userInput-waitUrl",
            "--statusCallbackUrl",
            "userInput-statusCallbackUrl",
        ])
        .it(
            "testing all body parameters together and required query are sent through with request",
            async (ctx) => {
                expect(ctx.stdout).to.contain(nockServerResponse)
            }
        )

    describe("conferences:create body param flags", function () {
        test.nock("https://www.freeclimb.com", async (api) =>
            api
                .post(`/apiserver/Accounts/${await cred.accountId}/Conferences`, {
                    alias: "userInput-alias",
                })
                .query({})
                .basicAuth({ user: await cred.accountId, pass: await cred.apiKey })
                .reply(200, testJson)
        )
            .stdout()
            .command(["conferences:create", "--alias", "userInput-alias"])
            .it(
                "required params and a body param is sent through with request-alias",
                async (ctx) => {
                    expect(ctx.stdout).to.contain(nockServerResponse)
                }
            )

        test.nock("https://www.freeclimb.com", async (api) =>
            api
                .post(`/apiserver/Accounts/${await cred.accountId}/Conferences`, {
                    playBeep: "userInput-playBeep",
                })
                .query({})
                .basicAuth({ user: await cred.accountId, pass: await cred.apiKey })
                .reply(200, testJson)
        )
            .stdout()
            .command(["conferences:create", "--playBeep", "userInput-playBeep"])
            .it(
                "required params and a body param is sent through with request-playBeep",
                async (ctx) => {
                    expect(ctx.stdout).to.contain(nockServerResponse)
                }
            )

        test.nock("https://www.freeclimb.com", async (api) =>
            api
                .post(`/apiserver/Accounts/${await cred.accountId}/Conferences`, {
                    record: true,
                })
                .query({})
                .basicAuth({ user: await cred.accountId, pass: await cred.apiKey })
                .reply(200, testJson)
        )
            .stdout()
            .command(["conferences:create", "--record", "true"])
            .it(
                "required params and a body param is sent through with request-record",
                async (ctx) => {
                    expect(ctx.stdout).to.contain(nockServerResponse)
                }
            )

        test.nock("https://www.freeclimb.com", async (api) =>
            api
                .post(`/apiserver/Accounts/${await cred.accountId}/Conferences`, {
                    waitUrl: "userInput-waitUrl",
                })
                .query({})
                .basicAuth({ user: await cred.accountId, pass: await cred.apiKey })
                .reply(200, testJson)
        )
            .stdout()
            .command(["conferences:create", "--waitUrl", "userInput-waitUrl"])
            .it(
                "required params and a body param is sent through with request-waitUrl",
                async (ctx) => {
                    expect(ctx.stdout).to.contain(nockServerResponse)
                }
            )

        test.nock("https://www.freeclimb.com", async (api) =>
            api
                .post(`/apiserver/Accounts/${await cred.accountId}/Conferences`, {
                    statusCallbackUrl: "userInput-statusCallbackUrl",
                })
                .query({})
                .basicAuth({ user: await cred.accountId, pass: await cred.apiKey })
                .reply(200, testJson)
        )
            .stdout()
            .command(["conferences:create", "--statusCallbackUrl", "userInput-statusCallbackUrl"])
            .it(
                "required params and a body param is sent through with request-statusCallbackUrl",
                async (ctx) => {
                    expect(ctx.stdout).to.contain(nockServerResponse)
                }
            )
    })

    describe("conferences:create next flag test", function () {
        test.nock("https://www.freeclimb.com", async (api) =>
            api
                .post(`/apiserver/Accounts/${await cred.accountId}/Conferences`, {})
                .query({})
                .basicAuth({ user: await cred.accountId, pass: await cred.apiKey })
                .reply(200, testJson)
        )
            .stdout()
            .env({ FREECLIMB_CONFERENCES_CREATE_NEXT: undefined })
            .command(["conferences:create"])
            .command(["conferences:create", "--next"])
            .exit(3)
            .it("Tests return of Exit Code 3 when flag next is not available")
    })

    describe("conferences:create boolean input test", function () {
        test.nock("https://www.freeclimb.com", async (api) =>
            api
                .post(`/apiserver/Accounts/${await cred.accountId}/Conferences`, {
                    alias: "userInput-alias",
                    playBeep: "userInput-playBeep",
                    record: false,
                    waitUrl: "userInput-waitUrl",
                    statusCallbackUrl: "userInput-statusCallbackUrl",
                })
                .query({})
                .basicAuth({ user: await cred.accountId, pass: await cred.apiKey })
                .reply(200, testJson)
        )
            .stdout()
            .command([
                "conferences:create",
                "--alias",
                "userInput-alias",
                "--playBeep",
                "userInput-playBeep",
                "--record",
                "false",
                "--waitUrl",
                "userInput-waitUrl",
                "--statusCallbackUrl",
                "userInput-statusCallbackUrl",
            ])
            .it("tests that value false can be used with boolean flags and args", async (ctx) => {
                expect(ctx.stdout).to.contain(nockServerResponse)
            })

        test.stdout()
            .command(["conferences:create", "--record", "flse"])
            .exit(2)
            .it("tests incorrect record input results in exit code 2")
    })
})

describe("conferences:create Status Test", function () {
    const testJsonStatus = ""

    const statusResponse = `Received a success code from FreeClimb. There is no further output.
`

    test.nock("https://www.freeclimb.com", async (api) =>
        api
            .post(`/apiserver/Accounts/${await cred.accountId}/Conferences`, {})
            .query({})
            .basicAuth({ user: await cred.accountId, pass: await cred.apiKey })
            .reply(204, testJsonStatus)
    )
        .stdout()
        .command(["conferences:create"])
        .it("Test all required paramaters", async (ctx) => {
            expect(ctx.stdout).to.contain(statusResponse)
        })
})
