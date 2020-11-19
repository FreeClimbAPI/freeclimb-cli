/**
 * This file returns a function maxItemFlagTest which creates a TestInstance
 * for the given command. TestInstance is used to access appropriate tests from
 * test-outline.js to test all required parameters and flag maxItem from the
 * given command's corresponding generated command typescript file.
 * max-item-flag-test.js is not a part of the CLI but rather a necessary component
 * for generating test files. Changes made to this file may affect generated test
 * files.
 */
const TestInstance = require("../outline.js")

const releventCommands = ["logs:filter", "logs:list"]

const maxItemTestJson = [
    "testJsonLogs",
    {
        message: "Response from server",
        logs: [
            { logNum: 1, message: "this is log one" },
            { logNum: 2, message: "this is log two" },
            { logNum: 3, message: "this is log three" },
        ],
    },
]

const nextTestJsonLogs = [
    "testJsonNextLogs",
    {
        total: 1,
        start: 0,
        end: 0,
        page: 1,
        numPages: 1,
        pageSize: 100,
        nextPageUri: null,
        logs: [
            { logNum: 1, message: "this is log one" },
            { logNum: 2, message: "this is log two" },
            { logNum: 3, message: "this is log three" },
        ],
    },
]

const maxItemNockServerResponse = [
    "nockServerResponseLogs",
    JSON.stringify(
        maxItemTestJson[1].logs.filter((log) => log.logNum <= 2),
        null,
        2
    ),
]

const nextNockServerResponseLogs = [
    "nockServerResponseNextLogs",
    JSON.stringify(
        maxItemTestJson[1].logs.filter((log) => log.logNum <= 2),
        null,
        2
    ),
]

let maxItemFlagTest = function (additionalParam) {
    if (releventCommands.includes(this.commandName)) {
        let test = `describe("${this.commandName} maxItem flag test", function () {`
        const maxItemFlagTestInstance = new TestInstance(
            this,
            additionalParam,
            "Test all required paramaters and flag maxItem"
        )
        maxItemFlagTestInstance.testJson = maxItemTestJson
        maxItemFlagTestInstance.nockServerResponse = maxItemNockServerResponse
        maxItemFlagTestInstance.additionalFlags = `"--maxItem", "2"`

        const maxItemFlagLogsTestInstance = new TestInstance(
            this,
            additionalParam,
            "Test maxItem with --next"
        )
        maxItemFlagLogsTestInstance.testJson = nextTestJsonLogs
        maxItemFlagLogsTestInstance.nockServerResponse = nextNockServerResponseLogs
        maxItemFlagLogsTestInstance.additionalFlags = `"--maxItem", "2", "--next"`
        test += `${maxItemFlagTestInstance.variableOutline()}\n\n${maxItemFlagLogsTestInstance.variableOutline()}\n\n${maxItemFlagTestInstance.testOutline()}\n\n${maxItemFlagLogsTestInstance.testNextFlagOutline()}`
        test += "\n})"
        return test
    }
    return ""
}

module.exports = maxItemFlagTest
