module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  // add your custom rules here
  rules: {
    // 'jsx-a11y/href-no-hash': 'off',
    // 'no-underscore-dangle': 'off',
    // 'import/extensions': 'off',
    // camelcase: 'off',
    'no-debugger': 'off',
  },
  globals: {},
};
