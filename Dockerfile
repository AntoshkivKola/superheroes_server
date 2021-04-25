FROM node:14.16.1-alpine3.10

RUN mkdir /server

WORKDIR /server

COPY ./ ./

RUN npm i

EXPOSE 3000

CMD ./start.sh
