`freeclimb accounts`
====================

You get a FreeClimb Account at signup. This includes an account ID and an API key. These two properties enable you to connect and communicate with FreeClimb.

* [`freeclimb accounts:get`](#freeclimb-accountsget)
* [`freeclimb accounts:manage`](#freeclimb-accountsmanage)

## `freeclimb accounts:get`

Retrieve a representation of the specified Account.

```
USAGE
  $ freeclimb accounts:get

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/accounts/get.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.5.4/src/commands/accounts/get.ts)_

## `freeclimb accounts:manage`

This command allows you to manage an account.

```
USAGE
  $ freeclimb accounts:manage

OPTIONS
  -a, --alias=alias  Description for this account.
  -h, --help         show CLI help
  -l, --label=label  Group to which this account belongs.
```

_See code: [src/commands/accounts/manage.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.5.4/src/commands/accounts/manage.ts)_
