FROM node:14-slim

RUN apt-get update -qq && apt-get install -y vim git && apt-get clean

RUN mkdir -p /home/node/app
ENV WORK_DIR=/home/node/app

WORKDIR $WORK_DIR

EXPOSE 3000
