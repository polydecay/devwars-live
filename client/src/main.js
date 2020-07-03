import 'core-js';
import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import ws from './services/ws';

Vue.config.productionTip = false;

Vue.prototype.$ws = ws;

window.app = new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
});
