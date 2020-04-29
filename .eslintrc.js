const { resolve } = require('path')

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
    project: [resolve(__dirname, 'tsconfig.json'), resolve(__dirname, '__tests__', 'tsconfig.json')]
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'import-helpers', 'prettier'],
  extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint'],
  rules: {
    semi: ['error', 'never'],
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
    'no-useless-constructor': 'off',
    'comma-dangle': ['error', 'never'],
    'object-curly-newline': 0,
    '@typescript-eslint/explicit-function-return-type': 'off',
    'class-methods-use-this': 0,
    'import/no-cycle': 0,
    'prefer-destructuring': ['error', { object: true, array: true }]
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
}
