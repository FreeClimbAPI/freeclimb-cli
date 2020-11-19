/**
 * Script to build a JSON object containing information about the FreeClimb API that is relevant for generating a CLI.
 * Prerequisite: Visit https://docs.freeclimb.com/reference/using-the-api in a browser.
 * Usage: Open the console, paste in this script, and run it. Wait until the resulting JSON is displayed in the console.
 */
// const maxDescriptionLength = 512 // no longer used
const descriptionSeparator = " " // Inserted between adjacent elements in a description
const refreshTimeout = 2000 // How long the browser should wait before loading each API page

jQuery.ajaxSetup({ async: false })
let originalTopics = $.makeArray(
    $(
        "h3:contains('FreeClimb API') ~ ul li a[ui-sref*='reference.show({\\'category\\'\\: ']:has(span[ng-click])"
    )
)
function processTopic(currentTopic) {
    let commandsUsed = []
    let currentTopicName = $(currentTopic).text().split(" ").join("-").toLowerCase()
    return {
        topic: currentTopicName,
        // current => $(current).text().length <= maxDescriptionLength // this filter is no longer used below
        description: formatDescriptionElements(
            $.makeArray(
                $(
                    "div.hub-api > div.hub-reference-section > div.hub-reference-left > div.markdown-body > p"
                )
            ).filter(
                (current) =>
                    $(current)
                        .parent()
                        .siblings(
                            "div.api-definition-parent" /* filters out command descriptions */
                        ).length === 0
            )
        ),
        commands: $.makeArray($(currentTopic).siblings("ul.subpages").find("div.link-title")).map(
            (currentCommand) => {
                let commandTitle = $(currentCommand).clone()
                commandTitle.find("span").remove() // gets rid of the * in the output for required fields
                let wordIndex = 0
                let newCommandName = $(commandTitle).text().split(" ")[0].toLowerCase()
                while (commandsUsed.includes(newCommandName)) {
                    // we can't have duplicate command names for the CLI!
                    newCommandName += `-${$(commandTitle)
                        .text()
                        .split(" ")
                        [++wordIndex].toLowerCase()}` // hyphenate command name with the next word to make it unique
                }
                commandsUsed.push(newCommandName)
                let currentCommandContainer = $(
                    `div.hub-reference-section:has(h2:contains('${$(commandTitle).text()}'))`
                ).siblings("div.hub-api")
                let descriptionContainer = currentCommandContainer
                    .find("div.hub-reference-left > div.markdown-body")
                    .clone() // without hub-reference-left, the one on the right would also get captured
                descriptionContainer.find("noscript").remove()
                let commandDescription = formatDescriptionElements(
                    $.makeArray(descriptionContainer.find("p"))
                )
                let currentMethod = $(currentCommand).find("span").text()
                let nextPageProperty = $("span.cm-property:contains(nextPageUri)")
                let paginationContainer = nextPageProperty
                    .parents("div.hub-reference-section-code")
                    .find("div.code-sample.tabber-parent > div > div > div > pre > span")
                    .clone()
                paginationContainer.children().remove()
                let supportsPagination = $.makeArray(paginationContainer).some((elem) => {
                    let txt = $(elem).text().toLowerCase()
                    let methodOnly = /([a-z]+)/.exec(txt)[1] === currentMethod // this is the most common pattern
                    let fullCurl = /-x ([a-z]+)/.exec(txt) // some resources, namely applications, have the whole command in one elem
                    if (fullCurl === null) {
                        fullCurl = false
                    } else {
                        fullCurl = fullCurl[1] === currentMethod
                    }
                    return methodOnly || fullCurl
                })
                let extractedUrl = currentCommandContainer.find("span.definition-url").text() // this is all that is needed because next step automatically checks for variables. next line not needed
                // let extractedUrl = currentCommandContainer.find('span.definition-url').children().map(component => $(component).hasClass('api-variable') ? $(component).text() : `{{${component.text()}}}`).join('') // special signifier for {{variables}}
                let commandParams = []
                $.makeArray(currentCommandContainer.find("label.label-name"))
                    .map((currentParam) => {
                        let paramTitle = $(currentParam).clone()
                        let allowedDataType = $(currentParam).siblings("span.label-type").text()
                        let paramTypeRegex = /^([a-z]+)-/
                        let extractedParamType = paramTypeRegex.exec(paramTitle.attr("for"))[1]
                        let requiredLabel = paramTitle.find("span.label-required")
                        let isRequired = requiredLabel.length !== 0
                        requiredLabel.remove()
                        let paramDescription = $(currentParam)
                            .siblings("div.description")
                            .find("div.field-description > p")
                            .text()
                        return {
                            name: paramTitle.text(),
                            paramType: extractedParamType,
                            required: isRequired,
                            dataType: allowedDataType,
                            description: paramDescription,
                        }
                    })
                    .forEach((param) => commandParams.push(param))
                return {
                    title: $(commandTitle).text(),
                    commandName: newCommandName,
                    pagination: supportsPagination,
                    endpoint: extractedUrl,
                    description: commandDescription,
                    method: currentMethod,
                    params: commandParams,
                }
            }
        ),
    }
}
function formatDescriptionElements(elementArray) {
    return elementArray
        .reduce(
            (previous, current) =>
                previous.add(
                    $(current)
                        .clone()
                        .text((i, oldText) => descriptionSeparator + oldText)
                ),
            $()
        )
        .text()
        .replace(/\n{2,}/g, "\n\n") // removes multiple line breaks and replaces them with just two
}
function fetchContent(currentTopic) {
    $.get($(currentTopic).attr("href"), (response) => {
        $("body").html(response)
    })
}
function timeoutProcessTopic(result, index) {
    // This recursive timeout solution is necessary because the frontend framework needs time to render after each load
    if (index === originalTopics.length) {
        console.log(JSON.stringify(result, null, 2))
        return
    }
    fetchContent(originalTopics[index])
    setTimeout(() => {
        result.push(processTopic(originalTopics[index]))
        timeoutProcessTopic(result, index + 1)
    }, refreshTimeout)
}
let apiObject = []
timeoutProcessTopic(apiObject, 0)
