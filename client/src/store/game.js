import Vue from 'vue';

function merge(source, target) {
    Object.entries(target).forEach(([key, value]) => {
        if (source[key] !== value) Vue.set(source, key, value);
    });
}

const initialState = Object.freeze({
    id: null,
    mode: '',
    title: '',

    stage: '',
    stageEndsAt: null,

    runtime: 0,
    objectives: [],

    teams: [],
    editors: [],
    players: [],

    applications: [],
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

        merge(state, game);
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
