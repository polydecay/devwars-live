import Vue from 'vue';
import cloneDeep from 'lodash/cloneDeep';

function merge(source, target) {
    Object.entries(target).forEach(([key, value]) => {
        if (source[key] !== value) Vue.set(source, key, value);
    });
}

const initialState = {
    applications: [],
};

const state = cloneDeep(initialState);

const getters = {};

const mutations = {
    SET_STATE(state, admin) {
        if (!admin) {
            return merge(state, initialState);
        }

        merge(state, admin);
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
