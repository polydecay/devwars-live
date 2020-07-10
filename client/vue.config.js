module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8000',
                ws: true,
            },
        },
    },
    chainWebpack(config) {
        config.plugin('html').tap((args) => {
            args[0].title = 'DevWars - Live';
            return args
        });
    },
};
