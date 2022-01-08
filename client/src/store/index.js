import { createStore } from 'vuex';
import app from './app';
import game from './game';
import admin from './admin';

export default createStore({
    modules: {
        app,
        game,
        admin,
    },
});
