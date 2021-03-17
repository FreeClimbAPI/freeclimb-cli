/* WARNING: This file is automatically generated. Please edit the files in the /generation/commands directory. */
import { Command, flags } from "@oclif/command"
import chalk from "chalk"
import { Output } from "../../output"
import { FreeClimbApi, FreeClimbResponse } from "../../freeclimb"
import * as Errors from "../../errors"

export class callsUpdate extends Command {
    static description = ` Call hang up may take time. A 202 status code is returned if the hangup request was successfully queued by FreeClimb. Otherwise, an error code is returned. If successfully queued, the asynchronous callback for the result will occur after some time through the statusCallbackUrl.`

    static flags = {
        next: flags.boolean({ hidden: true }),
        help: flags.help({ char: "h" }),
    }

    static args = [
        {
            name: "callId",
            description: "String that uniquely identifies this call resource.",
            required: true,
        },
        {
            name: "status",
            description:
                "Either canceled or completed.  Specifying canceled attempts to hang up calls that are queued without affecting calls already in progress. Specifying completed attempts to hang up a call already in progress.",
            required: true,
        },
    ]

    async run() {
        const out = new Output(this)
        const { args, flags } = (() => {
            try {
                return this.parse(callsUpdate)
            } catch (error) {
                const err = new Errors.ParseError(error)
                this.error(err.message, { exit: err.code })
            }
        })()
        const fcApi = new FreeClimbApi(`Calls/${args.callId}`, true, this)
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
        if (flags.next) {
            const error = new Errors.NoNextPage()
            this.error(error.message, { exit: error.code })
        }

        await fcApi.apiCall(
            "POST",
            {
                data: {
                    status: args.status,
                },
            },
            normalResponse
        )
    }
}
