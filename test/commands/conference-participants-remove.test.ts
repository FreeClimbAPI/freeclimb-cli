/* WARNING: This file is automatically generated. Please edit the files in the /generation/tests directory. */
import { expect, test } from "@oclif/test"
import { cred } from "../../src/credentials"

const conferenceId = "userInput-conferenceId"
const callId = "userInput-callId"

describe("conference-participants:remove Data Test", function () {
    const testJson = {
        message: "Response from server",
    }

    const nockServerResponse = `{
  "message": "Response from server"
}`

    test.nock("https://www.freeclimb.com", async (api) =>
        api
            .delete(
                `/apiserver/Accounts/${await cred.accountId}/Conferences/${conferenceId}/Participants/${callId}`,
                {}
            )
            .query({})
            .basicAuth({ user: await cred.accountId, pass: await cred.authToken })
            .reply(200, testJson)
    )
        .stdout()
        .command(["conference-participants:remove", "userInput-conferenceId", "userInput-callId"])
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
            .delete(
                `/apiserver/Accounts/${await cred.accountId}/Conferences/${conferenceId}/Participants/${callId}`,
                {}
            )
            .query({})
            .basicAuth({ user: await cred.accountId, pass: await cred.authToken })
            .reply(500, testJsonErrorNoSuggestion)
    )
        .stdout()
        .command(["conference-participants:remove", "userInput-conferenceId", "userInput-callId"])
        .exit(3)
        .it("Test Freeclimb Api error repsonce is process correctly without a suggestion")

    test.nock("https://user-custom-domain.example.com", async (api) =>
        api
            .delete(
                `/apiserver/Accounts/${await cred.accountId}/Conferences/${conferenceId}/Participants/${callId}`,
                {}
            )
            .query({})
            .basicAuth({ user: await cred.accountId, pass: await cred.authToken })
            .reply(200, testJson)
    )
        .stdout()
        .env({ FREECLIMB_CLI_BASE_URL: "https://user-custom-domain.example.com/apiserver" })
        .command(["conference-participants:remove", "userInput-conferenceId", "userInput-callId"])
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
            .delete(
                `/apiserver/Accounts/${await cred.accountId}/Conferences/${conferenceId}/Participants/${callId}`,
                {}
            )
            .query({})
            .basicAuth({ user: await cred.accountId, pass: await cred.authToken })
            .reply(500, testJsonErrorWithSuggestion)
    )
        .stdout()
        .command(["conference-participants:remove", "userInput-conferenceId", "userInput-callId"])
        .exit(3)
        .it("Test Freeclimb Api error repsonce is process correctly with a suggestion")

    test.stdout()
        .command([
            "conference-participants:remove",
            "userInput-conferenceId",
            "userInput-callId",
            "additionalArguments",
        ])
        .exit(2)
        .it("Test parse error gets triggered when there is an additional argument")

    test.nock("https://www.freeclimb.com", async (api) =>
        api
            .delete(
                `/apiserver/Accounts/${await cred.accountId}/Conferences/${conferenceId}/Participants/${callId}`,
                {}
            )
            .query({})
            .basicAuth({ user: await cred.accountId, pass: await cred.authToken })
            .reply(200, undefined)
    )
        .stdout()
        .command(["conference-participants:remove", "userInput-conferenceId", "userInput-callId"])
        .exit(3)
        .it("Test error resulting in an unreadable response")

    describe("conference-participants:remove next flag test", function () {
        test.nock("https://www.freeclimb.com", async (api) =>
            api
                .delete(
                    `/apiserver/Accounts/${await cred.accountId}/Conferences/${conferenceId}/Participants/${callId}`,
                    {}
                )
                .query({})
                .basicAuth({ user: await cred.accountId, pass: await cred.authToken })
                .reply(200, testJson)
        )
            .stdout()
            .env({ FREECLIMB_CONFERENCE_PARTICIPANTS_REMOVE_NEXT: undefined })
            .command([
                "conference-participants:remove",
                "userInput-conferenceId",
                "userInput-callId",
            ])
            .command([
                "conference-participants:remove",
                "userInput-conferenceId",
                "userInput-callId",
                "--next",
            ])
            .exit(3)
            .it("Tests return of Exit Code 3 when flag next is not available")
    })
})

describe("conference-participants:remove Status Test", function () {
    const testJsonStatus = ""

    const statusResponse = `Received a success code from FreeClimb. There is no further output.
`

    test.nock("https://www.freeclimb.com", async (api) =>
        api
            .delete(
                `/apiserver/Accounts/${await cred.accountId}/Conferences/${conferenceId}/Participants/${callId}`,
                {}
            )
            .query({})
            .basicAuth({ user: await cred.accountId, pass: await cred.authToken })
            .reply(204, testJsonStatus)
    )
        .stdout()
        .command(["conference-participants:remove", "userInput-conferenceId", "userInput-callId"])
        .it("Test all required paramaters", async (ctx) => {
            expect(ctx.stdout).to.contain(statusResponse)
        })
})
