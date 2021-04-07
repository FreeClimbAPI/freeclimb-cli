`freeclimb applications`
========================

An Application in FreeClimb is just a set of configuration data and URLs that FreeClimb invokes to notify the app of an event or to retrieve instructions on how to behave in response to an event, such as when one of the phone numbers associated with the Application receives a Call. Applications are useful for encapsulating configuration information that we need to distribute across multiple phone numbers. Any number of phone numbers can point to a single Application so that they share a common set of properties and URLs. This makes it possible to change the configuration of a large number of phone numbers by modifying a single Application instance. If we create an Application with its voiceUrl set to http://www.example.com/answer, we can assign that Application to all of our incoming phone numbers and FreeClimb will make a request to that URL whenever an inbound call arrives. Likewise, when making outbound calls using the REST API, we can specify an applicationId to handle the outbound request and FreeClimb will make a request to the callConnectUrl of the Application. The callConnectUrl property is used instead of the voiceUrl property for outbound calls. The behavior of the callConnectUrl and voiceUrl are different because of the difference in ‘behavior’ when making an outbound call and answering an inbound call; the main difference being that an outbound call may not actually be connected (e.g. busy, no answer). For incoming SMS messages, we can specify an smsUrl which FreeClimb will request when a number assigned to our Application receives an SMS message. An Application resource is represented by the following properties:

* [`freeclimb applications:create`](#freeclimb-applicationscreate)
* [`freeclimb applications:delete APPLICATIONID`](#freeclimb-applicationsdelete-applicationid)
* [`freeclimb applications:get APPLICATIONID`](#freeclimb-applicationsget-applicationid)
* [`freeclimb applications:list`](#freeclimb-applicationslist)
* [`freeclimb applications:update APPLICATIONID`](#freeclimb-applicationsupdate-applicationid)

## `freeclimb applications:create`

Create a new Application within the specified account.

```
USAGE
  $ freeclimb applications:create

OPTIONS
  -F, --smsFallbackUrl=smsFallbackUrl        URL that FreeClimb will request if it times out waiting for a response from
                                             the smsUrl. Used for inbound SMS only. Note: Any PerCL returned will be
                                             ignored.

  -V, --voiceFallbackUrl=voiceFallbackUrl    URL that FreeClimb will request if it times out waiting for a response from
                                             the voiceUrl. Used for inbound calls only. Note: A PerCL response is
                                             expected to control the inbound call.

  -a, --alias=alias                          Description of the new application (maximum 64 characters).

  -c, --callConnectUrl=callConnectUrl        URL that FreeClimb will request when an outbound call request is complete.
                                             Used for outbound calls only. Note: A PerCL response is expected if the
                                             outbound call is connected (status=InProgress) to control the call.

  -h, --help                                 show CLI help

  -s, --statusCallbackUrl=statusCallbackUrl  URL that FreeClimb will request to pass call status (such as call ended) to
                                             the application. Note: This is a notification only; any PerCL returned will
                                             be ignored.

  -u, --smsUrl=smsUrl                        URL that FreeClimb will request when a phone number assigned to this
                                             application receives an incoming SMS message. Used for inbound SMS only.
                                             Note: Any PerCL returned will be ignored.

  -v, --voiceUrl=voiceUrl                    URL that FreeClimb should request when an inbound call arrives on a phone
                                             number assigned to this application. Used only for inbound calls. Note: A
                                             PerCL response is expected to control the inbound call.
```

_See code: [src/commands/applications/create.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.2.0/src/commands/applications/create.ts)_

## `freeclimb applications:delete APPLICATIONID`

Delete the specified application. If this application's ID is assigned to any Incoming phone number, that relationship will be cleared.

```
USAGE
  $ freeclimb applications:delete APPLICATIONID

ARGUMENTS
  APPLICATIONID  String that uniquely identifies this application resource.

OPTIONS
  -h, --help  show CLI help

DESCRIPTION
  If successful, FreeClimb will return an HTTP 204 response with no body.
```

_See code: [src/commands/applications/delete.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.2.0/src/commands/applications/delete.ts)_

## `freeclimb applications:get APPLICATIONID`

Retrieve a representation of the specified application.

```
USAGE
  $ freeclimb applications:get APPLICATIONID

ARGUMENTS
  APPLICATIONID  A string that uniquely identifies this application resource.

OPTIONS
  -h, --help  show CLI help
  -n, --next  Displays the next page of output.
```

_See code: [src/commands/applications/get.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.2.0/src/commands/applications/get.ts)_

## `freeclimb applications:list`

Retrieve a list of Applications associated with the specified account, sorted from latest created to oldest.

```
USAGE
  $ freeclimb applications:list

OPTIONS
  -a, --alias=alias  Return only applications with aliases that exactly match this value.
  -h, --help         show CLI help
  -n, --next         Displays the next page of output.
```

_See code: [src/commands/applications/list.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.2.0/src/commands/applications/list.ts)_

## `freeclimb applications:update APPLICATIONID`

Update the properties of the specified application. Note For voiceUrl and fallbackVoiceUrl a PerCL response is expected to control the inbound call.

```
USAGE
  $ freeclimb applications:update APPLICATIONID

ARGUMENTS
  APPLICATIONID  A string that uniquely identifies this application resource.

OPTIONS
  -F, --smsFallbackUrl=smsFallbackUrl        The URL that FreeClimb will request if it times out waiting for a response
                                             from the smsUrl. Used for inbound SMS only.  Note: Any PerCL returned will
                                             be ignored.

  -V, --voiceFallbackUrl=voiceFallbackUrl    The URL that FreeClimb will request if it times out waiting for a response
                                             from the voiceUrl. Used for inbound calls only. Note: A PerCL response is
                                             expected to control the inbound call.

  -a, --alias=alias                          A human readable description of the application, with maximum length 64
                                             characters.

  -c, --callConnectUrl=callConnectUrl        The URL that FreeClimb will request when an outbound call request is
                                             complete. Used for outbound calls only.  Note: A PerCL response is expected
                                             if the outbound call is connected (status=InProgress) to control the call.

  -h, --help                                 show CLI help

  -s, --statusCallbackUrl=statusCallbackUrl  The URL that FreeClimb will request to pass call status (such as call
                                             ended) to the application.  Note: This is a notification only; any PerCL
                                             returned will be ignored.

  -u, --smsUrl=smsUrl                        The URL that FreeClimb will request when a phone number assigned to this
                                             application receives an incoming SMS message. Used for inbound SMS only.
                                             Note: Any PerCL returned will be ignored.

  -v, --voiceUrl=voiceUrl                    The URL that FreeClimb will request when an inbound call arrives on a phone
                                             number assigned to this application. Used only for inbound calls.
```

_See code: [src/commands/applications/update.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.2.0/src/commands/applications/update.ts)_
