/**
 * This file defines the mapChars function which returns a mapping of all
 * flag names in the CLI to a globally defined character, so that there is
 * consistency of flag characters across the entire CLI. character-mapping.js
 * is not a part of the CLI but rather a necessary component for generating
 * command files. Changes made to this file may affect generated command files.
 */

// Return a map of param names to flag characters

module.exports = (apiInfo, localFlags) => {
    const commands = apiInfo.map((topic) => topic.commands).flat(1)
    const frequency = new Map()
    const charMap = new Map()
    // Insert custom flags into charMap. The count is Infinity to give the highest priority
    for (const flag of Object.keys(localFlags)) {
        frequency.set(flag, Infinity)
        charMap.set(flag, localFlags[flag].char) // ultimately there should be a way to let the algorithm set this automatically instead
        // except that OCLIF convention requires that the help flag has the character h, regardless of precedence in the algorithm
    }
    everyFlag(commands, (flag) => {
        if (frequency.has(flag)) {
            frequency.set(flag, frequency.get(flag) + 1)
        } else {
            frequency.set(flag, 1)
        }
    })
    const globalFlags = [...frequency.entries()]
        .filter((entry) => entry[1] > 1)
        .sort((a, b) => b[1] - a[1])
        .map((entry) => entry[0])
    if (globalFlags.length > 52) {
        warnLength()
    }
    assignChars(globalFlags, charMap)
    commands.forEach((command) => {
        const commandMap = new Map()
        const commandExclusiveFlags = []
        const sharedFlags = []
        everyFlag([command], (flag) => {
            if (frequency.get(flag) === 1) {
                commandExclusiveFlags.push(flag)
            } else {
                sharedFlags.push(flag)
            }
        })
        if (sharedFlags.length + commandExclusiveFlags.length > 52) {
            warnLength()
        }
        sharedFlags.forEach((flag) => commandMap.set(flag, charMap.get(flag))) // Copy the already-chosen global characters to prevent local conflicts
        assignChars(commandExclusiveFlags, commandMap) // Now calculate characters for the flags exclusive to this command
        commandMap.forEach((val, key) => charMap.set(key, val)) // Copies characters calculated within this command to the global map
    })
    return charMap

    function assignChars(flags, map) {
        if (flags.length >= 52) {
            warnLength()
        }
        const chooserFuncs = [firstLetter, iterCaps, iterContents, allChars]
        chooserFuncs.forEach((chooser) => {
            flags.forEach((flag) => {
                if (map.has(flag)) {
                    return
                }
                attemptAdd(flag, chooser, map)
            })
        })
    }

    function everyFlag(commandArray, func) {
        commandArray.forEach((command) =>
            command.params
                .filter((param) => accessSpecifier(param) === "flags")
                .map((param) => param.name)
                .forEach((flag) => func(flag))
        )
    }
    /**
     * BEGIN char chooser functions. These are the different ways that a character can be chosen for a flag
     */
    function firstLetter(flag) {
        return [flag[0]]
    }
    function iterCaps(flag) {
        return iterContents(flag).filter((char) => char.match(/[A-Z]/))
    }
    function iterContents(flag) {
        return flag.split("")
    }
    function warnLength() {
        console.error(
            "There are more than 52 unique flags in a single scope. Some flags will not be assigned a character."
        )
    }
    function allChars() {
        const charArray = []
        for (let i = 0; i < 26; i++) {
            charArray.push(String.fromCharCode("a".charCodeAt(0) + i))
        }
        return charArray
    }
    /**
     * END char chooser functions
     */

    /**
     * Attempt to add to charMap. If upper and lowercase letters both already exist, returns false
     * @param {string} flag the name of the parameter
     * @param {function(flag: string)} charChooser a function to determine which character will be attempted
     * @param {Map} map the map to check/add to
     * @return {boolean} true on successful add, false otherwise
     */
    function attemptAdd(flag, charChooser, map) {
        return charChooser(flag).some((char) => {
            // will stop once a character allows a successful match
            if (!char.match(/[A-Za-z]/)) {
                return false // Only letters can be assigned as flag abbreviations
            }
            if (isNew(char.toLowerCase(), map)) {
                // If lowercase character is not in map
                map.set(flag, char.toLowerCase())
            } else if (isNew(char.toUpperCase(), map)) {
                // If uppercase character is not in map
                map.set(flag, char.toUpperCase())
            } else {
                return false // This character is unavailable in map
            }
            return true // This character was added (either uppercase or lowercase)
        })
    }

    /**
     * @return {boolean} false if @param {string} character is already in @param {Map} map
     */
    function isNew(char, map) {
        for (const currentChar of map.values()) {
            if (currentChar === char) {
                return false
            }
        }
        return true
    }

    function accessSpecifier(param) {
        // TODO share this function with main.js
        return param.required ? "args" : "flags"
    }
}
