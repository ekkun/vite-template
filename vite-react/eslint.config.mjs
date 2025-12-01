import js from '@eslint/js';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';
import tsParser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.jquery,
        ...globals.node,
        ...globals.es6,
        ...globals.es2021,
      },
    },
    rules: {
      'prefer-const': 'error',
      'no-console': 'off',
    },
  },
];
