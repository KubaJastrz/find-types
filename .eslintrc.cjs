module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
    warnOnUnsupportedTypeScriptVersion: false,
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    "@10clouds/eslint-config",
    "@10clouds/eslint-config/react",
    "@10clouds/eslint-config/prettier",
  ],
  rules: {
    "import/consistent-type-specifier-style": ["error", "prefer-inline"],
    "import/no-duplicates": ["error", { "prefer-inline": true }],
    "@typescript-eslint/consistent-type-imports": "off",

    // custom
    "react/jsx-props-no-spreading": "off",
    "no-nested-ternary": "off",
  },
};
