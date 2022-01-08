import { createApp } from 'vue';
import store from './store';
import router from './router';
import awn from './services/awn';
import socket from './services/socket';
import App from './App.vue';
import VIcon from './components/common/VIcon.vue';

createApp(App)
    .use(router)
    .use(store)
    .use(awn)
    .use(socket)
    .component('VIcon', VIcon)
    .mount('#app');
