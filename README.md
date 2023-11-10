# React, node, mongo demo

This repo contains a simple demo for a url shortening application utilising MongoDB, Node.js and React.

## Getting started

This application is run using [Docker compose](https://docs.docker.com/compose/) so you will need to install [Docker](https://docs.docker.com/engine/install/) before you can run the application. 

* `cat .env > .env.sample` - copy `.env.sample` to `.env` in the api and app folders.
* `docker-compose up` - go back to the root folder and run docker-compose.

## Testing

To run the integration tests on the API make sure that the docker-compose is running and run `npm run test:integration`. To run the unit tests for the webapp just run `npm run test`.

Unfortunately we are missing a lot of unit tests due to some time restrictions.