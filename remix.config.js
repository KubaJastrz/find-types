/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  // When running locally in development mode, we use the built in remix
  // server. This does not understand the vercel lambda module format,
  // so we default back to the standard build output.
  server: process.env.NODE_ENV === 'development' ? undefined : './server.js',
  ignoredRouteFiles: ['**/.*'],
  publicPath: '/build/',
  serverBuildPath: 'api/index.js',
  serverMainFields: ['main', 'module'],
  serverModuleFormat: 'cjs',
  serverPlatform: 'node',
  serverMinify: false,
  future: {
    v2_errorBoundary: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
    v2_meta: true,
  },
  tailwind: true,
};
