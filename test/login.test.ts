import { expect, test } from "@oclif/test"
import * as dotenv from "dotenv"
import cli from "cli-ux"

dotenv.config()

describe("Test for login command", function () {
    test.stub(cli, "confirm", () => async () => false)
        .stdout()
        .command(["login"])
        .exit(2)
        .it("Test exit code 2 is produced when user responds N")

    test.nock("https://www.freeclimb.com", async (api) =>
        api
            .get(`/apiserver/Accounts/1111122222333334444455555666667777788888`, {})
            .query({})
            .basicAuth({
                user: "1111122222333334444455555666667777788888",
                pass: "1111122222333334444455555666667777788888",
            })
            .reply(500, "error")
    )
        .stub(cli, "confirm", () => async () => true)
        .stub(cli, "prompt", () => async () => "1111122222333334444455555666667777788888")
        .stdout()
        .command(["login"])
        .hook("warn")
        .it(
            "tests warning for an incorrect account id length and checks action on error for verification",
            async (ctx) => {
                expect(ctx.stdout).to.contain(
                    "<---Inputted ACCOUNT_ID and API_KEY where not valid. Please try again.-->"
                )
            }
        )

    test.nock("https://www.freeclimb.com", async (api) =>
        api
            .get(`/apiserver/Accounts/AC1111122222333334444455555666667777788888`, {})
            .query({})
            .basicAuth({
                user: "AC1111122222333334444455555666667777788888",
                pass: "AC1111122222333334444455555666667777788888",
            })
            .reply(500, "error")
    )
        .stub(cli, "confirm", () => async () => true)
        .stub(cli, "prompt", () => async () => "AC1111122222333334444455555666667777788888")
        .stdout()
        .command(["login"])
        .hook("warn")
        .it(
            "tests warning for an incorrect auth token length and checks action on error for verification",
            async (ctx) => {
                expect(ctx.stdout).to.contain(
                    "<---Inputted ACCOUNT_ID and API_KEY where not valid. Please try again.-->"
                )
            }
        )

    const testJson = {
        message: "Response from server",
    }

    test.nock("https://www.freeclimb.com", async (api) =>
        api
            .get(`/apiserver/Accounts/1234567`, {})
            .query({})
            .basicAuth({ user: "1234567", pass: "1234567" })
            .reply(200, testJson)
    )
        .stub(cli, "confirm", () => async () => true)
        .stub(cli, "prompt", () => async () => "1234567")
        .stdout()
        .command(["login"])
        .hook("warn")
        .it("tests for response when account is verified", async (ctx) => {
            expect(ctx.stdout).to.contain(
                "<---Your ACCOUNT_ID and API_KEY have been verified through Freeclimb.--->"
            )
        })

    test.stub(cli, "confirm", () => async () => true)
        .stub(cli, "prompt", () => async () => 11111)
        .stdout()
        .command(["login"])
        .exit(4)
        .it("Checks exit code 4 when keytar fails")
})
