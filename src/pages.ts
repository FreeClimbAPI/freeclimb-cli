export class Page {
    private nextId?: string

    private pageNumber: number

    private isPaginated = false

    constructor(output: string) {
        const uri = /"nextPageUri": (?:[\s\S]*cursor=)?([0-9a-zA-Z]+)/g.exec(output)
        const pageNum = /"page":[\s]*([\d]+)/g.exec(output)
        if (uri !== null) {
            // otherwise each call to output would overwrite the next ID
            this.nextId = uri[1]
            this.isPaginated = true
        }
        if (pageNum === null) {
            this.pageNumber = 0
        } else {
            this.pageNumber = parseInt(pageNum[1], 10)
        }
    }

    /**
     * @returns undefined if the command does not support multiple page output
     * @returns null if the command supports multiple page output, but there is not currently an additional page
     * @returns the identifer of the next page otherwise
     */
    get next(): Next {
        if (this.isPaginated) {
            return this.nextId === "null" ? null : this.nextId
        }
        return undefined
    }

    get num(): number {
        return this.pageNumber
    }
}

export type Next = string | undefined | null
