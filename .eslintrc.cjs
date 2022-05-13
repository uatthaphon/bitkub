module.exports = {
  env: {
    es2021: true,
    node: true,
    commonjs: true,
  },
  extends: ['airbnb-base', 'eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/extensions': 'never',
  },
};
