/**
 * This script is purely informational. It creates a sorted list of the number of required parameters for each command.
 * This is helpful for determining whether all required parameters for every command can be positional arguments or whether some of them
 * should start being named flags after a limit has been reached.
 */
const apiJson = require("./generated-api-schema.json")
function getMaxOnly() {
    console.log(
        `Maximum required parameters in a command: ${apiJson.reduce(
            (topicMax, topic) =>
                Math.max(
                    topicMax,
                    topic.commands.reduce(
                        (maxRequired, command) =>
                            Math.max(
                                maxRequired,
                                command.params.reduce(
                                    (count, current) => count + (current.required ? 1 : 0),
                                    0
                                )
                            ),
                        0
                    )
                ),
            0
        )}`
    )
}
function outputMaxAndCommand() {
    console.log(
        `Number of required parameters in each command: \n${apiJson
            .reduce(
                (prev, topic) =>
                    prev.concat(
                        topic.commands.map((command) => [
                            `${topic.topic}:${command.commandName}`,
                            command.params.reduce(
                                (count, current) => count + (current.required ? 1 : 0),
                                0
                            ),
                        ])
                    ),
                []
            )
            .sort((first, second) => second[1] - first[1])
            .reduce((prev, val) => prev + `${val[0]} has ${val[1]} required parameters.\n`, "\n")}`
    )
}
outputMaxAndCommand()
