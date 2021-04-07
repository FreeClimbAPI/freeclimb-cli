`freeclimb conference-participants`
===================================

A Participant is a subresource of a Conference resource and represents a Call currently connected to a particular Conference.

* [`freeclimb conference-participants:get CONFERENCEID CALLID`](#freeclimb-conference-participantsget-conferenceid-callid)
* [`freeclimb conference-participants:list CONFERENCEID`](#freeclimb-conference-participantslist-conferenceid)
* [`freeclimb conference-participants:remove CONFERENCEID CALLID`](#freeclimb-conference-participantsremove-conferenceid-callid)
* [`freeclimb conference-participants:update CONFERENCEID CALLID`](#freeclimb-conference-participantsupdate-conferenceid-callid)

## `freeclimb conference-participants:get CONFERENCEID CALLID`

Retrieve a representation of the specified Conference Participant.

```
USAGE
  $ freeclimb conference-participants:get CONFERENCEID CALLID

ARGUMENTS
  CONFERENCEID  ID of the conference this participant is in.
  CALLID        ID of the Call associated with this participant.

OPTIONS
  -h, --help  show CLI help
  -n, --next  Displays the next page of output.
```

_See code: [src/commands/conference-participants/get.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.2.1/src/commands/conference-participants/get.ts)_

## `freeclimb conference-participants:list CONFERENCEID`

Retrieve a list of Participants in the specified Conference, sorted by date created, newest to oldest.

```
USAGE
  $ freeclimb conference-participants:list CONFERENCEID

ARGUMENTS
  CONFERENCEID  ID of the conference this participant is in.

OPTIONS
  -T, --talk=true|false    Only show Participants with the talk privilege.
  -h, --help               show CLI help
  -l, --listen=true|false  Only show Participants with the listen privilege.
  -n, --next               Displays the next page of output.
```

_See code: [src/commands/conference-participants/list.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.2.1/src/commands/conference-participants/list.ts)_

## `freeclimb conference-participants:remove CONFERENCEID CALLID`

Remove the specified Participant from the Conference.

```
USAGE
  $ freeclimb conference-participants:remove CONFERENCEID CALLID

ARGUMENTS
  CONFERENCEID  ID of the conference this participant is in.
  CALLID        ID of the Call associated with this participant.

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/conference-participants/remove.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.2.1/src/commands/conference-participants/remove.ts)_

## `freeclimb conference-participants:update CONFERENCEID CALLID`

Update the properties of the specified conference participant.

```
USAGE
  $ freeclimb conference-participants:update CONFERENCEID CALLID

ARGUMENTS
  CONFERENCEID  ID of the conference this participant is in.
  CALLID        ID of the Call associated with this participant.

OPTIONS
  -T, --talk=true|false    (Optional) Default is true. Setting to false mutes the Participant. FreeClimb returns an
                           error and ignores any other value.

  -h, --help               show CLI help

  -l, --listen=true|false  (Optional) Default is true. Setting to false silences the Conference for this Participant.
                           FreeClimb returns an error and ignores any other value.
```

_See code: [src/commands/conference-participants/update.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.2.1/src/commands/conference-participants/update.ts)_
