/**
 * This file returns a TestOutline object which contains all necessary tests
 * for a given command's correscponding typescript command file. test-outline.js
 * is not a part of the CLI but rather a necessary component for generating test
 * files. Changes made to this file may affect generated test files.
 */

function TestOutline(baseInformation, additionalParam, message) {
    this.command = baseInformation.command
    this.commandName = baseInformation.commandName
    this.url = baseInformation.url
    this.reqBody = baseInformation.reqBody
    this.reqQuery = baseInformation.reqQuery
    this.additionalParam = additionalParam
    this.path = baseInformation.path
    this.testJson = ["testJson", { message: "Response from server" }]
    this.nockServerResponse = ["nockServerResponse", JSON.stringify(this.testJson[1], null, 2)]
    this.statusCode = 200
    this.message = message ? message : "Test all required paramaters"
    this.dataTypeBooleanValue = true
    this.dataTypeIntValue = 10
    this.dataTypePhoneNumberValue = "123-456-7890"
    this.exitCode = 0
    this.additionalFlags = ""
    this.additionalExpect = ""
    this.additionalVariable = [null, null]
    this.dataReqValue = ""
    this.commandNameUnderscores = this.formatCommandNameUnderscores()
    this.usedBody = this.reqBody
    this.usedQuery = this.reqQuery
}

TestOutline.prototype.formatCommandNameUnderscores = function () {
    let output = "FREECLIMB"
    const tempArray = this.commandName.split(":")
    let partOne = tempArray[0].split("-")
    let partTwo = tempArray[1].split("-")
    if (partOne.length > 1) {
        partOne.forEach((word) => {
            output += "_" + word.toUpperCase()
        })
    } else {
        output += "_" + tempArray[0].toUpperCase()
    }
    if (partTwo.length > 1) {
        partTwo.forEach((word) => {
            output += "_" + word.toUpperCase()
        })
    } else {
        output += "_" + tempArray[1].toUpperCase()
    }
    output += "_NEXT"
    return output
}

/**
 * @description takes in any number of paramerter that are added to test specific instances. The parameters are filtered and added to the appropriate use
 * @param  {...any} newParams
 */
TestOutline.prototype.setParams = function (...newParams) {
    let params = newParams.flat()
    this.usedBody = this.reqBody.concat(params.filter((param) => param.paramType === "body"))
    this.usedQuery = this.reqQuery.concat(params.filter((param) => param.paramType === "query"))
}

/**
 * @description uses the usedBody (which contains body parameters that are targeted in a test) and creates the body portion of nock in the test outline.
 * Any params that are included in the body most be present in the tested post request that is created with the cli command. If not test will fail and post request is missing information
 * @returns {string} of query portion of nock test
 */
TestOutline.prototype.body = function () {
    let data = ""
    if (this.usedBody) {
        data = ", {"
        this.usedBody.forEach((param) => {
            if (param.dataType === "int32") {
                data += `\n${param.name}:${this.dataTypeIntValue},`
            } else if (param.dataType === "boolean") {
                data += `\n${param.name}:${this.dataTypeBooleanValue},`
            } else {
                data += `\n${param.name}:"userInput-${param.name}${this.dataReqValue}",`
            }
        })
        data += "}"
    }
    return data
}

/**
 * @description uses the usedQuery (which contains query parameters that are targeted in a test) and creates the query portion of nock in the test outline.
 * Any params that are included in the query most be present in the tested request that is created with the cli command. If not test will fail and request is missing information
 * @returns {string} of query portion of nock test
 */
TestOutline.prototype.query = function () {
    let data = ""
    if (this.usedQuery) {
        data = ".query({"
        this.usedQuery.forEach((param) => {
            if (this.commandName === "available-numbers:list" && param.name === "alias") {
                data += `\n${param.name}:"${this.dataTypePhoneNumberValue}",`
            } else if (param.dataType === "int32") {
                data += `\n${param.name}:${this.dataTypeIntValue},`
            } else if (param.dataType === "boolean") {
                data += `\n${param.name}:${this.dataTypeBooleanValue},`
            } else {
                data += `\n${param.name}:"userInput-${param.name}${this.dataReqValue}",`
            }
        })
        data += "})"
    }
    return data
}

/**
 * @description formats the cli command that is being tested. Uses usedQuery and usedBody which means it will match with the query and body sections of the request
 * @returns {string} that represents the command. It is formated to be compatable with the oclif test
 */
TestOutline.prototype.paramCommandInput = function () {
    let data = ""
    let allUsedParams = this.path.concat(this.usedQuery).concat(this.usedBody)
    allUsedParams.forEach((param) => {
        // this is done to preserve the order, which is needed for positional arguments
        data += `,${this.formatParameterForCli(param)}`
    })
    return data
}

/**
 * @description formats the cli command that is being tested. Uses what was declaired in setAdditionalFlags
 * @returns {string} that represents the command
 */
TestOutline.prototype.additionalCommandInput = function () {
    let output = ""
    if (this.additionalFlags) {
        output = `,${this.additionalFlags}`
    }
    return output
}

/**
 * @description formats a parameter as either an argument or a flag depending on whether it is required
 * @returns {string} that represents what should be passed to the CLI command in the test
 */
TestOutline.prototype.formatParameterForCli = function (param) {
    if (param.required) {
        return `"userInput-${param.name}${this.dataReqValue}"`
    }
    if (this.commandName === "available-numbers:list" && param.name === "alias") {
        return `"--${param.name}","${this.dataTypePhoneNumberValue}"`
    }
    if (param.dataType === "int32") {
        return `"--${param.name}","${this.dataTypeIntValue}"`
    }
    if (param.dataType === "boolean") {
        return `"--${param.name}","${this.dataTypeBooleanValue}"`
    }
    return `"--${param.name}","userInput-${param.name}"`
}

TestOutline.prototype.addVariable = function () {
    if (this.additionalVariable[0]) {
        return `const ${this.additionalVariable[0]} = ${JSON.stringify(
            this.additionalVariable[1],
            null,
            2
        )}`
    }
    return ""
}

/**
 * @description this is the testing variable outline
 * @returns {string}
 */
TestOutline.prototype.variableOutline = function () {
    return `const ${this.testJson[0]} = ${JSON.stringify(this.testJson[1], null, 2)}\n
    ${this.addVariable()}
    const ${this.nockServerResponse[0]} = ${"`"}${this.nockServerResponse[1]}${"`"}`
}

/**
 * @description this is the over all outline for a test
 * @returns {string}
 */
TestOutline.prototype.testOutline = function () {
    this.setParams(this.additionalParam)
    return `test.nock("https://www.freeclimb.com", async (api) =>
    api
        .${this.command.method.toLowerCase()}(${"`"}${this.url}${"`"} ${this.body()})
        ${this.query()}
        .basicAuth({ user: await cred.accountId, pass: await cred.authToken })
        .reply(${this.statusCode}, ${this.testJson[0]})
    )
    .stdout()
    .command(["${this.commandName}"${this.paramCommandInput()}${this.additionalCommandInput()}])
    .it("${this.message}", async (ctx) => {
        expect(ctx.stdout).to.contain(${this.nockServerResponse[0]})
        ${this.additionalExpect}
    })`
}

TestOutline.prototype.testErrorResponseOuline = function () {
    this.setParams(this.additionalParam)
    return `test.nock("https://www.freeclimb.com", async (api) =>
    api
        .${this.command.method.toLowerCase()}(${"`"}${this.url}${"`"} ${this.body()})
        ${this.query()}
        .basicAuth({ user: await cred.accountId, pass: await cred.authToken })
        .reply(${this.statusCode}, ${this.testJson[0]})
    )
    .stdout()
    .command(["${this.commandName}"${this.paramCommandInput()}${this.additionalCommandInput()}])
    .exit(${this.exitCode})
    .it("${this.message}")`
}

/**
 * @description tests outline for exit codes
 * @returns {string}
 */
TestOutline.prototype.testExitCodeOutline = function () {
    this.setParams(this.additionalParam)
    return `test
    .stdout()
    .command(["${this.commandName}"${this.paramCommandInput()}${this.additionalCommandInput()}])
    .exit(${this.exitCode})
    .it("${this.message}")`
}

TestOutline.prototype.testNextFlagOutline = function () {
    this.setParams(this.additionalParam)
    let envVariable = this.formatCommandNameUnderscores()
    const cursorForCommand = this.commandName
        .split("")
        .map((char) => char.charCodeAt(0).toString(16))
        .join("")
    return `
    
    test.nock("https://www.freeclimb.com", async (api) =>
    api
        .get(${"`"}${this.url}${"`"})
        .query({cursor : "${cursorForCommand}"})
        .basicAuth({ user: await cred.accountId, pass: await cred.authToken })
        .reply(${this.statusCode}, ${this.testJson[0]})
    )
    .stdout()
    .env({"${envVariable}":"${cursorForCommand}"})
    .command(["${this.commandName}"${this.paramCommandInput()}${this.additionalCommandInput()}])
    .it("${this.message}", async (ctx) => {
        expect(ctx.stdout).to.contain(${this.nockServerResponse[0]})
        ${this.additionalExpect}
    })`
}
TestOutline.prototype.testNextFlagOutline2 = function () {
    this.setParams(this.additionalParam)
    let envVariable = this.formatCommandNameUnderscores()
    const cursorForCommand = this.commandName
        .split("")
        .map((char) => char.charCodeAt(0).toString(16))
        .join("")
    return (
        `const finalCursor = "freeClimbCLIAutomatedTestCursor"
        
    before(() => {(async () => {
        ${this.testJson[0]}.nextPageUri = ${"`"}https://www.freeclimb.com${this.url}?cursor=` +
        "${finalCursor}" +
        `${"`"}
    })()})
    after(() => {
        const dataDir = data.run([]).then((dataDir) => {
            const environment = new Environment(dataDir)
            environment.clearString("${envVariable}")
        }, reason => console.log(reason))
    })
    test.nock("https://www.freeclimb.com", async (api) =>
    api
        .get(${"`"}${this.url}${"`"})
        .query({cursor : "${cursorForCommand}"})
        .basicAuth({ user: await cred.accountId, pass: await cred.authToken })
        .reply(${this.statusCode}, ${this.testJson[0]})
    )
    .stdout()
    .env({"${envVariable}":"${cursorForCommand}"})
    .command(["${this.commandName}"${this.paramCommandInput()}${this.additionalCommandInput()}])
    .it("${this.message}", async (ctx) => {
        expect(ctx.stdout).to.contain(${this.nockServerResponse[0]})
        ${this.additionalExpect}
    })`
    )
}

TestOutline.prototype.testNextFlagExitCodeOutline = function () {
    this.setParams(this.additionalParam)
    return `test.nock("https://www.freeclimb.com", async (api) =>
    api
        .${this.command.method.toLowerCase()}(${"`"}${this.url}${"`"} ${this.body()})
        ${this.query()}
        .basicAuth({ user: await cred.accountId, pass: await cred.authToken })
        .reply(${this.statusCode}, ${this.testJson[0]})
    )
    .stdout()
    .env({"${this.commandNameUnderscores}":undefined})
    .command(["${this.commandName}"${this.paramCommandInput()}])
    .command(["${this.commandName}"${this.paramCommandInput()}${this.additionalCommandInput()}])
    .exit(${this.exitCode})
    .it("${this.message}")\n`
}

TestOutline.prototype.testWarnOutline = function () {
    this.setParams(this.additionalParam)
    return `test.nock("https://www.freeclimb.com", async (api) =>
    api
        .${this.command.method.toLowerCase()}(${"`"}${this.url}${"`"} ${this.body()})
        ${this.query()}
        .basicAuth({ user: await cred.accountId, pass: await cred.authToken })
        .reply(${this.statusCode}, ${this.testJson[0]})
    )
    .stdout()
    .command(["${this.commandName}"${this.paramCommandInput()}${this.additionalCommandInput()}])
    .hook('warn')
    .it("${this.message}")\n`
}

module.exports = TestOutline
