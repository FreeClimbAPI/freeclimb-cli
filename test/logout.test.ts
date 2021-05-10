import { expect, test } from "@oclif/test"
import * as dotenv from "dotenv"
import cli from "cli-ux"
dotenv.config()

describe("Test for Logout command", function () {
    test.stdout()
        .command(["logout"])
        .it("Test the logout command produces the expected response", (ctx) => {
            expect(ctx.stdout).to.contain(
                "Successfully removed the saved Account ID and API Key from this computer"
            )
        })
})
