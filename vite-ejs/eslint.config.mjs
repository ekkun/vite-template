import js from '@eslint/js';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.js']
  },
  js.configs.recommended,
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jquery,
        ...globals.node,
        ...globals.es6,
        ...globals.es2021
      },
      parserOptions: {
        sourceType: 'module'
      }
    },
    rules: {
      'prefer-const': 'error',
      //'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-console': 'off'
    }
  }
];
