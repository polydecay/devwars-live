import Vue from 'vue';
import Router from 'vue-router';
import store from "./store";

const MainPage = () => import(/* webpackChunkName: "main" */ './pages/MainPage');
const PlayPage = () => import(/* webpackChunkName: "play" */ './pages/PlayPage');
const AdminPage = () => import(/* webpackChunkName: "admin" */ './pages/AdminPage');
const AdminEditorPage = () => import(/* webpackChunkName: "admin-editor" */ './pages/AdminEditorPage');

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        { path: '/', name: 'Home', component: MainPage },
        { path: '/play', name: 'Play', component: PlayPage, meta: { requireAuth: true } },
        { path: '/admin', name: 'Admin', component: AdminPage, meta: { requireAuth: true } },
        { path: '/admin/editors/:id', name: 'AdminEditor', component: AdminEditorPage, meta: { requireAuth: true }, props: true },
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

    next();
});

export default router;
