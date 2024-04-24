import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';

const compat = new FlatCompat();

const jsRules = {
  // jsに適用するルール
  'prettier/prettier': 1,
  'prefer-const': 'error',
  //'no-console': ['error', { allow: ['warn', 'error'] }],
  semi: [
    'error',
    'always',
    {
      omitLastInOneLineBlock: false
    }
  ],
  //quotes: [0, 'single', { avoidEscape: true }],
  'no-extra-semi': 'warn',
  'no-undef': 'warn',
  'space-before-blocks': [
    'warn',
    {
      functions: 'always'
    }
  ],
  'import/no-amd': 'off',
  'import/newline-after-import': 'off',
  'import/no-named-as-default': 'off',
  'import/no-named-as-default-member': 'off'
};

const tsRules = {
  // js, tsに適用するルール
};

export default [
  {
    files: ['**/*.js'],
    ignores: ['**/fixtures/**', '**/dist/**']
  },
  js.configs.recommended,
  eslintConfigPrettier,
  ...compat.extends('eslint-config-airbnb-base', 'prettier'),
  {
    plugins: {
      prettier
    },
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
      ...jsRules
    }
  }
  //{
  //  files: ['/**/*.ts', '/**/*.tsx'],
  //  languageOptions: {
  //    parser: tsEsLintParser,
  //    parserOptions: {
  //      globals: {
  //        ...globals.browser,
  //      },
  //      sourceType: 'module',
  //      project: './tsconfig.json',
  //    },
  //  },
  //  rules: {
  //    ...jsRules,
  //    ...tsRules,
  //  },
  //},
];
