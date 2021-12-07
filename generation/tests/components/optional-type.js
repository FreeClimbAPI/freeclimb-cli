/**
 * This file returns a function optionalTypeTest which creates a
 * TestInstance for the given command. TestInstance is used to access
 * appropriate tests from test-outline.js to test optional parameters
 * from the given command's corresponding generated command typescript
 * file. optional-type-test.js is not a part of the CLI but rather a
 * necessary component for generating test files. Changes made to this
 * file may affect generated test files.
 */
import TestInstance from "../outline.js"

const formatedAlias = ["available-numbers:list"]

let optionalTypeTest = function (additionalParam, paramType) {
    if (additionalParam.length > 0) {
        let test = `describe("${this.commandName} ${paramType} param flags", function () {`
        additionalParam.forEach((param) => {
            const optionalTypeInstance = new TestInstance(
                this,
                param,
                `required params and a ${paramType} param is sent through with request-${param.name}`
            )
            test += `${optionalTypeInstance.testOutline()}\n\n`
            if (param.name === "timeout") {
                test += exitTest(this, param, 120, 0)
            }
            if (param.name === "maxSize") {
                test += exitTest(this, param, 1000, 0)
            }
            if (param.name === "alias" && formatedAlias.includes(this.commandName)) {
                test += formatedAliasTest(this, param)
            }
        })
        test += "})"
        return test
    }
    return ""
}

function exitTest(information, param, max, min) {
    let test = ""
    const exitTest = new TestInstance(
        information,
        param,
        `test that exit code 2 is used when ${param.name} number goes above ${max}`
    )
    exitTest.exitCode = 2
    exitTest.dataTypeIntValue = max + 1
    test += `${exitTest.testExitCodeOutline()}\n\n`
    exitTest.dataTypeIntValue = min - 1
    exitTest.message = `test that exit code 2 is used when ${param.name} number goes below ${min}`
    test += `${exitTest.testExitCodeOutline()}\n\n`
    return test
}

function formatedAliasTest(information, param) {
    const aliasTest = new TestInstance(
        information,
        param,
        `test that an incorrectly formated alias is responds with a warning`
    )
    aliasTest.dataTypePhoneNumberValue = "123-456-789"
    return `${aliasTest.testWarnOutline()}\n\n`
}

export {optionalTypeTest}
