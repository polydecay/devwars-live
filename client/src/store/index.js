import Vue from 'vue';
import Vuex from 'vuex';
import app from './app';
import game from './game';
import admin from './admin';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        app,
        game,
        admin,
    },
});
