`freeclimb logs`
================

A Log instance resource represents a log entry made by FreeClimb in the course of processing a PerCL script or servicing a REST API request. It is mostly useful for debugging purposes. The Logs list resource represents the set of logs generated for an account.

* [`freeclimb logs:filter PQL`](#freeclimb-logsfilter-pql)
* [`freeclimb logs:list`](#freeclimb-logslist)

## `freeclimb logs:filter PQL`

Returns the first page of Logs associated with the specified account.

```
USAGE
  $ freeclimb logs:filter PQL

ARGUMENTS
  PQL  The filter query for retrieving logs.

OPTIONS
  -Q, --since=since      Determines time frame of logs to be printed out before starting tail. Ex.2h9m
  -h, --help             show CLI help
  -m, --maxItem=maxItem  Show only a certain number of the most recent logs on this page.
  -n, --next             Displays the next page of output.
  -q, --sleep=sleep      [default: 1000] Determines time waited between request for tail command. Defaults at 1 second.
  -t, --tail             Polls the FreeClimb API to retrieve and display new logs as they occur.
```

_See code: [src/commands/logs/filter.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.2.2/src/commands/logs/filter.ts)_

## `freeclimb logs:list`

Returns all Logs associated with the specified account or a specific page of Logs as indicated by the URI in the request.

```
USAGE
  $ freeclimb logs:list

OPTIONS
  -Q, --since=since      Determines time frame of logs to be printed out before starting tail. Ex.2h9m
  -h, --help             show CLI help
  -m, --maxItem=maxItem  Show only a certain number of the most recent logs on this page.
  -n, --next             Displays the next page of output.
  -q, --sleep=sleep      [default: 1000] Determines time waited between request for tail command. Defaults at 1 second.
  -t, --tail             Polls the FreeClimb API to retrieve and display new logs as they occur.
```

_See code: [src/commands/logs/list.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.2.2/src/commands/logs/list.ts)_
