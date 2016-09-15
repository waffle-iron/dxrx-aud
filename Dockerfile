# Dockerfile
FROM quay.io/aptible/nodejs:v0.10.x

# Install Meteor
RUN apt-install curl procps
RUN curl https://install.meteor.com/ | sh

# Install `meteor build` dependencies
RUN apt-install python build-essential

ADD . /app
WORKDIR /app/webapp


RUN meteor --version
RUN npm --version

# we copy dependencies to local filestystem
RUN meteor npm install --save jquery bootstrap react react-dom react-router react-bootstrap react-komposer react-router-bootstrap faker jquery-validation react-addons-css-transition-group react-addons-pure-render-mixin react-toolbox react-mixin faker react-highcharts eslint-plugin-react eslint-plugin-meteor eslint-config-eslint react-scroll-box material-ui normalize.css react-tap-event-plugin immutability-helper classnames eslint sprintf-js

# we install local dependencies into build pre-code
RUN meteor npm install

# we build the Node app
RUN meteor build --release METEOR@1.3.4.1 --directory .

WORKDIR /app/webapp/bundle/programs/server

# we install the Node app
RUN npm install

ENV PORT 3000
EXPOSE 3000
