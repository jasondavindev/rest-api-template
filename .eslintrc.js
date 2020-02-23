const { resolve } = require('path');

module.exports = {
  env: {
    browser: false,
    es6: true,
    jest: true
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    project: resolve(__dirname, 'tsconfig.json')
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'import-helpers', 'prettier'],
  extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint'],
  rules: {
    'import-helpers/order-imports': [
      'warn',
      {
        // example configuration
        newlinesBetween: 'always',
        groups: ['module', '/^@/', '/^~/', ['parent', 'sibling', 'index']],
        alphabetize: {
          order: 'asc',
          ignoreCase: true
        }
      }
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        js: 'never'
      }
    ],
    'import/prefer-default-export': 0,
    'no-useless-constructor': 'off',
    'comma-dangle': ['error', 'never'],
    'object-curly-newline': 0,
    '@typescript-eslint/explicit-function-return-type': 'off',
    'class-methods-use-this': 0
  },
  settings: {
    'import/extensions': ['.js', '.ts'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts']
    },
    'import/resolver': {
      typescript: {}
    }
  }
};
