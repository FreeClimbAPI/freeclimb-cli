
/* WARNING: This file is automatically generated. Please edit the files in the /generation/tests directory. */
import { expect, test } from "@oclif/test"
import { cred } from "../../src/credentials"


const queueId="userInput-queueId";

    
    describe("call-queues:update Data Test", function () {
    const testJson = {
  "message": "Response from server"
}

    
    const nockServerResponse = `{
  "message": "Response from server"
}`

test.nock("https://www.freeclimb.com", async (api) =>
    api
        .post(`/apiserver/Accounts/${await cred.accountId}/Queues/${queueId}` , {})
        .query({})
        .basicAuth({ user: await cred.accountId, pass: await cred.apiKey })
        .reply(200, testJson)
    )
    .stdout()
    .command(["call-queues:update","userInput-queueId"])
    .it("Test all required paramaters", async (ctx) => {
        expect(ctx.stdout).to.contain(nockServerResponse)
        
    })

const testJsonErrorNoSuggestion = {
  "code": 2,
  "message": "Method Not Allowed",
  "url": "https://docs.freeclimb.com/reference/error-and-warning-dictionary#2",
  "details": {}
}

    
    const nockServerResponseErrorNoSuggestion = `starting test`

test.nock("https://www.freeclimb.com", async (api) =>
    api
        .post(`/apiserver/Accounts/${await cred.accountId}/Queues/${queueId}` , {})
        .query({})
        .basicAuth({ user: await cred.accountId, pass: await cred.apiKey })
        .reply(500, testJsonErrorNoSuggestion)
    )
    .stdout()
    .command(["call-queues:update","userInput-queueId"])
    .exit(3)
    .it("Test Freeclimb Api error repsonce is process correctly without a suggestion")

test.nock("https://user-custom-domain.example.com", async (api) =>
    api
        .post(`/apiserver/Accounts/${await cred.accountId}/Queues/${queueId}` , {})
        .query({})
        .basicAuth({ user: await cred.accountId, pass: await cred.apiKey })
        .reply(200, testJson)
    )
    .stdout()
    .env({"FREECLIMB_CLI_BASE_URL":"https://user-custom-domain.example.com/apiserver"})
    .command(["call-queues:update","userInput-queueId"])
    .it("Sends API requests to the base URL from an environment variable", async (ctx) => {
        expect(ctx.stdout).to.contain(nockServerResponse)
        
    })

const testJsonErrorWithSuggestion = {
  "code": 50,
  "message": "Unauthorized To Make Request",
  "url": "https://docs.freeclimb.com/reference/error-and-warning-dictionary#50",
  "details": {}
}

    
    const nockServerResponseErrorWithSuggestion = `starting test`

test.nock("https://www.freeclimb.com", async (api) =>
    api
        .post(`/apiserver/Accounts/${await cred.accountId}/Queues/${queueId}` , {})
        .query({})
        .basicAuth({ user: await cred.accountId, pass: await cred.apiKey })
        .reply(500, testJsonErrorWithSuggestion)
    )
    .stdout()
    .command(["call-queues:update","userInput-queueId"])
    .exit(3)
    .it("Test Freeclimb Api error repsonce is process correctly with a suggestion")

test
    .stdout()
    .command(["call-queues:update","userInput-queueId","additionalArguments"])
    .exit(2)
    .it("Test parse error gets triggered when there is an additional argument")

test.nock("https://www.freeclimb.com", async (api) =>
    api
        .post(`/apiserver/Accounts/${await cred.accountId}/Queues/${queueId}` , {})
        .query({})
        .basicAuth({ user: await cred.accountId, pass: await cred.apiKey })
        .reply(200, undefined )
    )
    .stdout()
    .command(["call-queues:update","userInput-queueId"])
    .exit(3)
    .it("Test error resulting in an unreadable response")



    

    test.nock("https://www.freeclimb.com", async (api) =>
    api
        .post(`/apiserver/Accounts/${await cred.accountId}/Queues/${queueId}` , {
alias:"userInput-alias",
maxSize:10,})
        .query({})
        .basicAuth({ user: await cred.accountId, pass: await cred.apiKey })
        .reply(200, testJson)
    )
    .stdout()
    .command(["call-queues:update","userInput-queueId","--alias","userInput-alias","--maxSize","10"])
    .it("testing all body parameters together and required query are sent through with request", async (ctx) => {
        expect(ctx.stdout).to.contain(nockServerResponse)
        
    })


    

    describe("call-queues:update body param flags", function () {test.nock("https://www.freeclimb.com", async (api) =>
    api
        .post(`/apiserver/Accounts/${await cred.accountId}/Queues/${queueId}` , {
alias:"userInput-alias",})
        .query({})
        .basicAuth({ user: await cred.accountId, pass: await cred.apiKey })
        .reply(200, testJson)
    )
    .stdout()
    .command(["call-queues:update","userInput-queueId","--alias","userInput-alias"])
    .it("required params and a body param is sent through with request-alias", async (ctx) => {
        expect(ctx.stdout).to.contain(nockServerResponse)
        
    })

test.nock("https://www.freeclimb.com", async (api) =>
    api
        .post(`/apiserver/Accounts/${await cred.accountId}/Queues/${queueId}` , {
maxSize:10,})
        .query({})
        .basicAuth({ user: await cred.accountId, pass: await cred.apiKey })
        .reply(200, testJson)
    )
    .stdout()
    .command(["call-queues:update","userInput-queueId","--maxSize","10"])
    .it("required params and a body param is sent through with request-maxSize", async (ctx) => {
        expect(ctx.stdout).to.contain(nockServerResponse)
        
    })

test
    .stdout()
    .command(["call-queues:update","userInput-queueId","--maxSize","1001"])
    .exit(2)
    .it("test that exit code 2 is used when maxSize number goes above 1000")

test
    .stdout()
    .command(["call-queues:update","userInput-queueId","--maxSize","-1"])
    .exit(2)
    .it("test that exit code 2 is used when maxSize number goes below 0")

})

    

    describe("call-queues:update next flag test", function () {test.nock("https://www.freeclimb.com", async (api) =>
    api
        .post(`/apiserver/Accounts/${await cred.accountId}/Queues/${queueId}` , {})
        .query({})
        .basicAuth({ user: await cred.accountId, pass: await cred.apiKey })
        .reply(200, testJson)
    )
    .stdout()
    .env({"FREECLIMB_CALL_QUEUES_UPDATE_NEXT":undefined})
    .command(["call-queues:update","userInput-queueId"])
    .command(["call-queues:update","userInput-queueId","--next"])
    .exit(3)
    .it("Tests return of Exit Code 3 when flag next is not available")

})

    

})

    describe("call-queues:update Status Test", function () {
    const testJsonStatus = ""

    
    const statusResponse = `Received a success code from FreeClimb. There is no further output.
`

test.nock("https://www.freeclimb.com", async (api) =>
    api
        .post(`/apiserver/Accounts/${await cred.accountId}/Queues/${queueId}` , {})
        .query({})
        .basicAuth({ user: await cred.accountId, pass: await cred.apiKey })
        .reply(204, testJsonStatus)
    )
    .stdout()
    .command(["call-queues:update","userInput-queueId"])
    .it("Test all required paramaters", async (ctx) => {
        expect(ctx.stdout).to.contain(statusResponse)
        
    })

})

