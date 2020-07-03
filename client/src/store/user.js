const state = {
    user: null,
    socketId: null,
}

const getters = {};

const mutations = {
    WS_CONNECT(state, client) {
        state.socketId = client.id;
        state.user = client.user ?? null;
    },

    WS_DISCONNECT(state) {
        state.socketId = null;
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
