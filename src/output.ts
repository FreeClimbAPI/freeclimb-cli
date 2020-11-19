import { Page, Next } from "./pages"
import { Environment } from "./environment"

type Log = { log(x: string): any }
type DataStore = Log & { config: { dataDir: string } }
export class Output {
    private currentPage?: Page

    private environment: Environment

    private logger: Log

    private commandName: string

    constructor(logger: Log, storePath?: string) {
        let envDir = storePath
        this.logger = logger
        this.commandName = Output.formatCommandNameUnderscores(logger.constructor.name)
        if (logger as DataStore) {
            envDir = (logger as DataStore).config.dataDir
        }
        this.environment = new Environment(envDir)
    }

    out(output: string): void {
        // logger has any type with a function called log that takes a string
        this.logger.log(output)
        this.currentPage = new Page(output)

        if (this.currentPage.next as string) {
            this.environment.setStringPersist(
                `FREECLIMB_${this.commandName}_NEXT`,
                this.currentPage.next as string
            )
            this.logger.log(
                `== Currently on page ${this.currentPage.num}. Run this command again with the -n flag to go to the next page. ==`
            )
        }
    }

    get next(): Next {
        if (this.currentPage && this.currentPage.next === null) {
            // if at the last page of output
            return null
        }
        const env: string = Environment.getString(`FREECLIMB_${this.commandName}_NEXT`)
        return env === "" ? undefined : env
    }

    private static formatCommandNameUnderscores(name: string) {
        let output = ""
        const tempArray = name.split("")
        tempArray.forEach((letter) => {
            if (letter === letter.toUpperCase()) {
                output += "_"
            }
            output += letter.toUpperCase()
        })
        return output
    }
}
