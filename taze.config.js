import { defineConfig } from "taze";

export default defineConfig({
	maturityPeriod: 1,
	includeLocked: true,
	exclude: ["@types/node"],
});
