import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
	index("routes/index.tsx"),
	route("health", "routes/health.tsx"),

	route("package", "routes/package.index.tsx"),
	route("package/:slug", "routes/package.$.tsx"),

	route("*", "routes/$.tsx"),
] satisfies RouteConfig;
