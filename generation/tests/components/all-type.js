/**
 * This file returns a function allTypeTest which creates a TestInstance for
 * the given command. TestInstance is used to access appropriate tests from
 * test-outline.js to test all parameter types from the given command's
 * corresponding generated command typescript file. all-type-test.js is not
 * a part of the CLI but rather a necessary component for generating test
 * files. Changes made to this file may affect generated test files.
 */
import TestInstance from "../outline.js"

let allTypeTest = function (additionalParam, message) {
    if (additionalParam.length > 1) {
        const allTypeTestInstance = new TestInstance(this, additionalParam, message)
        return allTypeTestInstance.testOutline() + "\n"
    }
    return ""
}
export {allTypeTest}
