/* WARNING: This file is automatically generated. Please edit the files in the /generation/commands directory. */
import { Command, flags } from "@oclif/command"
import chalk from "chalk"
import { Output } from "../../output"
import { FreeClimbApi, FreeClimbResponse } from "../../freeclimb"
import * as Errors from "../../errors"

export class availableNumbersList extends Command {
    static description = ` Search for phone numbers that are available for purchase. To purchase an available phone number, the number should be submitted via POST to the /IncomingPhoneNumbers endpoint.`

    static flags = {
        alias: flags.string({
            char: "a",
            description: "Filter on numbers based on the formatted string of the phone number.",
            required: false,
        }),
        country: flags.string({
            char: "C",
            description: "Filters numbers by two character ISO country code.",
            required: false,
        }),
        region: flags.string({
            char: "r",
            description:
                "Filters numbers by two letter state abbreviation. This flag is only available for US numbers.",
            required: false,
        }),
        smsEnabled: flags.string({
            char: "E",
            description: "Filters numbers based on SMS capability.",
            required: false,
            options: ["true", "false"],
        }),
        voiceEnabled: flags.string({
            char: "o",
            description: "Filters numbers based on voice capability.",
            required: false,
            options: ["true", "false"],
        }),
        phoneNumber: flags.string({
            char: "p",
            description:
                "PCRE-compatible regular expression to filter against phoneNumber field, which is in E.164 format.",
            required: false,
        }),
        next: flags.boolean({ char: "n", description: "Displays the next page of output." }),
        help: flags.help({ char: "h" }),
    }

    async run() {
        const out = new Output(this)
        const { flags } = (() => {
            try {
                return this.parse(availableNumbersList)
            } catch (error) {
                const err = new Errors.ParseError(error)
                this.error(err.message, { exit: err.code })
            }
        })()
        const fcApi = new FreeClimbApi(`AvailablePhoneNumbers`, false, this)
        const normalResponse = (response: FreeClimbResponse) => {
            if (response.status === 204) {
                out.out(
                    chalk.green(
                        "Received a success code from FreeClimb. There is no further output."
                    )
                )
            } else if (response.data) {
                out.out(JSON.stringify(response.data, null, 2))
            } else {
                throw new Errors.UndefinedResponseError()
            }
        }
        const nextResponse = (response: FreeClimbResponse) => {
            if (response.data) {
                out.out(JSON.stringify(response.data, null, 2))
            } else {
                throw new Errors.UndefinedResponseError()
            }
            if (out.next === null) {
                out.out("== You are on the last page of output. ==")
            }
        }

        if (flags.next) {
            if (out.next === undefined || out.next === "freeclimbUnnamedTest") {
                const error = new Errors.NoNextPage()
                this.error(error.message, { exit: error.code })
            } else {
                await fcApi.apiCall("GET", { params: { cursor: out.next } }, nextResponse)
            }
            return
        }
        if (flags.alias && !/\d{3}-\d{3}-\d{4}/.test(flags.alias)) {
            this.warn(
                chalk.yellow("Incorrect Format: Please enter an alias in the format '123-456-7890'")
            )
        }

        // flags.smsEnabled === "true" sets smsEnabled to the boolean representation of the flag
        const smsEnabled =
            typeof flags.smsEnabled === "undefined" ? undefined : flags.smsEnabled === "true"
        // flags.voiceEnabled === "true" sets voiceEnabled to the boolean representation of the flag
        const voiceEnabled =
            typeof flags.voiceEnabled === "undefined" ? undefined : flags.voiceEnabled === "true"

        await fcApi.apiCall(
            "GET",
            {
                params: {
                    alias: flags.alias,
                    country: flags.country,
                    region: flags.region,
                    smsEnabled: smsEnabled,
                    voiceEnabled: voiceEnabled,
                    phoneNumber: flags.phoneNumber,
                },
            },
            normalResponse
        )
    }
}
