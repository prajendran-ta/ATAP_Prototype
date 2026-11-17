const eslint = require('@eslint/js')
const tseslint = require('@typescript-eslint/eslint-plugin')
const tsparser = require('@typescript-eslint/parser')
const prettier = require('eslint-plugin-prettier')
const prettierConfig = require('eslint-config-prettier')
const localRules = require('./eslint-local-rules')

const localRulesPlugin = { rules: localRules }

const FILES = ['src/**/*.{js,jsx,ts,tsx}', 'apps/**/*.{js,jsx,ts,tsx}']

module.exports = [
  eslint.configs.recommended,
  {
    files: FILES,
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        exports: 'writable',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        location: 'readonly',
        origin: 'readonly',
        URLSearchParams: 'readonly',
        // Global TypeScript namespaces
        SharedQL: 'readonly',
        AdvertiserQL: 'readonly',
        ObaQL: 'readonly',
        MediaplannerQL: 'readonly',
        MappingQL: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: prettier,
      'local-rules': localRulesPlugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...prettierConfig.rules,
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      'local-rules/button-id-format': 'error',
      'local-rules/table-id-format': 'error',
      'local-rules/select-id-format': 'error',
      'local-rules/drawer-id-format': 'error',
      'local-rules/input-id-format': 'error',
    },
  },
  {
    files: ['src/**/*.test.{js,jsx,ts,tsx}', 'apps/**/*.test.{js,jsx,ts,tsx}', 'src/setupTests.ts'],
    languageOptions: {
      globals: {
        jest: 'readonly',
      },
    },
  },
  {
    ignores: ['node_modules/', 'build/', '**/build/', 'webpack.config.js', 'eslint.config.js', 'eslint-local-rules.js'],
  },
]
