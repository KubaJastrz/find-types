const babelJest = require('babel-jest');

const config = {
  presets: ['babel-preset-gatsby', '@babel/preset-typescript'],
};

module.exports = babelJest.createTransformer(config);
