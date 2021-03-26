/* WARNING: This file is automatically generated. Please edit the files in the /generation/commands directory. */
import { Command, flags } from "@oclif/command"
import chalk from "chalk"
import { Output } from "../../output"
import { FreeClimbApi, FreeClimbResponse } from "../../freeclimb"
import * as Errors from "../../errors"

export class applicationsUpdate extends Command {
    static description = ` Update the properties of the specified application.`

    static flags = {
        alias: flags.string({
            char: "a",
            description:
                "A human readable description of the application, with maximum length 64 characters.",
            required: false,
        }),
        voiceUrl: flags.string({
            char: "v",
            description:
                "The URL that FreeClimb will request when an inbound call arrives on a phone number assigned to this application. Used only for inbound calls.",
            required: false,
        }),
        voiceFallbackUrl: flags.string({
            char: "V",
            description:
                "The URL that FreeClimb will request if it times out waiting for a response from the voiceUrl. Used for inbound calls only. Note: A PerCL response is expected to control the inbound call.",
            required: false,
        }),
        callConnectUrl: flags.string({
            char: "c",
            description:
                "The URL that FreeClimb will request when an outbound call request is complete. Used for outbound calls only. Note: A PerCL response is expected if the outbound call is connected (status=InProgress) to control the call.",
            required: false,
        }),
        statusCallbackUrl: flags.string({
            char: "s",
            description:
                "The URL that FreeClimb will request to pass call status (such as call ended) to the application. Note: This is a notification only; any PerCL returned will be ignored.",
            required: false,
        }),
        smsUrl: flags.string({
            char: "u",
            description:
                "The URL that FreeClimb will request when a phone number assigned to this application receives an incoming SMS message. Used for inbound SMS only. Note: Any PerCL returned will be ignored.",
            required: false,
        }),
        smsFallbackUrl: flags.string({
            char: "F",
            description:
                "The URL that FreeClimb will request if it times out waiting for a response from the smsUrl. Used for inbound SMS only. Note: Any PerCL returned will be ignored.",
            required: false,
        }),
        next: flags.boolean({ hidden: true }),
        help: flags.help({ char: "h" }),
    }

    static args = [
        {
            name: "applicationId",
            description: "A string that uniquely identifies this application resource.",
            required: true,
        },
    ]

    async run() {
        const out = new Output(this)
        const { args, flags } = (() => {
            try {
                return this.parse(applicationsUpdate)
            } catch (error) {
                const err = new Errors.ParseError(error)
                this.error(err.message, { exit: err.code })
            }
        })()
        const fcApi = new FreeClimbApi(`Applications/${args.applicationId}`, true, this)
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
        if (Object.entries(flags).length === 0) {
            this.warn(
                chalk.yellow(
                    "Nothing Has Been Updated: Please enter a parameter to update ('freeclimb applications:update -h' for a list of parameters to be updated)"
                )
            )
        }

        await fcApi.apiCall(
            "POST",
            {
                data: {
                    alias: flags.alias,
                    voiceUrl: flags.voiceUrl,
                    voiceFallbackUrl: flags.voiceFallbackUrl,
                    callConnectUrl: flags.callConnectUrl,
                    statusCallbackUrl: flags.statusCallbackUrl,
                    smsUrl: flags.smsUrl,
                    smsFallbackUrl: flags.smsFallbackUrl,
                },
            },
            normalResponse
        )
    }
}
