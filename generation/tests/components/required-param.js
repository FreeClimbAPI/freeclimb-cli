/**
 * This file returns a function requiredParamTest which creates a
 * TestInstance for the given command. TestInstance is used to access
 * appropriate tests from test-outline.js to test required parameters
 * from the given command's corresponding generated command typescript
 * file. required-param-test.js is not a part of the CLI but rather a
 * necessary component for generating test files. Changes made to this
 * file may affect generated test files.
 */
const TestInstance = require("../outline.js")

const formatedPQL = ["logs:filter"]
const testJsonErrorNoSuggestion = [
    "testJsonErrorNoSuggestion",
    {
        code: 2,
        message: "Method Not Allowed",
        url: "https://docs.freeclimb.com/reference/error-and-warning-dictionary#2",
        details: {},
    },
]

const testJsonErrorWithSuggestion = [
    "testJsonErrorWithSuggestion",
    {
        code: 50,
        message: "Unauthorized To Make Request",
        url: "https://docs.freeclimb.com/reference/error-and-warning-dictionary#50",
        details: {},
    },
]

const errorNoSugNockServerResponse = ["nockServerResponseErrorNoSuggestion", "starting test"]

const errorWithSugNockServerResponse = ["nockServerResponseErrorWithSuggestion", "starting test"]

let requiredParamTest = function (additionalParams) {
    let test = ""
    const requiredTestInstance = new TestInstance(this, additionalParams)
    const requiredTestError = new TestInstance(
        this,
        additionalParams,
        "Test Freeclimb Api error repsonce is process correctly without a suggestion"
    )
    requiredTestError.exitCode = 3
    requiredTestError.statusCode = 500
    requiredTestError.testJson = testJsonErrorNoSuggestion
    requiredTestError.nockServerResponse = errorNoSugNockServerResponse

    const requiredTestErrorSuggestion = new TestInstance(
        this,
        additionalParams,
        "Test Freeclimb Api error repsonce is process correctly with a suggestion"
    )
    requiredTestErrorSuggestion.exitCode = 3
    requiredTestErrorSuggestion.statusCode = 500
    requiredTestErrorSuggestion.testJson = testJsonErrorWithSuggestion
    requiredTestErrorSuggestion.nockServerResponse = errorWithSugNockServerResponse
    const requiredWrongInputParse = new TestInstance(
        this,
        additionalParams,
        "Test parse error gets triggered when there is an additional argument"
    )
    requiredWrongInputParse.additionalFlags = `"additionalArguments"`
    requiredWrongInputParse.statusCode = 500
    requiredWrongInputParse.exitCode = 2

    test += `${requiredTestInstance.variableOutline()}\n\n${requiredTestInstance.testOutline()}\n\n${requiredTestError.variableOutline()}\n\n${requiredTestError.testErrorResponseOuline()}\n\n${requiredTestInstance.testCustomBaseUrlOutline()}\n\n${requiredTestErrorSuggestion.variableOutline()}\n\n${requiredTestErrorSuggestion.testErrorResponseOuline()}\n\n${requiredWrongInputParse.testExitCodeOutline()}\n\n`

    if (formatedPQL.includes(this.commandName)) {
        test += formatedPQLTest(this, additionalParams)
    }
    return test
}

function formatedPQLTest(information, additionalParams) {
    const formatedPQLTestInstance = new TestInstance(
        information,
        additionalParams,
        "checks for a warning when pql is formated incorrectly"
    )
    formatedPQLTestInstance.dataReqValue = `='error'`
    return `\n\n${formatedPQLTestInstance.testWarnOutline()}`
}

module.exports = requiredParamTest
