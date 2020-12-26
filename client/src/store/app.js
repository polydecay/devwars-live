const state = {
    init: false,
    user: null,
    socketId: null,
}

const getters = {
    isConnected(state) {
        return state.socketId !== null;
    },
};

const mutations = {
    WS_CONNECT(state, client) {
        state.socketId = client.id;
    },

    WS_INIT(state, user) {
        state.init = true;
        state.user = user;
    },

    WS_DISCONNECT(state) {
        state.socketId = null;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
};
