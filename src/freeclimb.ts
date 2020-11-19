import axios from "axios"
import { cred } from "./credentials"
import * as Errors from "./errors"

type Errorer = { error(message: string, exitCode: { exit: number }): any }

type Body = { data: Record<string, any> }
type Query = { params: Record<string, any> } // the linter recommends Record<string, any> to represent any object

type AxiosMethodType =
    | "get"
    | "GET"
    | "delete"
    | "DELETE"
    | "head"
    | "HEAD"
    | "options"
    | "OPTIONS"
    | "post"
    | "POST"
    | "put"
    | "PUT"
    | "patch"
    | "PATCH"
    | "link"
    | "LINK"
    | "unlink"
    | "UNLINK"
    | undefined

export type FreeClimbErrorResponse = { response: Body }

export type FreeClimbResponse = Body & { status: number }

export class FreeClimbApi {
    private endpoint: string

    private errorHandler: Errorer

    private authenticate: boolean

    constructor(endpoint: string, authenticate: boolean, errorHandler: Errorer) {
        this.endpoint = endpoint.length > 0 ? `/${endpoint}` : ""
        this.authenticate = authenticate
        this.errorHandler = errorHandler
    }

    async apiCall(
        method: AxiosMethodType,
        requestContent: any,
        onSuccess: (response: FreeClimbResponse) => any,
        onError = (error: FreeClimbErrorResponse) => {
            const err = new Errors.FreeClimbAPIError(error.response.data)
            this.errorHandler.error(err.message, { exit: err.code })
        }
    ) {
        const accountId = await cred.accountId
        const authToken = await cred.authToken
        await axios(
            `https://www.freeclimb.com/apiserver${
                this.authenticate ? `/Accounts/${accountId}` : ``
            }${this.endpoint}`,
            {
                method: method,
                auth: { username: accountId, password: authToken },
                params: (requestContent as Query) ? (requestContent as Query).params : undefined,
                data: (requestContent as Body) ? (requestContent as Body).data : undefined,
            }
        )
            .then(onSuccess)
            .catch(onError)
    }
}
