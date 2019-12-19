const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Find Types',
    description: 'Search engine for TypeScript definitions',
  },
  plugins: [
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [require('postcss-preset-env')()],
      },
    },
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@': path.resolve(__dirname, 'src'),
          '@/types': path.resolve(__dirname, 'types'),
        },
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-lodash',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.resolve(__dirname, 'src/images'),
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Find Types',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#007acc',
        display: 'minimal-ui',
        icon: 'src/images/logo.png',
      },
    },
  ],
};
