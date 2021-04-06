const argumentCount = process.argv.length
if (argumentCount !== 4) {
    console.log("Wrong number of arguments!")
    process.exit(1)
}

const versionRegex = /^(\d+\.){2}\d+$/

const oldVer = process.argv[2]
const newVer = process.argv[3]
const logVersionNumbers = () => console.log(`Old version: ${oldVer}, New version: ${newVer}`)

if (!(versionRegex.test(oldVer) && versionRegex.test(newVer))) {
    console.log("One of the version numbers has an invalid format.")
    logVersionNumbers()
    process.exit(2)
}

const versionStringToNumber = (versionString) => parseInt(versionString.split(".").join(""), 10)

if (!(versionStringToNumber(newVer) > versionStringToNumber(oldVer))) {
    console.log("The new version number is not greater than the old version number.")
    logVersionNumbers()
    process.exit(3)
}

process.exit(0)
