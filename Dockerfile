# syntax=docker/dockerfile:1

FROM node:20-alpine

COPY ./app /recipes/app
COPY ./server /recipes/server
RUN mkdir -p /recipes/fs

RUN npm install -g nodemon

WORKDIR /recipes/app
RUN rm -rf /dist && npm install --include dev && npm run build

WORKDIR /recipes/server
RUN npm install

EXPOSE 3000

CMD nodemon /recipes/server/server.js
