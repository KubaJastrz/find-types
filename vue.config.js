module.exports = {
    css: {
        loaderOptions: {
            sass: {
                includePaths: ['./src/styles'],
            },
        },
    },
    chainWebpack(config) {
        const svgRule = config.module.rule('svg');

        svgRule.uses.clear();

        svgRule
            .use('vue-svg-loader')
            .loader('vue-svg-loader')
            .options({
                svgo: {
                    // https://github.com/svg/svgo/blob/master/.svgo.yml
                    plugins: [{ removeViewBox: false }],
                },
            });
    },
};
