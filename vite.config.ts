import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { vercelPreset } from "@vercel/remix/vite";
import { flatRoutes } from "remix-flat-routes";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals({ nativeFetch: true });

export default defineConfig(({ isSsrBuild }) => ({
  server: {
    port: 3000,
  },
  plugins: [
    remix({
      presets: [vercelPreset()],
      ignoredRouteFiles: ["**/.*"],
      routes: async (defineRoutes) => {
        return flatRoutes("routes", defineRoutes);
      },
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        unstable_singleFetch: false, // Check back later https://github.com/vercel/remix/issues/109
      },
    }),
    tsconfigPaths(),
  ],
  build: {
    target: isSsrBuild ? "es2022" : "modules",
    sourcemap: isSsrBuild,
  },
}));
