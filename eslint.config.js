import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import reactCompiler from 'eslint-plugin-react-compiler';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactDom from 'eslint-plugin-react-dom';
import unicornPlugin from 'eslint-plugin-unicorn';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  unicornPlugin.configs.recommended,

  { ignores: ['dist', '.next', '**/*.js', '**/*.config.js', '**/*.config.ts'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strict,
      eslintPluginPrettier,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react-compiler': reactCompiler,
      'jsx-a11y': jsxA11y,
      'react-dom': reactDom,
      perfectionist: perfectionistPlugin,
      import: importPlugin,
    },
    rules: {
      // react
      ...jsxA11y.configs.recommended.rules,
      ...reactDom.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react-compiler/react-compiler': 'error',
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      'jsx-a11y/anchor-is-valid': 'off',
      // perfectionist
      'perfectionist/sort-imports': 'error',
      // import
      'import/extensions': [
        'error',
        { ts: 'never', tsx: 'never', css: 'always' },
      ],
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'import/no-cycle': ['error', { maxDepth: Infinity }],
      'import/first': 'error',
      // common
      curly: ['error', 'all'],
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'no-confusing-arrow': ['error', { allowParens: true }],
      // ts
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      // prettier
      'prettier/prettier': 'off',
      // unicorn
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/prefer-at': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-null': 'off',
      'unicorn/number-literal-case': 'off',
      'unicorn/numeric-separators-style': 'off',
      'unicorn/prefer-global-this': 'off',
      'unicorn/prefer-string-raw': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            acc: true,
            env: true,
            i: true,
            j: true,
            props: true,
            Props: true,
            args: true,
            ImportMetaEnv: true,
            params: true,
            Params: true,
          },
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
  }
);
