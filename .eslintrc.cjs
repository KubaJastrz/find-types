module.exports = {
  root: true,
  parserOptions: {
    project: "./tsconfig.json",
    warnOnUnsupportedTypeScriptVersion: false,
  },
  extends: [
    "@10clouds/eslint-config",
    "@10clouds/eslint-config/react",
    "@10clouds/eslint-config/prettier",
  ],
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
        disallowTypeAnnotations: true,
      },
    ],
    // custom
    "react/jsx-props-no-spreading": "off",
    "no-nested-ternary": "off",
  },
};
