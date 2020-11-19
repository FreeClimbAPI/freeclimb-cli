import * as keytar from "keytar"
import { expect, test } from "@oclif/test"

describe("Test keytar", () => {
    test.it("Sets/retrieves/deletes passwords from keychain", async () => {
        await keytar.setPassword(
            "freeclimbCLIAutomatedTest",
            "automatedTestAccount",
            "automatedTestPassword"
        )
        expect(
            await keytar.getPassword("freeclimbCLIAutomatedTest", "automatedTestAccount")
        ).to.equal("automatedTestPassword")
        await keytar.deletePassword("freeclimbCLIAutomatedTest", "automatedTestAccount")
        expect(await keytar.getPassword("freeclimbCLIAutomatedTest", "automatedTestAccount")).to.be
            .null
    })
})
