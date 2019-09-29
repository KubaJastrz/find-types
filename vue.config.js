const publicPath = process.env.NODE_ENV === 'production' ? 'https://find-types.netlify.com/' : '/';

module.exports = {
    css: {
        loaderOptions: {
            // https://github.com/vuejs/vue-cli/issues/4630
            scss: {
                sassOptions: {
                    includePaths: ['./src/styles'],
                },
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
                    plugins: [{ removeViewBox: false }, { removeTitle: false }],
                },
            });
    },
    publicPath,
};
