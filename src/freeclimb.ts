import axios from "axios"
import { cred } from "./credentials"
import { Environment } from "./environment"
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

    private baseUrl: string

    constructor(endpoint: string, authenticate: boolean, errorHandler: Errorer) {
        this.endpoint = endpoint.length > 0 ? `/${endpoint}` : ""
        this.authenticate = authenticate
        this.errorHandler = errorHandler
        this.baseUrl =
            Environment.getString("FREECLIMB_CLI_BASE_URL") || "https://www.freeclimb.com/apiserver"
    }

    async apiCall(
        method: AxiosMethodType,
        requestContent: any,
        onSuccess: (response: FreeClimbResponse) => any,
        onError = (error: any) => {
            let err: Errors.FreeClimbError
            if (error.message && error.code) {
                err = error
            } else if (error.response) {
                err = new Errors.FreeClimbAPIError(error.response.data)
            } else {
                err = new Errors.DefaultFatalError(error)
            }
            this.errorHandler.error(err.message, { exit: err.code })
        }
    ) {
        const accountId = await cred.accountId
        const apiKey = await cred.apiKey
        await axios(
            `${this.baseUrl}${this.authenticate ? `/Accounts/${accountId}` : ``}${this.endpoint}`,
            {
                method: method,
                auth: { username: accountId, password: apiKey },
                params: (requestContent as Query) ? (requestContent as Query).params : undefined,
                data: (requestContent as Body) ? (requestContent as Body).data : undefined,
            }
        )
            .then(onSuccess)
            .catch(onError)
    }
}
