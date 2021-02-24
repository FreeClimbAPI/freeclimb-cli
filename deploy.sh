#!/bin/bash

# Initialization
if [[ "$UPDATE_TYPE" == "major" || "$UPDATE_TYPE" == "minor" || "$UPDATE_TYPE" == "patch"]]; then
    if [[ -z "$AWS_ACCESS_KEY_ID" || -z "$AWS_SECRET_ACCESS_KEY" ]]; then
        echo "Missing AWS credentials. No deployments will be made."
        exit 1
    else
        if [[ -z "$GITHUB_AUTH_TOKEN" ]]; then
            echo "Missing GitHub credentials. No deployments will be made."
            exit 2
        else
            if [[ -z "$NPM_AUTH_TOKEN" ]]; then
                echo "Missing NPM credentials. No deployments will be made."
                exit 3
            fi
        fi
    fi
else
    echo "Missing a valid update type. No deployments will be made."
    exit 4
fi

# Push package to NPM
echo "//registry.npmjs.org/:_authToken $NPM_AUTH_TOKEN" > ~/.npmrc
echo "Logged in to npm as $(npm whoami)"
npm version $UPDATE_TYPE
npm publish

# Push tarball to AWS (for Homebrew)
yarn oclif-dev pack