// Returns the current existing version of the package
const fs = require("fs")

console.log(JSON.parse(fs.readFileSync("package.json", "utf-8")).version)

process.exit(0)
