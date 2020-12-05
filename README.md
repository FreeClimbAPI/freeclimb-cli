# FreeClimb CLI
[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io) [![Version](https://img.shields.io/npm/v/freeclimb-cli.svg)](https://npmjs.org/package/freeclimb-cli) [![Downloads/week](https://img.shields.io/npm/dw/freeclimb-cli.svg)](https://npmjs.org/package/freeclimb-cli) [![License](https://img.shields.io/npm/l/freeclimb-cli.svg)](https://github.com/FreeClimbAPI/freeclimb-cli/blob/master/package.json)

Install FreeClimb's CLI to start managing apps, buying numbers, and testing applications from your command line.

Read the complete [FreeClimb CLI Quickstart documentation](https://docs.freeclimb.com/docs/freeclimb-cli-quickstart) for detailed install instructions, how to start using the CLI, and example use cases.

[Learn more about FreeClimb](https://www.freeclimb.com/), a voice and SMS API built for developers.

## Requirements
A [FreeClimb account](https://freeclimb.com/dashboard/)

[Node.js](https://nodejs.org/en/download/) version 12.9.0 or higher

Linux users may require further prerequisites. See details about this in the [documentation](https://docs.freeclimb.com/docs/freeclimb-cli-quickstart#linux).

## Install 
From npm
```sh
npm install -g freeclimb-cli
```
Linux users may require further prerequisites. See details about this in the [documentation](https://docs.freeclimb.com/docs/freeclimb-cli-quickstart#linux).

## Usage
To begin using the FreeClimb CLI:
```sh
$ freeclimb login
```
To see a list of topics, commands, and accompanying explanations:
```sh
$ freeclimb help
```
To explore commands organized under each topic:
```sh
$ freeclimb [TOPIC]
```
To run commands:
```sh
$ freeclimb [COMMAND]
```
Many commands require arguments and also include option flags. To see arguments and option flags for each command, as well as explanations:
```sh
$ freeclimb [COMMAND] --help
```
Review [Explore FreeClimb's CLI](https://docs.freeclimb.com/docs/freeclimb-cli-quickstart#explore-freeclimbs-cli) for more detailed information about usage.

## Command Topics
* [`freeclimb accounts`](docs/accounts.md) - Manage FreeClimb account information
* [`freeclimb applications`](docs/applications.md) - Manage your account's FreeClimb applications
* [`freeclimb autocomplete`](docs/autocomplete.md) - Autocomplete installation instructions
* [`freeclimb available-numbers`](docs/available-numbers.md) - See FreeClimb numbers available for purchase
* [`freeclimb call-queues`](docs/call-queues.md) - Manage call queues
* [`freeclimb calls`](docs/calls.md) - See past calls and make new calls
* [`freeclimb conference-participants`](docs/conference-participants.md) - Manage and remove conference participants
* [`freeclimb conferences`](docs/conferences.md) - Create and manage conference calls
* [`freeclimb data`](docs/data.md) - Find your data directory
* [`freeclimb help`](docs/help.md) - Display help information, including a list of topics, commands, and accompanying explanations
* [`freeclimb incoming-numbers`](docs/incoming-numbers.md) - Manage your purchased FreeClimb numbers
* [`freeclimb login`](docs/login.md) - Log in to FreeClimb with your Account ID and Auth Key
* [`freeclimb logout`](docs/logout.md) - Log out and remove your saved FreeClimb Account ID and Auth Token from your computer's keychain
* [`freeclimb logs`](docs/logs.md) - Search and filter logs
* [`freeclimb queue-members`](docs/queue-members.md) - Manage and remove queue members
* [`freeclimb recordings`](docs/recordings.md) - Find, download, stream, and manage recordings
* [`freeclimb sms`](docs/sms.md) - See past messages and send new messages

## Examples
Review [Other Use Cases](https://docs.freeclimb.com/docs/freeclimb-cli-quickstart#other-use-cases)

## Troubleshooting
Newer versions of Node may give an invalid header value error when using the CLI. To resolve this issue: 
 1. Use Node version 12.9.0
 2. Add NODE_OPTIONS as a persistent environment variable by running the following command:
 ```
 $ echo export NODE_OPTIONS=--http-parser=legacy >> ~/.bash_profile
 $ source ~/.bash_profile
 ```
Possible resolutions for "TypeError: cannot read property of undefined":
 1. Make sure to add NODE_OPTIONS as a persistent environment variable as explained in the section above
 2. CLI does not have correct write permissions to the OCLIF configuration directory (information about the data directory is [here](https://oclif.io/docs/config))

## Contributing
1. Clone this repo
2. From the repository root directory, run: 
```
 $ npm install -g freeclimb-cli
 $ yarn install
```
3. Run ./bin/run from the repository root directory to run the CLI

## Feedback & Issues
The FreeClimb CLI is currently in a beta release phase. We are actively working to improve it for all your FreeClimb-related needs. If you would like to give the team feedback or you encounter a problem, please [contact support](https://www.freeclimb.com/support/) or [submit a ticket](https://freeclimb.com/dashboard/portal/support) in the dashboard.
