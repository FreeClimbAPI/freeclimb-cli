/**
 * This file returns a function nextFlagTest which creates a
 * TestInstance for the given command. TestInstance is used to access
 * appropriate tests from test-outline.js to test optional parameters
 * from the given command's corresponding generated command typescript
 * file. next-flag-test.js is not a part of the CLI but rather a
 * necessary component for generating test files. Changes made to this
 * file may affect generated test files.
 */
const TestInstance = require("../outline.js")

const nextTestJson = [
    "testJsonNext",
    {
        total: 1,
        start: 0,
        end: 0,
        page: 1,
        numPages: 1,
        pageSize: 100,
        nextPageUri: null,
    },
]

const nextTestJson2 = [
    "testJsonNext2",
    {
        total: 2,
        start: 0,
        end: 0,
        page: 1,
        numPages: 2,
        pageSize: 100,
        nextPageUri: "",
    },
]

const nextNockServerResponse = [
    "nockServerResponseNext",
    "== You are on the last page of output. ==",
]
const nextNockServerResponse2 = [
    "nockServerResponseNext2",
    "== Currently on page 1. Run this command again with the -n flag to go to the next page. ==",
]

let nextFlagTest = function (additionalParam, isPagination) {
    let test = `describe("${this.commandName} next flag test", function () {`
    const noNextFlagTestInstance = new TestInstance(
        this,
        additionalParam,
        "Tests return of Exit Code 3 when flag next is not available"
    )
    noNextFlagTestInstance.additionalFlags = `"--next"`
    noNextFlagTestInstance.exitCode = 3
    test += `${noNextFlagTestInstance.testNextFlagExitCodeOutline()}\n`
    if (isPagination) {
        const nextFlagTestInstance = new TestInstance(
            this,
            additionalParam,
            "Test flag next works as expected when available with on last page"
        )
        const nextFlagTestInstance2 = new TestInstance(
            this,
            additionalParam,
            "Test flag next works as expected when available with has more pages"
        )
        nextFlagTestInstance.testJson = nextTestJson
        nextFlagTestInstance.nockServerResponse = nextNockServerResponse
        nextFlagTestInstance.additionalFlags = `"--next"`

        nextFlagTestInstance2.testJson = nextTestJson2
        nextFlagTestInstance2.nockServerResponse = nextNockServerResponse2
        nextFlagTestInstance2.additionalFlags = `"--next"`

        test += `${nextFlagTestInstance.variableOutline()}\n\n${nextFlagTestInstance2.variableOutline()}\n\n${nextFlagTestInstance.testNextFlagOutline()}\n\n${nextFlagTestInstance2.testNextFlagOutline2()}`
    }
    test += "})"
    return test
}

module.exports = nextFlagTest
