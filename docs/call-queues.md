`freeclimb call-queues`
=======================

Queues are the primary means of keeping callers waiting. A Queue is an object to hold callers until they can be provided the service they seek. Queues can be created ahead of time and are deleted automatically when they change state from populated to empty.

* [`freeclimb call-queues:create`](#freeclimb-call-queuescreate)
* [`freeclimb call-queues:get QUEUEID`](#freeclimb-call-queuesget-queueid)
* [`freeclimb call-queues:list`](#freeclimb-call-queueslist)
* [`freeclimb call-queues:update QUEUEID`](#freeclimb-call-queuesupdate-queueid)

## `freeclimb call-queues:create`

Create a Queue within the specified account.

```
USAGE
  $ freeclimb call-queues:create

OPTIONS
  -M, --maxSize=maxSize  Maximum number of Calls this queue can hold. Default is 1000. Maximum is 1000.
  -a, --alias=alias      A description for this Queue. Max length is 64 characters.
  -h, --help             show CLI help
```

_See code: [src/commands/call-queues/create.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.2.0/src/commands/call-queues/create.ts)_

## `freeclimb call-queues:get QUEUEID`

Retrieve a representation of the specified Queue.

```
USAGE
  $ freeclimb call-queues:get QUEUEID

ARGUMENTS
  QUEUEID  A string that uniquely identifies this queue resource.

OPTIONS
  -h, --help  show CLI help
  -n, --next  Displays the next page of output.
```

_See code: [src/commands/call-queues/get.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.2.0/src/commands/call-queues/get.ts)_

## `freeclimb call-queues:list`

Retrieve a list of active Queues associated with the specified account.

```
USAGE
  $ freeclimb call-queues:list

OPTIONS
  -a, --alias=alias  Return only the Queue resources with aliases that exactly match this name.
  -h, --help         show CLI help
  -n, --next         Displays the next page of output.
```

_See code: [src/commands/call-queues/list.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.2.0/src/commands/call-queues/list.ts)_

## `freeclimb call-queues:update QUEUEID`

Update the properties of the specified queue.

```
USAGE
  $ freeclimb call-queues:update QUEUEID

ARGUMENTS
  QUEUEID  A string that uniquely identifies this Queue resource.

OPTIONS
  -M, --maxSize=maxSize  Maximum number of calls this queue can hold. Default is 100. Maximum is 1000. Note: Reducing
                         the maxSize of a Queue causes the Queue to reject incoming requests until it shrinks below the
                         new value of maxSize.

  -a, --alias=alias      Description for this Queue. Max length is 64 characters.

  -h, --help             show CLI help
```

_See code: [src/commands/call-queues/update.ts](https://github.com/FreeClimbAPI/freeclimb-cli/blob/v0.2.0/src/commands/call-queues/update.ts)_
