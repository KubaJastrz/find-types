/**
 * @type {import('lint-staged').Config}
 */
export default {
	"*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}": ["biome check --write --no-errors-on-unmatched"],
	"*.{json,yaml,yml,html,md,mdx}": ["biome check --write --no-errors-on-unmatched"],
	"*.{code-workspace,code-snippets}": ["biome check --write --no-errors-on-unmatched"],
};
