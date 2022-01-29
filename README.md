# DevWars Live
The editor and live streaming portion of DevWars.

## Getting Started

### Requirements
* [NodeJS v14.15+](https://nodejs.org)

### Setup
*This repository holds two projects (client/server). For this reason you should never use npm in the root directory. Instead manage dependencies and npm script independently inside of each respective directory (client/server).*

* Run `npm install` in both the client and server directory to install dependencies.
* Make a copy of `.env.example` in both the client and server directory and configure your environment variables to your liking.
* Run `npm run dev` in both the client and server directory.

### Mocking DevWars API in Development
* Remove the `DEVWARS_API_TOKEN` environment key on the server side.

You can then set a cookie in your browser with the key `token` and one of the following values `ADMIN`, `MODERATOR`, `USER` to authenticate.

## Production
* Run `npm run build` in both the client and server directory.
* Configure your web server to serve the `client/dist` directory.
* Reroute `/admin` and `/play` to `client/dist/index.html` to handle SPA routes.
* Run `node server/dist/index.js` and preferably proxy it through a web server.

__NOTE:__ The server does not use the `.env` in production!
