export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

function processInput(timeStr: string) {
    const regex = /[\d]/
    const timeInput = []
    const ts = timeStr.split(" ").join("").split("")
    let collectedUnit = false
    let unit = ""
    let time = ""
    if (regex.exec(ts[0]) === null) {
        const err = new Error(timeStr)
        err.name = "Incorrect Format - Starting Number"
        throw err
    }
    ts.forEach((char) => {
        if (regex.exec(char)) {
            if (collectedUnit === true) {
                collectedUnit = false
                timeInput.push([unit, time])
                time = ""
                unit = ""
            }
            time += char
        } else {
            collectedUnit = true
            unit += char
        }
    })
    if (collectedUnit) {
        timeInput.push([unit, time])
    } else {
        const err = new Error(timeStr)
        err.name = "Incorrect Format - Missing Unit"
        throw err
    }
    return timeInput
}

function convertTime(unit: string, time: number) {
    switch (unit.toLowerCase()) {
        case "w": {
            return time * 604800000000
        }

        case "d": {
            return time * 86400000000
        }

        case "h": {
            return time * 3600000000
        }

        case "m": {
            return time * 60000000
        }
        case "s": {
            return time * 1000000
        }

        case "ms": {
            return time * 1000
        }

        case "us": {
            return time
        }

        default: {
            const err = new Error(unit)
            err.name = "Incorrect Format - Invalid Unit"
            throw err
        }
    }
}

export function calculateSinceTimestamp(since: string) {
    let total = 0
    const timeSeperation = processInput(since)
    for (let i = 0; i < timeSeperation.length; i++) {
        const utSet = timeSeperation[i]
        const unit = utSet[0]
        const time = parseInt(utSet[1], 10)
        total += convertTime(unit, time)
    }
    return total
}
