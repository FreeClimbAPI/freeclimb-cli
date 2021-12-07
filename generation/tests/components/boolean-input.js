/**
 * This file returns a function falseBooleanInputTest which creates a
 * TestInstance for the given command. TestInstance is used to access
 * appropriate tests from test-outline.js to test boolean parameters
 * from the given command's corresponding generated command typescript
 * file. boolean-input-test.js is not a part of the CLI but rather a
 * necessary component for generating test files. Changes made to this
 * file may affect generated test files.
 */
import TestInstance from "../outline.js"

let falseBooleanInputTest = function (additionalParam) {
    const falseParams = additionalParam.filter((param) => param.dataType === "boolean")
    if (falseParams.length > 0) {
        let test = `describe("${this.commandName} boolean input test", function () {`
        const falseBooleanInputTestInstance = new TestInstance(
            this,
            additionalParam,
            "tests that value false can be used with boolean flags and args"
        )
        falseBooleanInputTestInstance.dataTypeBooleanValue = "false"
        test += `${falseBooleanInputTestInstance.testOutline()}\n\n`
        falseParams.forEach((param) => {
            test += exitTest(this, param)
        })
        test += "})"
        return test
    }
    return ""
}

function exitTest(information, param) {
    let test = ""
    const exitTest = new TestInstance(
        information,
        param,
        `tests incorrect ${param.name} input results in exit code 2`
    )
    exitTest.dataTypeBooleanValue = "flse"
    exitTest.exitCode = 2
    test += `${exitTest.testExitCodeOutline()}\n\n`
    return test
}
export {falseBooleanInputTest}
