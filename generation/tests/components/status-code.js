/**
 * This file returns a function statusCodeTest which creates a
 * TestInstance for the given command. TestInstance is used to access
 * appropriate tests from test-outline.js to test optional parameters
 * from the given command's corresponding generated command typescript
 * file. status-code-test.js is not a part of the CLI but rather a
 * necessary component for generating test files. Changes made to this
 * file may affect generated test files.
 */
const TestInstance = require("../outline.js")

const testJson = ["testJsonStatus", ""]
const nockServerResponse = [
    "statusResponse",
    "Received a success code from FreeClimb. There is no further output.\n",
]
const statusCode = 204

let statusCodeTest = function (additionalParams) {
    const statusCodeTestInstance = new TestInstance(this, additionalParams)
    statusCodeTestInstance.testJson = testJson
    statusCodeTestInstance.nockServerResponse = nockServerResponse
    statusCodeTestInstance.statusCode = statusCode
    return `${statusCodeTestInstance.variableOutline()}\n\n${statusCodeTestInstance.testOutline()}`
}

module.exports = statusCodeTest
