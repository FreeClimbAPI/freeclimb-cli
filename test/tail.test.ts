import { expect, test } from "@oclif/test"
import { calculateSinceTimestamp } from "../src/tail"

describe("Tests the calculateSinceTimestamp", function () {
    const error1 = new Error("d 1h")
    error1.name = "Incorrect Format - Starting Number"

    const error2 = new Error("1w 1")
    error2.name = "Incorrect Format - Missing Unit"

    const error3 = new Error("dd")
    error3.name = "Incorrect Format - Invalid Unit"

    test.it("Checks calculateSinceTimestamp outputs as expected", () => {
        expect(calculateSinceTimestamp("1w1d2h30m2s1ms2us")).to.equal(700202001002)
    })
    test.it("Checks calculateSinceTimestamp outputs as expected with spaces", () => {
        expect(calculateSinceTimestamp("1w 1d 2h 30m 2s 1ms 2us")).to.equal(700202001002)
    })
})
