FROM ubuntu
ENV DEBIAN_FRONTEND=noninteractive
# install keytar and nvm dependencies
RUN apt-get update -y
RUN apt-get install -y gnome-keyring xvfb xorg dbus dbus-x11
RUN apt-get install -y git curl libsecret-1-dev

WORKDIR /root
RUN git clone https://github.com/nvm-sh/nvm.git .nvm
WORKDIR .nvm
RUN git checkout v0.35.3
RUN /bin/bash -c ". nvm.sh"
RUN echo '\nexport NVM_DIR="$HOME/.nvm"\n[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm\n[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion' >> ~/.bashrc
RUN /bin/bash -c "source ~/.bashrc"
RUN /bin/bash -c ". nvm.sh && nvm install 12.9.0"
RUN /bin/bash -c ". nvm.sh && nvm use 12.9.0"

RUN /bin/bash -c ". nvm.sh && npm i -g freeclimb-cli --unsafe-perm"
RUN echo 'export $(dbus-launch); echo "" | gnome-keyring-daemon --unlock; /usr/bin/gnome-keyring-daemon --components=secrets,pkcs11,ssh --start --daemonize; export $(echo "" | /usr/bin/gnome-keyring-daemon -r -d --unlock)' >> ~/.bashrc
RUN mkdir -p ~/.local/share/keyrings
