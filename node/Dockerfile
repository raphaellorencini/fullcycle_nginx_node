#FROM node:15
FROM node:16.8.0-alpine3.13

RUN apk add --no-cache openssl bash wget

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

WORKDIR /usr/src/app
COPY . .
RUN npm install

EXPOSE 3000

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["node","index.js"]