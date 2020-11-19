import { expect, test } from "@oclif/test"
import { Environment } from "../../src/environment"

describe("Second process - Environment Test", () => {
    let environment: Environment

    beforeEach(() => {
        delete process.env.TEST_PERSISTENT_ENVIRONMENT_VARIABLE // the value could still be in memory from a previous test
        environment = new Environment() // loads the persistent environment variables again
    })
    test.it("can access the persistent value in a new process", () => {
        expect(process.env.TEST_PERSISTENT_ENVIRONMENT_VARIABLE).to.equal("Test Value (persistent)")
    })
    test.it("can access the persistent value through the environment class", () => {
        expect(Environment.getString("TEST_PERSISTENT_ENVIRONMENT_VARIABLE")).to.equal(
            "Test Value (persistent)"
        )
    })
    test.it("can clear the environment variable", () => {
        environment.clearString("TEST_PERSISTENT_ENVIRONMENT_VARIABLE")
    })
    test.it("has cleared the environment variable", () => {
        expect(process.env.TEST_PERSISTENT_ENVIRONMENT_VARIABLE).to.be.undefined
    })
})
