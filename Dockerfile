FROM shipyard-dev.vail/prosodica/node:12.9.0
LABEL MAINTAINER=web@freeclimb.com

ENV APP_PATH=/freeclimb-cli
ENV PATH=$PATH:./node_modules/.bin:$APP_PATH/node_modules/.bin

WORKDIR $APP_PATH

RUN yum install libsecret-devel gnome-keyring xorg-x11-server-Xvfb dbus dbus-x11 -y
RUN /bin/bash -c "dbus-uuidgen > /var/lib/dbus/machine-id"
RUN mkdir -p ~/.local/share/keyrings
RUN mkdir -p ~/.cache

# Only copy over artifacts necessary for installation. Guarantees that
# "yarn install" won't be invoked if no dependencies changed
COPY package.json yarn.lock .npmrc ./

# Run yarn installation.
RUN yarn install

# Copy all dependencies
COPY . ./

# Install command line application to be used
RUN yarn add global file:./
