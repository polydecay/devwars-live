# DevWars Live
The editor and live streaming portion of DevWars.

## Getting Started

### Requirements
* [NodeJS v14.15+](https://nodejs.org)

### Setup
*This repository holds two projects (client/server). For this reason you should never use npm in the root directory. Instead manage dependencies and npm script independently inside of each respective directory (client/server).*

* Run `npm install` in both the client and server directory to install dependencies.
* Make a copy of `.env.example` in both the client and server directroy and configure your environment variables to your liking.
* Run `npm run dev` in both the client and server directory.

### Mocking DevWars API in Development
* Remove the `DEVWARS_API_TOKEN` environment key on the server side.

You can then set a cookie in your browser with the key `token` and one of the following values `ADMIN`, `MODERATOR`, `USER` to authenticate.

## Production
* Run `npm run build` in both the client and server directory.
* Configure your favorite web server to serve the `client/dist` directory.
* Run `npm run start` in the server directory, and preferably proxy it through your web server.
