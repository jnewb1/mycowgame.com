FROM node:14-buster

RUN apt update && apt install git

ENV CHOKIDAR_USEPOLLING=true

ENV REACT_APP_API_SERVER="http://192.168.0.32:8000/api/v1/"