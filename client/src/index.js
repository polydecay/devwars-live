import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import awn from './services/awn';
import socket from './services/socket';
import VIcon from './components/common/VIcon';

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
