import Vue from 'vue';
import store from './store';
import router from './router';
import awn from './services/awn';
import socket from './services/socket';
import App from './App.vue';
import VIcon from './components/common/VIcon.vue';

Vue.config.productionTip = false;

Vue.component('VIcon', VIcon);

Vue.use(awn);
Vue.use(socket);

window.app = new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
});
