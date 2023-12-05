import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

process.env.TZ = "UTC";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["app/setupTests.ts"],
    include: ["app/**/*.spec.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "app"),
    },
  },
  plugins: [react()],
});
