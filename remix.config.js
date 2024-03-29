/**
 * @type {import('@remix-run/dev').AppConfig}
 */
export default {
  ignoredRouteFiles: ["**/.*"],
  tailwind: true,
  browserNodeBuiltinsPolyfill: { modules: { url: true } },
};
