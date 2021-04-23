import { Command, flags } from "@oclif/command"
import cli from "cli-ux"
import * as keytar from "keytar"
import chalk from "chalk"
import { cred } from "../credentials"
import * as Errors from "../errors"
import { FreeClimbApi, FreeClimbResponse, FreeClimbErrorResponse } from "../freeclimb"

export class login extends Command {
    static description = `Log in to FreeClimb with your credentials. Alternatively you can set the ACCOUNT_ID and API_KEY environment variables. To learn how to put them in a file, run freeclimb data -h`

    static flags = {
        help: flags.help({ char: "h" }),
    }

    async run() {
        const fcApi = new FreeClimbApi(``, true, this)
        const verifyResponse = (response: FreeClimbResponse) => {
            const resp =
                "\n<---Your ACCOUNT_ID and API_KEY have been verified through Freeclimb.---> \n\nWhat Can I Do Next?\n\n  To check account information run: \n\t freeclimb accounts:get \n\n  To see all commands available through the api, run freeclimb with the help flag: \n\t freeclimb --help \n\n"
            this.log(chalk.green(resp))
        }
        const verifyErrorResponse = (error: FreeClimbErrorResponse) => {
            const respError =
                "\n<---Inputted ACCOUNT_ID and API_KEY where not valid. Please try again.--> \n"
            this.log(chalk.red(respError))
        }

        const { flags } = this.parse(login)
        this.log("You can find your Account ID and API Key at https://www.freeclimb.com/dashboard")
        const confirmation: boolean = await cli.confirm(
            "If you are already logged in to the FreeClimb CLI on this computer, you will first be logged out of that account. Would you like to continue? [y/N]"
        )

        if (confirmation) {
            const accountId = await cli.prompt("-> The Account ID of your FreeClimb Account", {
                type: "hide",
            })

            const apiKey = await cli.prompt("-> Your API Key for your FreeClimb Account", {
                type: "hide",
            })
            await cred.removeCredentials(-1)
            try {
                await keytar.setPassword("FreeClimb", accountId, apiKey)
            } catch (error) {
                const err = new Errors.SetPasswordError(error.message)
                this.error(err.message, { exit: err.code })
            }
            await fcApi.apiCall("GET", {}, verifyResponse, verifyErrorResponse)
            if (/^AC[0-9a-fA-F]{40}$/gm.exec(accountId) === null) {
                this.warn(
                    chalk.yellow(
                        "Your Account ID has been saved, but it does not appear to match the correct Account ID format"
                    )
                )
            }
            if (/^[0-9a-fA-F]{40}$/gm.exec(apiKey) === null) {
                this.warn(
                    chalk.yellow(
                        "Your API Key has been saved, but it does not appear to match the correct API Key format"
                    )
                )
            }
        } else {
            const err = new Errors.LoginCancelled()
            this.error(err.message, { exit: err.code })
        }
    }
}
