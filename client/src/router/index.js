import Vue from 'vue';
import Router from 'vue-router';

const AdminPage = () => import(/* webpackChunkName: "admin" */ '../views/AdminPage');
const MainPage = () => import(/* webpackChunkName: "main" */ '../views/MainPage');
const PlayPage = () => import(/* webpackChunkName: "play" */ '../views/PlayPage');

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        { path: '/', name: 'Home', component: MainPage },
        { path: '/play', name: 'Play', component: PlayPage },
        { path: '/admin', name: 'Admin', component: AdminPage },
    ],
});

export default router;
