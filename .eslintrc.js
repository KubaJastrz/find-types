module.exports = {
  extends: ['emperor/react', 'emperor/react/style'],
  plugins: ['simple-import-sort', 'unused-imports'],
  rules: {
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    'unused-imports/no-unused-imports': 'error',
  },
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    node: true,
  },
};
