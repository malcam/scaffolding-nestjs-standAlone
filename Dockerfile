FROM node:16.13 AS builder

WORKDIR /usr/src

COPY ["package.json", "yarn.lock", "./"]
COPY .npmrc .

RUN yarn install

COPY . .

RUN yarn run build
RUN yarn install --production=true

FROM node:16.13-alpine

WORKDIR /usr/app

COPY --from=builder ["/usr/src/dist/", "./"]
COPY --from=builder /usr/src/node_modules node_modules
COPY --from=builder /usr/src/.env .env

CMD ["node", "/usr/app/src/main"]
