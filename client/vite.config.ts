import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import copy from 'rollup-plugin-copy';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    return {
        plugins: [
            vue(),
            copy({
                hook: 'buildStart',
                copyOnce: true,
                targets: [
                    { src: 'node_modules/monaco-editor/min/vs', dest: 'public/monaco' },
                ],
            }),
        ],
        resolve: {
            alias: [
                { find: '@', replacement: '/src' },
            ],
        },
        server: {
            proxy: {
                '/api': { target: env.VITE_LIVE_API_URL },
                '/socket.io': { target: env.VITE_LIVE_API_URL, ws: true },
            },
        },
        build: {
            target: [
                'chrome86',
                'firefox86',
                'safari13.1',
            ],
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return 'vendor';
                        } else if (id.includes('/pages/MainPage/')) {
                            return 'main';
                        } else if (id.includes('/pages/PlayPage/')) {
                            return 'play';
                        } else if (id.includes('/pages/AdminPage/')) {
                            return 'admin';
                        }
                    },
                },
            },
        },
    };
});
