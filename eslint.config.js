import css from '@eslint/css';
import globals from 'globals';
import js from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // 1. Core JS rules + project settings (Insulated)
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

  // 3. React recommended rules (Insulated)
  // Map over the config to force the files restriction on every internal React rule object
  ...[pluginReact.configs.flat.recommended].flat().map(config => ({
    ...config,
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    rules: {
      ...config.rules,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
  })),

  ...[reactHooks.configs.flat.recommended].flat().map(config => ({
    ...config,
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  })),

  // 4. JSON Configurations
  // lint JSON files
  {
    files: ['**/*.json'],
    ignores: ['package-lock.json', '.devcontainer/devcontainer.json', 'tsconfig.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
  },

  // lint JSONC files
  {
    files: ['**/*.jsonc'],
    plugins: { json },
    language: 'json/jsonc',
    extends: ['json/recommended'],
  },

  // lint JSON5 files
  {
    files: ['**/*.json5'],
    plugins: { json },
    language: 'json/json5',
    extends: ['json/recommended'],
  },

  // 5. Markdown Configurations
  {
    files: ['**/*.md'],
    plugins: {
      markdown,
    },
    extends: ['markdown/recommended'],
  },

  // 6. CSS Configurations
  {
    files: ['**/*.css'],
    language: 'css/css',
    plugins: { css },
    extends: ['css/recommended'],
  },
]);
