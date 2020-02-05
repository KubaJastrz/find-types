const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Find Types',
    description: 'Search engine for TypeScript definitions',
    hostname: 'https://find-types.now.sh',
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
    'gatsby-plugin-svgr',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-lodash',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Find Types',
        start_url: '/',
        background_color: 'hsl(204, 30%, 12%)',
        theme_color: '#006bb3',
        display: 'standalone',
        icon: 'src/assets/images/logo.png',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.resolve(__dirname, 'src/assets/images'),
      },
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: ['UA-156661928-1'],
        gtagConfig: {
          anonymize: true,
        },
        pluginConfig: {
          head: true,
          respectDNT: true,
        },
      },
    },
  ],
};
