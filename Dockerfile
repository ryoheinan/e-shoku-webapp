FROM node:14-slim

RUN apt-get update -qq && apt-get install -y vim git && apt-get clean

ENV WORK_DIR=/workspace

WORKDIR $WORK_DIR

RUN yarn global add gatsby-cli
COPY package.json $WORK_DIR
RUN yarn install

EXPOSE 3000
