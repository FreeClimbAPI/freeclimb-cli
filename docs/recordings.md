`freeclimb recordings`
======================

A Recording instance resource represents an audio file created by FreeClimb during a Call or Conference. The Recording resource is a subresource of a Call resource and Conference resource. This enables navigating directly from a Call or Conference to the Recordings generated from them. Recordings are owned by an account and are stored for the account holder on FreeClimb until deleted. There are two ways to begin a Recording:

* [`freeclimb recordings:delete RECORDINGID`](#freeclimb-recordingsdelete-recordingid)
* [`freeclimb recordings:download RECORDINGID`](#freeclimb-recordingsdownload-recordingid)
* [`freeclimb recordings:get RECORDINGID`](#freeclimb-recordingsget-recordingid)
* [`freeclimb recordings:list`](#freeclimb-recordingslist)
* [`freeclimb recordings:stream RECORDINGID`](#freeclimb-recordingsstream-recordingid)

## `freeclimb recordings:delete RECORDINGID`

Delete the specified recording. Both the audio file and the resource metadata are deleted. If successful, FreeClimb will return an HTTP 204 response with no body.

```
USAGE
  $ freeclimb recordings:delete RECORDINGID

ARGUMENTS
  RECORDINGID  String that uniquely identifies this recording resource.

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/recordings/delete.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.2.0/src/commands/recordings/delete.ts)_

## `freeclimb recordings:download RECORDINGID`

Download a Recording. Authentication is required to download a Recording, as with any other request made to the REST API. Returns a binary WAV audio file as an attachment in the HTTP response with mime-type audio/x-wav.

```
USAGE
  $ freeclimb recordings:download RECORDINGID

ARGUMENTS
  RECORDINGID  String that uniquely identifies this recording resource.

OPTIONS
  -h, --help  show CLI help
  -n, --next  Displays the next page of output.
```

_See code: [src/commands/recordings/download.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.2.0/src/commands/recordings/download.ts)_

## `freeclimb recordings:get RECORDINGID`

Retrieve metadata for a specific Recording.

```
USAGE
  $ freeclimb recordings:get RECORDINGID

ARGUMENTS
  RECORDINGID  String that uniquely identifies this recording resource.

OPTIONS
  -h, --help  show CLI help
  -n, --next  Displays the next page of output.
```

_See code: [src/commands/recordings/get.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.2.0/src/commands/recordings/get.ts)_

## `freeclimb recordings:list`

Retrieve a list of metadata for recordings associated with the specified account, sorted from latest created to oldest.

```
USAGE
  $ freeclimb recordings:list

OPTIONS
  -C, --conferenceId=conferenceId  Show only Recordings made during the conference with this ID.
  -c, --callId=callId              Show only Recordings made during the Call with this ID.
  -d, --dateCreated=dateCreated    Only show Recordings created on this date, formatted as YYYY-MM-DD.
  -h, --help                       show CLI help
  -n, --next                       Displays the next page of output.
```

_See code: [src/commands/recordings/list.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.2.0/src/commands/recordings/list.ts)_

## `freeclimb recordings:stream RECORDINGID`

Stream a Recording File. Authentication is required to stream a Recording, as with any other request made to the REST API. The bytes of the WAV audio file with mime-type audio/x-wav are returned as the content of the HTTP response message.

```
USAGE
  $ freeclimb recordings:stream RECORDINGID

ARGUMENTS
  RECORDINGID  String that uniquely identifies this recording resource.

OPTIONS
  -h, --help  show CLI help
  -n, --next  Displays the next page of output.
```

_See code: [src/commands/recordings/stream.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.2.0/src/commands/recordings/stream.ts)_
