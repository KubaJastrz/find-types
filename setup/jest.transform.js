// eslint-disable-next-line @typescript-eslint/no-var-requires
const babelJest = require('babel-jest');

const config = {
    presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
};

module.exports = babelJest.createTransformer(config);
