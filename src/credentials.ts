import * as keytar from "keytar"
import { env } from "./environment"

function removeAfter(
    credentials: { account: string; password: string }[],
    lastIndex: number
): void {
    credentials
        .filter((credential, index) => index > lastIndex)
        .forEach((credential) => keytar.deletePassword("FreeClimb", credential.account))
}

export const cred = {
    async removeCredentials(after: number) {
        const keyContents = await keytar.findCredentials("FreeClimb")
        removeAfter(keyContents, after)
    },
    get accountId() {
        return (async () => {
            try {
                const keyContents = await keytar.findCredentials("FreeClimb")
                const { account } = keyContents[0]
                return account
            } catch (error) {
                return env.accountId
            }
        })()
    },
    get authToken() {
        return (async () => {
            try {
                const keyContents = await keytar.findCredentials("FreeClimb")
                const { password } = keyContents[0]
                return password
            } catch (error) {
                return env.authToken
            }
        })()
    },
}
