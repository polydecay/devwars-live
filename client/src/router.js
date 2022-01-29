import { createRouter, createWebHistory } from 'vue-router';
import store from './store';

const MainPage = () => import('./pages/MainPage/index.vue');
const PlayPage = () => import('./pages/PlayPage/index.vue');
const AdminPage = () => import('./pages/AdminPage/index.vue');
// TODO Move these in to modals instead.
const AdminEditorPage = () => import('./pages/AdminPage/AdminEditorPage.vue');
const AdminObjectivesPage = () => import('./pages/AdminPage/AdminObjectivesPage.vue');

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
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
            window.location.href = 'https://www.devwars.tv/login';
            return;
        }
    }

    document.title = to.meta.title ?? 'DevWars Live';

    next();
});

export default router;
