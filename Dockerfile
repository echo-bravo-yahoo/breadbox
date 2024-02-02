# syntax=docker/dockerfile:1
FROM node:20-alpine

ENV breadboxPath=""

COPY ./app /recipes/app
COPY ./server /recipes/server
RUN mkdir -p /recipes/fs

RUN npm install -g nodemon

WORKDIR /recipes/app
RUN rm -rf /dist && npm install --include dev && npm run build

WORKDIR /recipes/server
RUN npm install

# this is a little bit of a lie -
# the container should have one port or the other exposed, not both
EXPOSE 3000/tcp
EXPOSE 5173/tcp

WORKDIR /recipes
CMD nodemon $SCRIPT_PATH
