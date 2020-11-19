import { expect, test } from "@oclif/test"
import { Environment } from "../../src/environment"

describe("First process - Environment Test", () => {
    Environment.setString("TEST_TEMPORARY_ENVIRONMENT_VARIABLE", "Test Value (temporary)")
    test.it("can access the temp value in the current process", () => {
        expect(process.env.TEST_TEMPORARY_ENVIRONMENT_VARIABLE).to.equal("Test Value (temporary)")
    })
    test.it("can access the temp value through the environment class", () => {
        expect(Environment.getString("TEST_TEMPORARY_ENVIRONMENT_VARIABLE")).to.equal(
            "Test Value (temporary)"
        )
    })
    const env = new Environment()
    env.setStringPersist("TEST_PERSISTENT_ENVIRONMENT_VARIABLE", "Test Value (persistent)")
    test.it("does not set the persistent environment variable in the current process", () => {
        expect(process.env.TEST_PERSISTENT_ENVIRONMENT_VARIABLE).to.be.undefined
    })
})
