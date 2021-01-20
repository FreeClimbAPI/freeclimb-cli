`freeclimb sms`
===============

A Message instance resource represents an SMS Message sent between FreeClimb and a remote endpoint. The Message may be inbound (when a person messages a FreeClimb number ) or outbound (when an Application initiates sending the Message, either via the REST API or the PerCL Sms command). The Messages list resource represents the set of all Messages made to and from an Account. Messages can exist in one of the following states:

* [`freeclimb sms:get MESSAGEID`](#freeclimb-smsget-messageid)
* [`freeclimb sms:list`](#freeclimb-smslist)
* [`freeclimb sms:send FROM TO TEXT`](#freeclimb-smssend-from-to-text)

## `freeclimb sms:get MESSAGEID`

Retrieve a representation of the specified Message.

```
USAGE
  $ freeclimb sms:get MESSAGEID

ARGUMENTS
  MESSAGEID  String that uniquely identifies this Message resource.

OPTIONS
  -h, --help  show CLI help
  -n, --next  Displays the next page of output.
```

_See code: [src/commands/sms/get.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.1.2/src/commands/sms/get.ts)_

## `freeclimb sms:list`

Retrieve a list of SMS Messages made to and from the specified Account, sorted from latest created to oldest.

```
USAGE
  $ freeclimb sms:list

OPTIONS
  -a, --accountID=accountID  String that uniquely identifies this account resource.
  -b, --beginTime=beginTime  Only show Messages sent at or after this time (GMT), given as YYYY-MM-DD hh:mm:ss.

  -d, --direction=direction  Either inbound or outbound. Only show Messages that were either sent from or received by
                             FreeClimb.

  -e, --endTime=endTime      Only show messages sent at or before this time (GMT), given as YYYY-MM-DD hh:mm..

  -f, --from=from            Only show Messages from this phone number.

  -h, --help                 show CLI help

  -n, --next                 Displays the next page of output.

  -t, --to=to                Only show Messages to this phone number.
```

_See code: [src/commands/sms/list.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.1.2/src/commands/sms/list.ts)_

## `freeclimb sms:send FROM TO TEXT`

This command allows a user to send a sms message.

```
USAGE
  $ freeclimb sms:send FROM TO TEXT

ARGUMENTS
  FROM  Phone number to use as the sender. This must be an incoming phone number that you have purchased from FreeClimb.

  TO    Phone number to receive the message. Must be within FreeClimb's service area. For trial accounts, must be a
        Verified Number.

  TEXT  Text contained in the message (maximum 160 characters).   Note: For text, only ASCII characters are supported.

OPTIONS
  -a, --accountId=accountId              String that uniquely identifies this account resource.
  -h, --help                             show CLI help

  -n, --notificationUrl=notificationUrl  When the Message changes status, this URL is invoked using HTTP POST with the
                                         messageStatus parameters.  Note: This is a notification only; any PerCL
                                         returned is ignored.
```

_See code: [src/commands/sms/send.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.1.2/src/commands/sms/send.ts)_
