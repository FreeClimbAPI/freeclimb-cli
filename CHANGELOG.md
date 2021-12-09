# FreeClimb CLI Changelog

All notable changes to this project will be documented in this file.

The format of this changelog is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<a name="0.4.0"></a>

## [0.4.0] - 2021-04-07

### Added

-   query params to incoming numbers
-   query params to available numbers
-   query params to calls list numbers

## [0.3.0] - 2021-04-07

### Added

-   callConnectUrl flag to command calls:make

### Changed

-   Descriptions of commands as well as flags and arguments

### Fixed

-   Incorrect instances of --next
-   Incorrect instances of --acountId as query parameters

<a name="0.2.2"></a>

## [0.2.2] - 2021-04-14

### Changed

-   Deployments are now built on MacOS instead of Ubuntu

### Fixed

-   Homebrew no suitable image error when running any command that required keytar

<a name="0.2.1"></a>

## [0.2.1] - 2021-04-07

### Fixed

-   AWS and Git bugs preventing deployment to Homebrew

<a name="0.2.0"></a>

## [0.2.0] - 2021-04-06

### Added

-   Color to the CLI
-   Quotes around responses so that trailing spaces can be seen by the user
-   Automated deployment scripts

### Changed

-   Now using GitHub Actions instead of Travis CI

### Fixed

-   Bug where if tsbuildinfo was present, then JS code would not get generated for NPM releases
-   Uncaught error from SMS responses
-   Typo in spelling of test outline

<a name="0.1.2"></a>

## [0.1.2] - 2020-12-04

### Fixed

-   Incorrect license link
-   TypeScript not being emitted

<a name="0.1.0"></a>

## [0.1.0] - 2020-11-18

### Added

-   Add initial CLI code
-   Add [README.md](https://github.com/FreeClimbAPI/freeclimb-cli) and LICENSE to github
-   [CLI Quickstart Documentation](https://docs.freeclimb.com/docs/freeclimb-cli-quickstart)
