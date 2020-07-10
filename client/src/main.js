import 'core-js';
import Vue from 'vue';
import VueAwn from 'vue-awesome-notifications';
import App from './App';
import store from './store';
import router from './router';
import socket from './services/socket';
import 'vue-awesome-notifications/dist/styles/style.css';

Vue.config.productionTip = false;

Vue.use(VueAwn);
Vue.use(socket);

document.getElementById('loading')?.remove();

window.app = new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
});
