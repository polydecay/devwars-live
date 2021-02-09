import Vue from 'vue';
import Router from 'vue-router';
import store from "./store";

const MainPage = () => import(/* webpackChunkName: "main" */ './pages/MainPage');
const PlayPage = () => import(/* webpackChunkName: "play" */ './pages/PlayPage');
const AdminPage = () => import(/* webpackChunkName: "admin" */ './pages/AdminPage');
// TODO Move these in to modals instead.
const AdminEditorPage = () => import(/* webpackChunkName: "admin" */ './pages/AdminEditorPage');
const AdminObjectivesPage = () => import(/* webpackChunkName: "admin" */ './pages/AdminObjectivesPage');

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: MainPage,
        },
        {
            path: '/play',
            name: 'Play',
            component: PlayPage,
            meta: { requireAuth: true, title: 'DevWars Live - Play' },
        },
        {
            path: '/admin',
            name: 'Admin',
            component: AdminPage,
            meta: { requireAuth: true, title: 'DevWars Live - Admin' },
        },
        {
            path: '/admin/editors/:id',
            name: 'AdminEditor',
            component: AdminEditorPage,
            props: true,
            meta: { requireAuth: true, title: 'DevWars Live - Admin Editor' },
        },
        {
            path: '/admin/objectives',
            name: 'AdminObjectives',
            component: AdminObjectivesPage,
            meta: { requireAuth: true, title: 'DevWars Live - Admin Objectives' },
        },
    ],
});

router.beforeEach(async (to, from, next) => {
    if (to.meta.requireAuth) {
        // Wait for the socket to initialize.
        while (!store.state.app.init) {
            await new Promise(resolve => setTimeout(resolve, 50));
        }

        if (!store.state.app.user) {
            return window.location.href = 'https://www.devwars.tv/login';
        }
    }

    document.title = to.meta.title ?? 'DevWars Live';

    next();
});

export default router;
