// Produces the target version that the package should be upgraded to. This is read from the Changelog
const fs = require("fs")

const changelog = fs.readFileSync("CHANGELOG.md", "utf-8")

const regex = new RegExp('<a name="((?:\\d+\\.){2}\\d+)"></a>')

console.log(changelog.match(regex)[1])

process.exit(0)
