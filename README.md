<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Aptuno backend coding test.

## Installation

```bash
$ yarn install
```

## Running the app with docker compose
```bash
# Must have to wait 20 seconds for the migrations to run
$ docker-compose --env-file .env -f docker-compose.yml up -d --build
```

## Urls
```bash
# localhost:8882/regions
$ curl --location --request POST 'localhost:8882/regions' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "Cancun",
  "boundingBox": {
    "bottomLeft" : {
      "longitude" :-89.29656183,
      "latitude" : 17.89398542
    },
    "upperRight" : {
      "longitude" : -86.71061093,
      "latitude" : 21.60550404
    }
  }
}'
```
 
```bash
# localhost:8882/regions/{id}
$ curl --location --request PUT 'localhost:8882/regions/39' \
--header 'Content-Type: application/json' \
--data-raw '{
  "id": 39,
  "name": "Chapinero 2",
  "boundingBox": {
    "bottomLeft" : {
      "longitude" : 74.069225,
      "latitude" : 5.621519
    },
    "upperRight" : {
      "longitude" : -74.024078,
      "latitude" : 4.681916
    }
  }
}'
```

```bash
# localhost:8882/properties
$ curl --location --request POST 'localhost:8882/properties' \
--header 'Content-Type: application/json' \
--data-raw '{
  "title": "Apartamento soportado",
  "location": {
    "longitude": -86.97121226,
    "latitude": 21.02976327
  },
  "pricing": {
    "rentalPrice": 2000000
  },
  "bedrooms": 3,
  "bathrooms": 2,
  "area": 60
}'
```
## Environments

```bash
# Application
APP_NAME=Application
HOST=localhost
PORT=3000
EVENT_LISTENER=8882

# Database
MAIN_DB_TYPE=mysql
MAIN_DB_HOST=coding-test-db
MAIN_DB_PORT=3306
MAIN_DB_USERNAME=root
MAIN_DB_PASSWORD=mauFJcuf5dhRMQrjj
MAIN_DB_NAME=db_test
MAIN_DB_RUN_MIGRATIONS=0
MAIN_DB_SYNC=0
MAIN_DB_LOGGING=0
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
