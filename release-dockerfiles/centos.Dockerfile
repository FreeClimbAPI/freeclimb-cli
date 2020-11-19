FROM shipyard-dev.vail/prosodica/node:12.9.0

RUN yum install libsecret-devel gnome-keyring xorg-x11-server-Xvfb dbus dbus-x11 -y
RUN /bin/bash -c "npm i -g freeclimb-cli --unsafe-perm"
RUN /bin/bash -c "dbus-uuidgen > /var/lib/dbus/machine-id"
RUN echo 'export $(dbus-launch); echo "" | gnome-keyring-daemon --unlock; /usr/bin/gnome-keyring-daemon --components=secrets,pkcs11,ssh --start --daemonize; export $(echo "" | /usr/bin/gnome-keyring-daemon -r -d --unlock)' >> ~/.bashrc
RUN mkdir -p ~/.local/share/keyrings
RUN mkdir -p ~/.cache