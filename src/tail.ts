export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

function processInput(timeStr: string) {
    const regexp = /(?<number>\d+)(?<unit>(ms|us|w|d|h|m|s))/g
    const finalOutput = []
    let match: any
    while ((match = regexp.exec(timeStr.toLowerCase())) !== null) {
        finalOutput.push({ unit: match.groups.unit, number: match.groups.number })
    }
    return finalOutput
}

function convertTime(unit: string, time: number) {
    switch (unit) {
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
    for (const timeSegment of timeSeperation) {
        const time = parseInt(timeSegment.number, 10)
        total += convertTime(timeSegment.unit, time)
    }
    return total
}
