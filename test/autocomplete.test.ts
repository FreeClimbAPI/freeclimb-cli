import { expect, test } from "@oclif/test"

const testType = process.env.RUNNER_OS === "Windows" ? it.skip : it

describe("Autocomplete", () => {
    test.stdout()
        .command(["autocomplete"])
        .testType("displays the custom autocomplete message", (ctx) =>
            expect(ctx.stdout).to.contain(
                "Copy the following line and run it in your terminal. It will set the FreeClimb CLI autocomplete to load on shell startup."
            )
        )
})
