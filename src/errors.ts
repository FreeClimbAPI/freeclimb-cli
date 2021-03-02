import { errorWithSuggestions, returnFormat } from "./error-messages"
import { parse } from "./parse-errors"

export abstract class FreeClimbError {
    message: string

    code: number

    constructor(newMessage: string, newCode: number) {
        this.message = newMessage
        this.code = newCode
    }
}

export class ParseError extends FreeClimbError {
    constructor(error: any) {
        super(parse(error), 2)
    }
}
export class FreeClimbAPIError extends FreeClimbError {
    constructor(errorMessage: any) {
        if (errorMessage.status) {
            super(invalidSuggestion(), 2)
        } else if (errorMessage.error) {
            super(errorWithSuggestions(errorMessage.error), 3)
        } else if (errorMessage.code) {
            super(errorWithSuggestions(errorMessage), 3)
        } else {
            super(errorMessage, 3)
        }
    }
}

export class UndefinedResponseError extends FreeClimbError {
    constructor() {
        super(
            returnFormat(
                1020,
                "Reponse Undefined",
                "https://docs.freeclimb.com/reference/error-and-warning-dictionary",
                "Re-run the command. If error persists, something went wrong on FreeClimb's end. Our engineers are hard at work resolving this problem."
            ),
            3
        )
    }
}

export class DefaultFatalError extends FreeClimbError {
    constructor(error: any) {
        super(
            returnFormat(
                1021,
                "Program Error",
                "https://docs.freeclimb.com/reference/error-and-warning-dictionary",
                `Please contact vail \n${error}`
            ),
            4
        )
    }
}
export class NoNextPage extends FreeClimbError {
    constructor() {
        super(
            returnFormat(
                1003,
                "No Next Page Output",
                "https://docs.freeclimb.com/reference/error-and-warning-dictionary",
                "Run your initial command without the –next flag."
            ),
            3
        )
    }
}

export class OutOfRange extends FreeClimbError {
    constructor(param: string, bound: number, direction: string) {
        super(
            returnFormat(
                1004,
                "Out of Bounds",
                "https://docs.freeclimb.com/reference/error-and-warning-dictionary",
                `Enter a ${param} ${direction} than or equal to ${bound}. Example: -${param} 10`
            ),
            2
        )
    }
}

export class SetPasswordError extends FreeClimbError {
    constructor(errorMessage: string) {
        super(
            returnFormat(
                1005,
                "Keytar Error",
                "https://docs.freeclimb.com/reference/error-and-warning-dictionary",
                `Re-run the login command. /nIf the error persists, please contact support@freeclimb.com`
            ),
            4
        )
    }
}

function invalidSuggestion() {
    return `${returnFormat(
        1014,
        "Invalid Payload",
        "https://docs.freeclimb.com/reference/error-and-warning-dictionary",
        "Make sure that all necessary flags and arguments have been formatted and/or spelled correctly."
    )}`
}

export class LoginCancelled extends FreeClimbError {
    constructor() {
        super(
            returnFormat(
                1006,
                "Login Cancelled - No Credential Change",
                "https://docs.freeclimb.com/reference/error-and-warning-dictionary",
                "Re-run the login command and agree to credential reset."
            ),
            2
        )
    }
}
