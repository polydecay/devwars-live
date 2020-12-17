import Vue from 'vue';
import VueAwn from 'vue-awesome-notifications';
import App from './App';
import store from './store';
import router from './router';
import socket from './services/socket';

Vue.config.productionTip = false;

Vue.use(VueAwn, {
    animationDuration: 150,
    durations: { global: 5000 },
    icons: { enabled: false },
    labels: {
        confirm: 'Confirmation',
        confirmOk: 'Confirm',
    },
});

Vue.use(socket);

window.app = new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
});
