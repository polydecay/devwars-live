import isEqual from 'lodash/isEqual';

const initialState = {
    applications: [],
};

const state = { ...initialState };

const mutations = {
    SET_STATE(state, admin) {
        admin = admin ?? initialState;
        for (const [key, value] of Object.entries(admin)) {
            if (!isEqual(state[key], value)) state[key] = value;
        }
    },
};

export default {
    namespaced: true,
    state,
    mutations,
};
