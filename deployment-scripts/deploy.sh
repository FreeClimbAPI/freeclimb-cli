#!/bin/bash

# Initialization
if [[ -z "$AWS_REGION" ]]; then
    echo "ERROR: Missing AWS region. No deployments will be made."
    exit 1
fi
if [[ -z "$GITHUB_REPOSITORY_SLUG" ]]; then
    echo "ERROR: Missing GitHub repository slug, e.g. octocat/hello-world. No deployments will be made."
    exit 2
fi
if [[ -z "$AWS_ACCESS_KEY_ID" || -z "$AWS_SECRET_ACCESS_KEY" ]]; then
    echo "ERROR: Missing AWS credentials. No deployments will be made."
    exit 3
fi
if [[ -z "$HOMEBREW_REPO_TOKEN" ]]; then
    echo "ERROR: Missing GitHub credentials for the Homebrew repository. No deployments will be made."
    exit 4
fi
if [[ -z "$NPM_AUTH_TOKEN" ]]; then
    echo "ERROR: Missing NPM credentials. No deployments will be made."
    exit 5
fi

# Get tag information
EXISTING_VERSION=$(node deployment-scripts/get-existing-version.js)
TARGET_VERSION=$(node deployment-scripts/get-target-version.js)

node deployment-scripts/compare-versions.js $EXISTING_VERSION $TARGET_VERSION
VERSION_RESULT=$?
if [[ $VERSION_RESULT -eq 3 ]]; then
    echo "WARNING: Version numbers did not indicate a newer release. No deployments will be made, but exiting with success."
    exit 0
elif [[ $VERSION_RESULT -ne 0 ]]; then
    echo "ERROR: Version numbers were not valid. No deployments will be made."
    exit 6
fi

# Begin deployment
echo "Starting deployment..."

# Git configuration
config() {
  git config --global user.email "41898282+github-actions[bot]@users.noreply.github.com" # official github-actions email. see https://github.community/t/github-actions-bot-email-address/17204/6
  git config --global user.name "github-actions"
}
config

# Push package to NPM
yarn install --frozen-lockfile --production=false
npm set registry "http://registry.npmjs.org"
npm set //registry.npmjs.org/:_authToken $NPM_AUTH_TOKEN
echo "Logged in to npm as $(npm whoami)"
npm version $TARGET_VERSION
npm publish

# Push tarball to AWS (for Homebrew)
yarn oclif-dev pack
yarn oclif-dev publish

git push --quiet --set-upstream origin main
git push --tags

# Update Homebrew deployment
NEW_SHA=$(shasum -a 256 "dist/freeclimb-v${TARGET_VERSION}/freeclimb-v${TARGET_VERSION}.tar.gz" | awk '{ print $1 }')
mkdir homebrew-repo
git clone https://${HOMEBREW_REPO_TOKEN}@github.com/${HOMEBREW_REPOSITORY_SLUG}.git homebrew-repo
cd homebrew-repo
sed -E -i "s/  sha256 \"[a-f0-9]*\"/  sha256 \"$NEW_SHA\"/g" Formula/freeclimb.rb
EXISTING_VERSION_PATTERN=$(echo $EXISTING_VERSION | sed "s/\./\\\./g") # prevents subtle change to shasum if it contained substr. of version number
sed -E -i "s/$EXISTING_VERSION_PATTERN/$TARGET_VERSION/g" Formula/freeclimb.rb
git add .
git commit -m "Update to version $TARGET_VERSION"
git push --quiet --set-upstream origin master