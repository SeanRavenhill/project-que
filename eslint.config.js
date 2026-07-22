import css from '@eslint/css';
import globals from 'globals';
import js from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  // 0. Global Ignores
  globalIgnores(['**/dist/**', '**/node_modules/**', '**/build/**']),

  // 1. Core JS rules + project settings
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    ...js.configs.recommended,
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    settings: {
      react: {
        version: '^19.2.7',
      },
    },
  },

  // 2. TypeScript recommended rules
  ...tseslint.configs.recommended,

  // 3. React & React Hooks recommended rules
  ...[pluginReact.configs.flat.recommended].flat().map(config => ({
    ...config,
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    rules: {
      ...config.rules,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      // Modern browsers handle target="_blank" securely by default
      'react/jsx-no-target-blank': 'off',
    },
  })),

  ...[reactHooks.configs.flat.recommended].flat().map(config => ({
    ...config,
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  })),

  // 4. Vite React Refresh (Targeted at client code)
  {
    files: ['app/client/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },

  // 5. JSON Configurations
  // Standard Strict JSON (package.json, etc.)
  {
    files: ['**/*.json'],
    ignores: ['package-lock.json', '.devcontainer/devcontainer.json', '**/tsconfig*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
  },

  // JSONC (JSON with Comments — tsconfig, devcontainer, VS Code configs)
  {
    files: ['**/*.jsonc', '**/tsconfig*.json', '.devcontainer/devcontainer.json'],
    plugins: { json },
    language: 'json/jsonc',
    extends: ['json/recommended'],
  },

  // 6. Markdown Configurations
  {
    files: ['**/*.md'],
    plugins: {
      markdown,
    },
    extends: ['markdown/recommended'],
  },

  // 7. CSS Configurations
  {
    files: ['**/*.css'],
    language: 'css/css',
    plugins: { css },
    extends: ['css/recommended'],
    rules: {
      // Allow global CSS variables defined in root/other stylesheets
      'css/no-invalid-properties': 'off',
    },
  },
]);
