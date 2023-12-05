/** @type {import('prettier').Config} */
export default {
  printWidth: 100,
  plugins: ["prettier-plugin-organize-imports", "prettier-plugin-tailwindcss"],
  tailwindFunctions: ["cva", "cn"],
};
