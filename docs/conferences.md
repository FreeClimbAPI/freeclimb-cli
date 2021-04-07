`freeclimb conferences`
=======================

A Conference represents a call between two or more participants.

* [`freeclimb conferences:create`](#freeclimb-conferencescreate)
* [`freeclimb conferences:get CONFERENCEID`](#freeclimb-conferencesget-conferenceid)
* [`freeclimb conferences:list`](#freeclimb-conferenceslist)
* [`freeclimb conferences:update CONFERENCEID`](#freeclimb-conferencesupdate-conferenceid)

## `freeclimb conferences:create`

Create an empty Conference within the specified account. The status of a conference will be reported to the statusCallbackUrl when: Participants can be added to a Conference once the statusCallbackUrl is invoked, signifying the Conference has been created and is empty. When a populated or inProgress Conference is terminated, this URL is called twice — once when the Conference becomes empty and then again when it is terminated. Note This is a notification only. Any PerCL returned by the application is ignored. The statusCallbackUrl is invoked using HTTP POST with the following parameters (in addition to the standard request parameters).

```
USAGE
  $ freeclimb conferences:create

OPTIONS
  -a, --alias=alias                          A description for this Conference. Maximum 64 characters.

  -b, --playBeep=playBeep                    Controls when a beep is played. Valid values: always, never, entryOnly,
                                             exitOnly.

  -h, --help                                 show CLI help

  -r, --record=true|false                    Setting to true records the entire Conference.

  -s, --statusCallbackUrl=statusCallbackUrl  This URL is invoked when the status of the Conference changes. For more
                                             information, see statusCallbackUrl (below).

  -w, --waitUrl=waitUrl                      If specified, a URL for the audio file that provides custom hold music for
                                             the Conference when it is in the populated state. Otherwise, FreeClimb uses
                                             a system default audio file. This is always fetched using HTTP GET and is
                                             fetched just once — when the Conference is created.
```

_See code: [src/commands/conferences/create.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.2.1/src/commands/conferences/create.ts)_

## `freeclimb conferences:get CONFERENCEID`

Retrieve a representation of the specified conference.

```
USAGE
  $ freeclimb conferences:get CONFERENCEID

ARGUMENTS
  CONFERENCEID  A string that uniquely identifies this conference resource.

OPTIONS
  -h, --help  show CLI help
  -n, --next  Displays the next page of output.
```

_See code: [src/commands/conferences/get.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.2.1/src/commands/conferences/get.ts)_

## `freeclimb conferences:list`

Retrieve a list of Conferences associated with the specified account, sorted by creation date, newest to oldest.

```
USAGE
  $ freeclimb conferences:list

OPTIONS
  -D, --dateUpdated=dateUpdated  Only show Conferences that were last updated on the specified date, in the form
                                 YYYY-MM-DD.

  -S, --status=status            Only show conferences that currently have the specified status. Valid values: empty,
                                 populated, inProgress, or terminated.

  -a, --alias=alias              List Conferences whose alias exactly matches this string.

  -d, --dateCreated=dateCreated  Only show Conferences that were created on the specified date, in the form YYYY-MM-DD.

  -h, --help                     show CLI help

  -n, --next                     Displays the next page of output.
```

_See code: [src/commands/conferences/list.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.2.1/src/commands/conferences/list.ts)_

## `freeclimb conferences:update CONFERENCEID`

Update the properties of the specified conference. The statusCallbackUrl (specified upon creating the Conference) is invoked whenever a Conference is emptied or terminated. Participants are automatically disconnected. When updating the Conference status to terminated, FreeClimb returns an HTTP 204 response with no body. Once a Conference is terminated,FreeClimb will not reuse the conferenceId.

```
USAGE
  $ freeclimb conferences:update CONFERENCEID

ARGUMENTS
  CONFERENCEID  String that uniquely identifies this conference resource.

OPTIONS
  -S, --status=status      New status of the conference. Valid values: empty or terminated. For more information, see
                           Status Parameter below.**

  -a, --alias=alias        Description for this conference. Maximum 64 characters.

  -b, --playBeep=playBeep  Controls when a beep is played. Valid values: always, never, entryOnly, exitOnly.

  -h, --help               show CLI help
```

_See code: [src/commands/conferences/update.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.2.1/src/commands/conferences/update.ts)_
