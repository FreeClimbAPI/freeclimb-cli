import { expect, test } from "@oclif/test"
const mapChars = require("../../generation/commands/character-mapping")
const apiInfo = require("../../generation/schema/generated-api-schema.json")
const localFlags = require("../../generation/schema/local-flags.json")
const testingJson = require("./character-mapping-test.json")

describe("Tests the character-mapping", function () {
    const testedMap = mapChars(testingJson)
    const charMap = new Map()
    charMap.set("variableOne", "v")
    charMap.set("variableTwo", "V")
    charMap.set("alias", "a")
    charMap.set("test", "t")
    charMap.set("allVariable", "A")
    charMap.set("variableThree", "t")
    charMap.set("variableTest", "T")
    charMap.set("4Lower", "l")
    charMap.set("rut", "r")
    charMap.set("race", "R")
    charMap.set("ru", "U")
    charMap.set("urn", "u")
    charMap.set("new", "n")
    charMap.set("nice", "N")
    charMap.set("run", "b")
    charMap.set("another", "A")
    Object.keys(localFlags).forEach((key: string) => charMap.set(key, localFlags[key].char))
    /**
     *
     * @param map a map from flags to characters
     * @param schema the API schema
     */
    const hasDuplicates = (map: Map<string, string>, schema: any[]) => {
        const flags: Array<Array<string>> = separateCommandFlags(schema)
        const usedChars: Map<string, Array<string>> = new Map() // a map from characters to an array of flags with that character
        for (const [key, val] of map) {
            if (usedChars !== undefined && usedChars.has(val)) {
                // a potential duplicate character
                // but a duplicate is acceptable if it is in a different command. So we need to check
                const arrayForChar: Array<string> = usedChars.get(val) || [] // usedChars.get(val) is never undefined but the compiler doesn't know that
                if (
                    arrayForChar.some((flagWithVal) => {
                        return flags.some((command) => {
                            if (command.includes(flagWithVal) && command.includes(key)) {
                                return true // there is a duplicate flag in the same command
                            }
                            return false
                        }) // there is at least one comand with a duplicate flag
                    })
                ) {
                    // there is at least one flag with this character that has caused a duplicate
                    return true
                }
                // if we do not return early, then add the key to the appropriate array in the map
                arrayForChar.push(key)
            } else {
                usedChars.set(val, [key]) // initialize the array inside the map with the current key
            }
        }
        return false
    }
    /**
     *
     * @param apiSchema an API schema
     * @returns an array of (array of flags), each corresponding to all the flags in a command
     */
    const separateCommandFlags = (apiSchema: any) =>
        apiSchema
            .map((topic: { commands: any }) => topic.commands)
            .flat(1)
            .map((command: { params: { name: string; required: string }[] }) =>
                command.params
                    .filter((param: { required: string }) => accessSpecifier(param) === "flags")
                    .map((param: { name: string }) => param.name)
            )
    test.it("Adds all characters", (ctx) => {
        expect(testedMap).to.length(16 + Object.keys(localFlags).length)
    })
    test.it("Correctly assigns characters", (ctx) => {
        for (const [key, val] of charMap) {
            expect(testedMap.get(key)).to.equal(val)
        }
    })
    test.it("Correctly detects duplicates", () => {
        const duplicateMap = new Map()
        duplicateMap.set("keyOne", "a")
        duplicateMap.set("keyTwo", "b")
        duplicateMap.set("keyThree", "a")
        expect(
            hasDuplicates(duplicateMap, [
                {
                    commands: [
                        { params: [{ name: "keyOne" }, { name: "keyTwo" }, { name: "keyThree" }] },
                    ],
                },
            ])
        ).to.be.true
    })
    test.it("Does not assign any duplicate characters in the example", (ctx) => {
        expect(hasDuplicates(charMap, testingJson)).to.be.false
    })
    test.it("Does not assign any duplicate characters in the actual CLI", () => {
        expect(hasDuplicates(mapChars(apiInfo), apiInfo)).to.be.false
    })
    test.stderr()
        .do((output) => {
            const generatedSchema = [
                {
                    topic: "accounts",
                    commands: [
                        {
                            params: [...new Array(54).keys()].map((idx) => ({
                                name: `v${idx}`,
                                required: false,
                            })),
                        },
                    ],
                },
            ]
            const testMap = mapChars(generatedSchema)
            expect(output.stderr).to.contain(
                "There are more than 52 unique flags in a single scope. Some flags will not be assigned a character."
            )
            expect(testMap).to.length(52 + Object.keys(localFlags).length) // 52 for the single command, plus the extra CLI-exclusive added flags (which are not in that specific command)
            expect(hasDuplicates(testMap, generatedSchema)).to.be.false
        })
        .it("Warns when there are more than 52 unique flags")
})

function accessSpecifier(param: { required: string }) {
    // TODO share this function with main.js
    return param.required ? "args" : "flags"
}
