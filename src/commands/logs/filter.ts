/* WARNING: This file is automatically generated. Please edit the files in the /generation/commands directory. */
import { Command, flags } from "@oclif/command"
import chalk from "chalk"
import { Output } from "../../output"
import { FreeClimbApi, FreeClimbResponse } from "../../freeclimb"
import * as Errors from "../../errors"
import { sleep, calculateSinceTimestamp } from "../../tail"

let lastTime: number
let tailMax: number

export class logsFilter extends Command {
    static description = ` Returns the first page of Logs associated with the specified account.`

    static flags = {
        maxItem: flags.integer({
            char: "m",
            description: "Show only a certain number of the most recent logs on this page.",
        }),
        tail: flags.boolean({
            char: "t",
            description: "Polls the FreeClimb API to retrieve and display new logs as they occur.",
            default: false,
        }),
        sleep: flags.integer({
            char: "q",
            description:
                "Determines time waited between request for tail command. Defaults at 1 second.",
            default: 1000,
        }),
        since: flags.string({
            char: "Q",
            description:
                "Determines time frame of logs to be printed out before starting tail. Ex.2h9m",
            dependsOn: ["tail"],
        }),
        next: flags.boolean({ char: "n", description: "Displays the next page of output." }),
        help: flags.help({ char: "h" }),
    }

    static args = [
        {
            name: "pql",
            description:
                "The filter query for retrieving logs. See Performance Query Language below.",
            required: true,
        },
    ]

    async run() {
        const out = new Output(this)
        const { args, flags } = (() => {
            try {
                return this.parse(logsFilter)
            } catch (error) {
                const err = new Errors.ParseError(error)
                this.error(err.message, { exit: err.code })
            }
        })()
        const fcApi = new FreeClimbApi(`Logs`, true, this)
        const normalResponse = (response: FreeClimbResponse) => {
            if (response.status === 204) {
                out.out(
                    chalk.green(
                        "Received a success code from FreeClimb. There is no further output."
                    )
                )
            } else if (response.data) {
                out.out(
                    flags.maxItem
                        ? JSON.stringify(response.data.logs.splice(0, flags.maxItem), null, 2)
                        : JSON.stringify(response.data, null, 2)
                )
            } else {
                throw new Errors.UndefinedResponseError()
            }
        }

        const tailResponse = (response: FreeClimbResponse) => {
            if (response.data.end !== 0) {
                lastTime = response.data.logs[0].timestamp
                out.out(JSON.stringify(response.data.logs.splice(0, tailMax).reverse(), null, 2))
            }
        }

        const nextResponse = (response: FreeClimbResponse) => {
            if (response.data) {
                out.out(
                    flags.maxItem
                        ? JSON.stringify(response.data.logs.splice(0, flags.maxItem), null, 2)
                        : JSON.stringify(response.data, null, 2)
                )
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
        if (args.pql.includes("'")) {
            this.warn(
                chalk.yellow(
                    "A single quote has been detected in your pql. Keep in mind that all strings must be encapsulated by double quotes for the pql to be valid. If this was a mistake, please rerun the command with your rewritten pql. The command will now run."
                )
            )
        }

        if (flags.tail) {
            lastTime = 0
            if (args.pql.includes("timestamp")) {
                const err = new Errors.NoTimestamp()
                this.error(err.message, { exit: err.code })
            }

            if (flags.since) {
                const currentTime = Date.now() * 1000
                const sinceTimestamp = (() => {
                    try {
                        return calculateSinceTimestamp(flags.since)
                    } catch (error) {
                        const err = new Errors.SinceFormatError(error)
                        this.error(err.message, { exit: err.code })
                    }
                })()
                lastTime = currentTime - sinceTimestamp
            }
            tailMax = flags.maxItem ? flags.maxItem : 100
            while (flags.tail) {
                await fcApi.apiCall(
                    "POST",
                    {
                        data: {
                            pql: `${args.pql} AND timestamp>${lastTime}`,
                        },
                    },
                    tailResponse
                )
                await sleep(flags.sleep)
                tailMax = 100
            }
        } else {
            await fcApi.apiCall(
                "POST",
                {
                    data: {
                        pql: args.pql,
                    },
                },
                normalResponse
            )
        }
    }
}
