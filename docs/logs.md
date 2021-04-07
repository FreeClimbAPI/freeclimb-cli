`freeclimb logs`
================

A Log instance resource represents a log entry made by FreeClimb in the course of processing a PerCL script or servicing a REST API request. It is mostly useful for debugging purposes. The Logs list resource represents the set of logs generated for an account. For convenience, a Logs list resource is also available as a subresource of a Call instance resource, since most logging occurs during call processing. The Log instance resource is unusual in that it exists but is not directly addressable. It also does not have a resource ID.

* [`freeclimb logs:filter PQL`](#freeclimb-logsfilter-pql)
* [`freeclimb logs:list`](#freeclimb-logslist)

## `freeclimb logs:filter PQL`

Returns the first page of Logs associated with the specified account. The Performance Query Language, or PQL, is a simple query language that uses key-comparator-value triplets joined by boolean operators to build queries capable of searching through logs. PQL is inspired heavily by the syntax of SQL's WHERE clauses. The Dot Operator (.) can be used to search for nested key / value pairs. In the example above, metadata.test is used to access the value of the nested test key under metadata. PQL supports the following comparator operators: =, !=, <, <=, >, >=, as well as the use of () to indicate the order in which parts are evaluated.

```
USAGE
  $ freeclimb logs:filter PQL

ARGUMENTS
  PQL  The filter query for retrieving logs. See Performance Query Language below.

OPTIONS
  -h, --help             show CLI help
  -m, --maxItem=maxItem  Show only a certain number of the most recent logs on this page.
  -n, --next             Displays the next page of output.
```

_See code: [src/commands/logs/filter.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.2.1/src/commands/logs/filter.ts)_

## `freeclimb logs:list`

Returns all Logs associated with the specified account or a specific page of Logs as indicated by the URI in the request. Note: A PQL query should not be included with this GET request.

```
USAGE
  $ freeclimb logs:list

OPTIONS
  -h, --help             show CLI help
  -m, --maxItem=maxItem  Show only a certain number of the most recent logs on this page.
  -n, --next             Displays the next page of output.
```

_See code: [src/commands/logs/list.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.2.1/src/commands/logs/list.ts)_
