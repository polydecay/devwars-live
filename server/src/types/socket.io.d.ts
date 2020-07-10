// Extend SocketIO client to allow us to add a user to it.
declare namespace SocketIO {
    export interface Client {
        // What's going on with the import? https://stackoverflow.com/a/51114250
        user?: import('../modules/devwars/devwars.service').User;
    }
}
