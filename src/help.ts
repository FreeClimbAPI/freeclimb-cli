import Help from "@oclif/help"

import * as Config from "@oclif/config"

import * as indent from "indent-string"

import chalk from "chalk"

const { bold } = chalk

import { renderList } from "@oclif/help/lib/list"

export default class FreeClimbHelpClass extends Help {
    protected formatTopics(topics: Config.Topic[]): string {
        if (topics.length === 0) return ""
        const body = renderList(
            topics.map((c) => [c.name, c.description && this.render(c.description.split("\n")[0])]),
            {
                spacer: "\n",
                stripAnsi: this.opts.stripAnsi,
                maxWidth: this.opts.maxWidth - 2,
            }
        )
        return [
            bold("TOPICS"),
            "To learn about the available commands in a topic, type:",
            indent("$ freeclimb [TOPIC]\n", 2),
            indent(body, 2),
        ].join("\n")
    }
}
