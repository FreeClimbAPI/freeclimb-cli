import { Command, flags } from "@oclif/command"

export class data extends Command {
    static description = `Find your data directory. You can store your credentials here in a .env file, after setting permissions appropriately. See https://oclif.io/docs/config for how to change this location.`

    static flags = {
        help: flags.help({ char: "h" }),
    }

    async run() {
        const { flags } = this.parse(data)
        this.log(`FreeClimb CLI Data directory: ${this.config.dataDir}`)
        return this.config.dataDir
    }
}
