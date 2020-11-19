`freeclimb available-numbers`
=============================

Available Numbers are FreeClimb phone numbers available for purchase. The properties of the Available Phone Numbers resource provides a means to search for phone numbers that are available to buy. You use pattern matching to search for phone numbers that match your needs. When an available number is identified for purchase, make an HTTP POST request to the IncomingPhoneNumbers endpoint using the number as the phoneNumber parameter. The list of Available Phone Number resources is accessible to all accounts.

* [`freeclimb available-numbers:list`](#freeclimb-available-numberslist)

## `freeclimb available-numbers:list`

Search for phone numbers that are available for purchase. To purchase an available phone number, the number should be submitted via POST to the /IncomingPhoneNumbers endpoint.

```
USAGE
  $ freeclimb available-numbers:list

OPTIONS
  -a, --alias=alias              Filter on numbers based on the formatted string of the phone number.
  -h, --help                     show CLI help
  -n, --next                     Displays the next page of output.

  -p, --phoneNumber=phoneNumber  PCRE-compatible regular expression to filter against phoneNumber field, which is in
                                 E.164 format.
```

_See code: [src/commands/available-numbers/list.ts](https://github.com/Documents/freeclimb-cli/blob/v0.0.0/src/commands/available-numbers/list.ts)_
