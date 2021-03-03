import {
    InvalidArgsSpecError,
    RequiredArgsError,
    RequiredFlagError,
    UnexpectedArgsError,
    FlagInvalidOptionError,
    ArgInvalidOptionError,
} from "../node_modules/@oclif/parser/lib/errors"

export function parse(output: any) {
    let code
    let title
    let suggestion
    let url
    if (output instanceof InvalidArgsSpecError) {
        code = 1007
        title = "Invalid argument spec"
        suggestion = `Arguments should reflect the following: \n\n`
        url = "https://docs.freeclimb.com/reference/error-and-warning-dictionary"
        const namedArgs = output.args.filter((a) => a.name)
        if (namedArgs.length > 0) {
            const list = renderList(namedArgs)
            suggestion += `${list}\n`
        }
    } else if (output instanceof RequiredArgsError) {
        code = 1008
        title = `Missing ${output.args.length} required argument${
            output.args.length === 1 ? "" : "s"
        }`
        suggestion = `Please include the following required argument${
            output.args.length === 1 ? "" : "s"
        } and run your command again: \n\n`
        url = "https://docs.freeclimb.com/reference/error-and-warning-dictionary"
        const namedArgs = output.args.filter((a) => a.name)
        if (namedArgs.length > 0) {
            const list = renderList(namedArgs)
            suggestion += `${list}\n`
        }
        suggestion += `\n${formatArg()}`
    } else if (output instanceof UnexpectedArgsError) {
        code = 1010
        title = `Unexpected argument${output.args.length === 1 ? "" : "s"}: "${output.args.join(
            ", "
        )}"`
        suggestion = `Please check for any argument and option flag typos. \nThis error also typically occurs as a result of improper option flag formatting for inputs with spaces.\n ${formatFlag()}`
        url = "https://docs.freeclimb.com/reference/error-and-warning-dictionary"
    } else if (output instanceof RequiredFlagError) {
        code = 1009
        title = "Missing required flag:"
        const usage = renderFlag(output.flag)
        suggestion = `Please include the following option flag and run you command again: \n\n${usage}\n\n${formatFlag()}`
        url = "https://docs.freeclimb.com/reference/error-and-warning-dictionary"
    } else if (output instanceof FlagInvalidOptionError) {
        let i
        const message = output.message.split("\n")
        suggestion = message[0]
        for (i = 1; i < message.length; i++) {
            suggestion += `\n\t ${message[i]}`
        }
        code = 1011
        title = "Invalid Flag Input : Option"
        url = "https://docs.freeclimb.com/reference/error-and-warning-dictionary"
    } else if (output instanceof ArgInvalidOptionError) {
        let i
        const message = output.message.split("\n")
        suggestion = message[0]
        for (i = 1; i < message.length; i++) {
            suggestion += `\n\t ${message[i]}`
        }
        code = 1012
        title = "Invalid Argument Input : Option"
        url = "https://docs.freeclimb.com/reference/error-and-warning-dictionary"
    } else {
        let i
        const message = output.message.split("\n")
        let s = ""
        for (i = 1; i < message.length; i++) {
            s += `${message[i]} `
        }
        code = 1013
        title = message[0]
        suggestion = s === "" ? "Check formatting of command" : s
        url = "https://docs.freeclimb.com/reference/error-and-warning-dictionary"
    }
    return returnFormat(code, title, url, suggestion)
}

function returnFormat(code: number, message: string, url: string, suggestion: string) {
    return `
    Code : ${code}
    Message : ${message}
    Suggestion : ${suggestion}
    For further information on this error visit :
    ${url}
    `
}

function renderList(inputs: any) {
    const mapInfo = inputs.map(info)
    let i
    let output = ""
    for (i = 0; i < mapInfo.length; i++) {
        output += mapInfo[i]
    }
    return output
}

function renderFlag(input: any) {
    return `-${input.char}, --${input.name} ${input.name.toUpperCase()} ${input.description}`
}

function formatFlag() {
    return `\n\tFlags are formatted as follows: \n\tIf input has no space: \n\t\t--{flagName}={input}\n\t\t-{flagCharacter}={input}\n\tIf input includes spaces: \n\t\t--{flagName}="{spaced input}"\n\t\t-{flagCharacter}="{spaced input}"\n`
}

function formatArg() {
    return `Arguments are formatted as followed:\n\n\t {input} \n\t "{input}" \n\t '{input}'\n`
}
function info(item: any) {
    const info = [item.name, item.description].join(" : ")
    return info
}
