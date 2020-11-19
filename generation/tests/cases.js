const requiredParamTest = require("./components/required-param.js")
const allTypeTest = require("./components/all-type.js")
const optionalTypeTest = require("./components/optional-type.js")
const maxItemFlagTest = require("./components/max-item-flag.js")
const nextFlagTest = require("./components/next-flag.js")
const booleanInputTest = require("./components/boolean-input.js")
const statusCodeTest = require("./components/status-code.js")

function Tests(topic, command, commandName) {
    this.topic = topic.topic
    this.command = command
    this.commandName = commandName
    this.params = this.command.params
    this.path = this.params.filter(
        (param) => param.paramType === "path" && param.name !== "accountId"
    )
    this.reqBody = this.params.filter(
        (param) => param.required === true && param.paramType === "body"
    )
    this.reqQuery = this.params.filter(
        (param) => param.required === true && param.paramType === "query"
    )
    this.nonReqBody = this.params.filter(
        (param) => param.required === false && param.paramType === "body"
    )
    this.nonReqQuery = this.params.filter(
        (param) => param.required === false && param.paramType === "query"
    )
    this.nonReqQueryAndBody = this.nonReqBody.concat(this.nonReqQuery)
    this.pagination = this.command.pagination
    this.url = this.retrieveUrl()
    this.pathVariable = this.pathVariable()
    this.baseInformation = {
        command: this.command,
        commandName: this.commandName,
        url: this.url,
        path: this.path,
        reqBody: this.reqBody,
        reqQuery: this.reqQuery,
    }
}

Tests.prototype.retrieveUrl = function () {
    let Originalurl = this.command.endpoint.split("/")
    let url = Originalurl.map((segment) => {
        if (segment === "accountId") {
            return "${await cred.accountId}"
        }
        this.params.forEach((param) => {
            if (param.name === segment) {
                segment = "${" + segment + "}"
            }
        })
        return segment
    })
        .join("/")
        .substring(25) // beginning of the url is hard coded
    return url
}

Tests.prototype.pathVariable = function () {
    let data = "\n"
    if (this.path) {
        this.path.forEach((param) => {
            data += `const ${param.name}="userInput-${param.name}";\n`
        })
    }
    return data
}

Tests.prototype.runTests = function () {
    const allQueryMessage =
        "testing all query parameters and required body are sent through with request"
    const allBodyMessage =
        "testing all body parameters together and required query are sent through with request"
    return `${this.pathVariable}
    ${
        this.pagination
            ? `
    import { data } from "../../src/commands/data"
    import { Environment } from "../../src/environment"
    `
            : ""
    }
    describe("${this.commandName} Data Test", function () {
    ${requiredParamTest.call(this.baseInformation, "")}\n
    ${allTypeTest.call(this.baseInformation, this.nonReqQuery, allQueryMessage)}\n
    ${allTypeTest.call(this.baseInformation, this.nonReqBody, allBodyMessage)}\n
    ${optionalTypeTest.call(this.baseInformation, this.nonReqQuery, "query")}\n
    ${optionalTypeTest.call(this.baseInformation, this.nonReqBody, "body")}\n
    ${maxItemFlagTest.call(this.baseInformation, "")}\n
    ${nextFlagTest.call(this.baseInformation, "", this.pagination)}\n
    ${booleanInputTest.call(this.baseInformation, this.nonReqQueryAndBody)}\n
})\n
    describe("${this.commandName} Status Test", function () {
    ${statusCodeTest.call(this.baseInformation, "")}\n
})`
}

module.exports = Tests
