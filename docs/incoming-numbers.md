`freeclimb incoming-numbers`
============================

This is the collection of all the phone numbers that you have purchased from FreeClimb and which now belong to the account. These phone numbers can receive and send calls.

* [`freeclimb incoming-numbers:buy PHONENUMBER`](#freeclimb-incoming-numbersbuy-phonenumber)
* [`freeclimb incoming-numbers:delete PHONENUMBERID`](#freeclimb-incoming-numbersdelete-phonenumberid)
* [`freeclimb incoming-numbers:get PHONENUMBERID`](#freeclimb-incoming-numbersget-phonenumberid)
* [`freeclimb incoming-numbers:list`](#freeclimb-incoming-numberslist)
* [`freeclimb incoming-numbers:update PHONENUMBERID`](#freeclimb-incoming-numbersupdate-phonenumberid)

## `freeclimb incoming-numbers:buy PHONENUMBER`

Purchase a new phone number for the specified account. If the specified phone number is available, FreeClimb will add it to the account. To find an available phone number, use the /AvailablePhoneNumbers endpoint.

```
USAGE
  $ freeclimb incoming-numbers:buy PHONENUMBER

ARGUMENTS
  PHONENUMBER  Phone number to purchase in E.164 format (as returned in the list of Available Phone Numbers).

OPTIONS
  -A, --applicationId=applicationId  ID of the application that should handle phone calls to the number.
  -a, --alias=alias                  Description for this new incoming phone number (max 64 characters).
  -h, --help                         show CLI help
```

_See code: [src/commands/incoming-numbers/buy.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.5.0/src/commands/incoming-numbers/buy.ts)_

## `freeclimb incoming-numbers:delete PHONENUMBERID`

Delete the specified incoming number. FreeClimb will no longer answer calls to the number.

```
USAGE
  $ freeclimb incoming-numbers:delete PHONENUMBERID

ARGUMENTS
  PHONENUMBERID  String that uniquely identifies this phone number resource.

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/incoming-numbers/delete.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.5.0/src/commands/incoming-numbers/delete.ts)_

## `freeclimb incoming-numbers:get PHONENUMBERID`

Retrieve a representation of the specified incoming phone number.

```
USAGE
  $ freeclimb incoming-numbers:get PHONENUMBERID

ARGUMENTS
  PHONENUMBERID  String that uniquely identifies this phone number resource.

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/incoming-numbers/get.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.5.0/src/commands/incoming-numbers/get.ts)_

## `freeclimb incoming-numbers:list`

Retrieve a list of Incoming Phone Numbers associated with the specified account, sorted from newest to oldest.

```
USAGE
  $ freeclimb incoming-numbers:list

OPTIONS
  -A, --applicationId=applicationId  Filters numbers by application ID.
  -C, --country=country              Filters numbers by two character ISO country code.
  -E, --smsEnabled=true|false        Filters numbers based on SMS capability.
  -a, --alias=alias                  Only show incoming phone numbers with aliases that exactly match this value.
  -h, --hasApplication=true|false    Filters numbers by whether or not they are associated with an application.
  -h, --help                         show CLI help
  -n, --next                         Displays the next page of output.
  -o, --voiceEnabled=true|false      Filters numbers based on voice capability.

  -p, --phoneNumber=phoneNumber      Only show incoming phone number resources that match this PCRE-compatible regular
                                     expression.

  -r, --region=region                Filters numbers by two letter state abbreviation. This flag is only available for
                                     US numbers.
```

_See code: [src/commands/incoming-numbers/list.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.5.0/src/commands/incoming-numbers/list.ts)_

## `freeclimb incoming-numbers:update PHONENUMBERID`

Update the properties of the specified incoming phone number.

```
USAGE
  $ freeclimb incoming-numbers:update PHONENUMBERID

ARGUMENTS
  PHONENUMBERID  String that uniquely identifies this phone number resource.

OPTIONS
  -A, --applicationId=applicationId  ID of the Application that should handle calls to this number.
  -a, --alias=alias                  Description for this phone number.
  -h, --help                         show CLI help
```

_See code: [src/commands/incoming-numbers/update.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.5.0/src/commands/incoming-numbers/update.ts)_
