import { expect, test } from "@oclif/test"
import { calculateSinceTimestamp } from "../src/tail"

describe("Tests the calculateSinceTimestamp", function () {
    test.it("Checks calculateSinceTimestamp outputs as expected", () => {
        expect(calculateSinceTimestamp("1w1d2h30m2s1ms2us")).to.equal(700202001002)
    })
    test.it("Checks calculateSinceTimestamp outputs as expected with spaces", () => {
        expect(calculateSinceTimestamp("1w 1d 2h 30m 2s 1ms 2us")).to.equal(700202001002)
    })
    test.it("Checks calculateSinceTimestamp outputs as expected if units are capital", () => {
        expect(calculateSinceTimestamp("1W 1D 2h 30m 2s 1ms 2us")).to.equal(700202001002)
    })
    test.it("Checks calculateSinceTimestamp outputs error if starting number is missing", () => {
        expect(function () {
            calculateSinceTimestamp("d 1h")
        }).to.throws("d 1h")
    })
    test.it("Checks calculateSinceTimestamp outputs error if input is missing a unit", () => {
        expect(function () {
            calculateSinceTimestamp("2d 1")
        }).to.throws("2d 1")
    })
    test.it("Checks calculateSinceTimestamp outputs error if an unit used is not valid", () => {
        expect(function () {
            calculateSinceTimestamp("2d 1hh")
        }).to.throws("hh")
    })
})
