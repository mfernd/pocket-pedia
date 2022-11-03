module.exports = {
  env: {
    browser: true,
    es2022: true,
  },
  extends: ['plugin:vue/vue3-essential', 'google', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue', 'prettier'],
  rules: {
    'vue/comment-directive': 'off',
    'prettier/prettier': 'error',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src/']],
        extensions: ['.js'],
      },
    },
  },
};
