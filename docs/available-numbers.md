`freeclimb available-numbers`
=============================

Available Numbers are FreeClimb phone numbers available for purchase. The properties of the Available Phone Numbers resource provides a means to search for phone numbers that are available to buy.

* [`freeclimb available-numbers:list`](#freeclimb-available-numberslist)

## `freeclimb available-numbers:list`

Search for phone numbers that are available for purchase. To purchase an available phone number, the number should be submitted via POST to the /IncomingPhoneNumbers endpoint.

```
USAGE
  $ freeclimb available-numbers:list

OPTIONS
  -C, --country=country          Filters numbers by two character ISO country code.
  -E, --smsEnabled=true|false    Filters numbers based on SMS capability.
  -a, --alias=alias              Filter on numbers based on the formatted string of the phone number.
  -h, --help                     show CLI help
  -n, --next                     Displays the next page of output.
  -o, --voiceEnabled=true|false  Filters numbers based on voice capability.

  -p, --phoneNumber=phoneNumber  PCRE-compatible regular expression to filter against phoneNumber field, which is in
                                 E.164 format.

  -r, --region=region            Filters numbers by two letter state abbreviation. This flag is only available for US
                                 numbers.
```

_See code: [src/commands/available-numbers/list.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.5.0/src/commands/available-numbers/list.ts)_
