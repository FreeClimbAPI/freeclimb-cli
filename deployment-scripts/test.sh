#!/bin/bash

sudo apt-get update
sudo apt-get install -y xvfb gnome-keyring libsecret-1-dev xorg dbus dbus-x11

export $(dbus-launch)
echo "" | gnome-keyring-daemon --unlock
/usr/bin/gnome-keyring-daemon --components=secrets,pkcs11,ssh --start --daemonize
export $(echo "" | /usr/bin/gnome-keyring-daemon -r -d --unlock)
export SHELL
yarn install --frozen-lockfile --production=false
yarn test