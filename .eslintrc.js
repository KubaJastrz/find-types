module.exports = {
  extends: ['@remix-run/eslint-config', '@remix-run/eslint-config/node', 'prettier'],
  plugins: ['prettier', 'simple-import-sort', 'unused-imports'],
  rules: {
    'prettier/prettier': 'warn',

    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',

    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
  },
};
