import Vue from 'vue';
import merge from 'lodash/merge';

function mergeMap(source, target) {
    Object.keys(source).forEach((key) => {
        if (!target[key]) Vue.delete(source, key);
        else Object.assign(source, target);
        // else merge(source, target);
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

    objectives: Object.freeze({}),
    teams: Object.freeze({}),
    editors: Object.freeze({}),
    players: Object.freeze({}),
});

const state = merge({}, initialState);

const getters = {
    gameActive(state) {
        return state.id !== null;
    },

    getEditorsByTeam(state){
        return (id) => {
            return Object.values(state.editors).filter(e => e.team === id);
        };
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
