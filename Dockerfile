FROM node:14-buster

RUN apt update && apt install git

ENV CHOKIDAR_USEPOLLING=true
