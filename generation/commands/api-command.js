/**
 * This file defines the ApiCommand object which has properties based on a
 * specified FreeClimb command. This file includes functions that allow for
 * retrieval of the ApiCommand's description, camel cased class name, and Axios
 * endpoint. api-commands.js is not a part of the CLI but rather a necessary
 * component for generating command files. Changes made to this file may affect
 * generated command files.
 */
const descriptionOverrides = require("../schema/description-overrides.json")

module.exports = class ApiCommand {
    constructor(topic, command) {
        Object.keys(command).forEach((key) => {
            this[key] = command[key]
        }) // to allow adding new properties to the JSON, copy everything over first
        this.topic = topic.topic
        this.name = command.commandName
        this.description = this.setCommandDescription(
            topic.topic,
            command.commandName,
            command.description
        )
        this.method = command.method.toUpperCase()
        this.params = command.params.filter(
            (param) => !(param.paramType === "path" && param.name === "accountId")
        )

        this.flags = this.params.filter((param) => this.accessSpecifier(param) === "flags")
        this.args = this.params.filter((param) => this.accessSpecifier(param) === "args")

        this.pathParams = this.params.filter((param) => param.paramType === "path")
        this.bodyParams = this.params.filter((param) => param.paramType === "body")
        this.queryParams = this.params.filter((param) => param.paramType === "query")

        this.integerParams = this.params.filter((param) => param.dataType === "int32")
        this.booleanParams = this.params.filter((param) => param.dataType === "boolean")

        this.endpoint = this.setEndpoint(command.endpoint)
        this.usesAuthentication = command.endpoint.includes("accountId")
        this.className = this.setClassName(topic.topic, command.commandName)
    }

    // Return description of command
    setCommandDescription(topicName, commandName, commandDescription) {
        let description = ""

        // First looks for description in descriptionOverrides
        // If not found, use description from apiInfo
        try {
            description = descriptionOverrides.topics[topicName].commands[commandName]
            if (description) {
                return description
            }
            throw new Error("No override exists")
        } catch (error) {
            return commandDescription
        }
    }

    // Return camel cased class name
    setClassName(topicName, commandName) {
        return `${topicName
            .split("-")
            .map((elem, index) =>
                index === 0 ? elem : elem.charAt(0).toUpperCase() + elem.slice(1)
            )
            .join("")}${commandName
            .split("-")
            .map((elem) => elem.charAt(0).toUpperCase() + elem.slice(1))
            .join("")}`
    }

    // Return endpoint for Axios
    setEndpoint(endpoint) {
        const originalUrl = endpoint.split("/")
        let slicePoint = 0
        const url = originalUrl
            .map((pathComponent, index) => {
                if (pathComponent === "apiserver" || pathComponent === "accountId") {
                    // will slice the array after apiserver or accountId, whichever comes later
                    slicePoint = index + 1
                }
                this.pathParams.forEach((param) => {
                    if (param.name === pathComponent) {
                        pathComponent =
                            "${" + this.accessSpecifier(param) + "." + pathComponent + "}"
                    }
                })
                return pathComponent
            })
            .slice(slicePoint)
            .join("/")
        return url
    }

    accessSpecifier(param) {
        return param.required ? "args" : "flags"
    }
}
