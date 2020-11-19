#!/bin/bash
cd ..
docker build --tag freeclimbclipipeline .
docker run -u 0:0 --cap-add=IPC_LOCK freeclimbclipipeline /bin/bash -c 'export $(dbus-launch); echo "" | gnome-keyring-daemon --unlock; /usr/bin/gnome-keyring-daemon --components=secrets,pkcs11,ssh --start --daemonize; export $(echo "" | /usr/bin/gnome-keyring-daemon -r -d --unlock) && export SHELL && cd /freeclimb-cli && yarn test'