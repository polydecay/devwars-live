import Vue from 'vue';
import merge from 'lodash/merge';

function mergeMap(source, target) {
    Object.keys(source).forEach((key) => {
        if (!target[key]) {
            return Vue.delete(source, key);
        }

        if (typeof source[key] === 'object') {
            return Vue.set(source, key, target[key]);
        }

        Object.assign(source, target);
    });

    Object.keys(target).forEach((key) => {
        if (!source[key]) Vue.set(source, key, target[key]);
    });
}

const initialState = Object.freeze({
    id: null,
    mode: '',
    title: '',

    startAt: 0,
    endAt: 0,

    stage: '',
    stageStartAt: 0,
    stageEndAt: 0,

    objectives: [],
    teams: [],
    editors: [],
    players: [],
});

const state = merge({}, initialState);

const getters = {
    isActive(state) {
        return state.id !== null;
    },

    teamById(state) {
        return (id) => state.teams.find(x => x.id === id);
    },

    editorById(state) {
        return (id) => state.editors.find(x => x.id === id);
    },

    playerById(state) {
        return (id) => state.players.find(x => x.id === id);
    },

    editorsByTeam(state){
        return (id) => state.editors
            .filter(e => e.teamId === id)
            .sort((a, b) => a.id - b.id);
    },
};

const mutations = {
    SET_STATE(state, game) {
        if (!game) {
            return merge(state, initialState);
        }

        const { objectives, teams, editors, players, ...gameState } = game;
        merge(state, gameState);
        mergeMap(state.objectives, objectives);
        mergeMap(state.teams, teams);
        mergeMap(state.editors, editors);
        mergeMap(state.players, players);
    },
};

const actions = {};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
