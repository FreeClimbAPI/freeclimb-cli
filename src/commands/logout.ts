import { Command, flags } from "@oclif/command"
import chalk from "chalk"
import { cred } from "../credentials"

export class logout extends Command {
    static description = `Remove your saved FreeClimb Account ID and API Key from this computer's keychain. This will not remove them from environment variables or config files that you have manually edited.`

    static flags = {
        help: flags.help({ char: "h" }),
    }

    async run() {
        const { flags } = this.parse(logout)
        // this does not remove anything that may be set in .env, just what is in keychain
        await cred.removeCredentials(-1)
        this.log(
            chalk.green("Successfully removed the saved Account ID and API Key from this computer")
        )
    }
}
