const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
    devServer: {
        compress: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8000',
                ws: true,
            },
        },
    },
    configureWebpack: {
        devtool: '',
        plugins: [
            new MonacoWebpackPlugin({
                filename: 'js/monaco/[name].worker.js',
                languages: ['html', 'css', 'javascript', 'typescript'],
                features: [
                    'bracketMatching',
                    'caretOperations',
                    'clipboard',
                    'codeAction',
                    'comment',
                    'coreCommands',
                    'cursorUndo',
                    'find',
                    'folding',
                    'gotoSymbol',
                    'inPlaceReplace',
                    'multicursor',
                    'rename',
                    'smartSelect',
                    'suggest',
                    'wordOperations',
                    'wordPartOperations',
                ],
            }),
        ],
    },
    chainWebpack(config) {
        config.entry('app').clear().add('./src/index.js');

        config.plugin('html').tap((args) => {
            args[0].title = 'DevWars - Live';
            return args
        });

        const splitChunks = config.optimization.get('splitChunks');
        splitChunks.minSize = 30000;
        splitChunks.cacheGroups = {
            ...splitChunks.cacheGroups,
            monaco: {
                test: /[\\/]monaco-editor[\\/]/,
                name: 'monaco/chunk-monaco',
                chunks: 'all',
            },
        };
    },
};
