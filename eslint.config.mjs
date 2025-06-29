// @ts-check
import eslintJs from '@eslint/js'
import eslintReact from '@eslint-react/eslint-plugin'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import prettierrc from './.prettierrc.json' with { type: 'json' }

export default tseslint.config({
  files: ['**/*.ts', '**/*.tsx'],
  ignores: ['**/build/**', '**/node_modules/**'],

  extends: [
    eslintJs.configs.recommended,
    tseslint.configs.recommended,
    eslintReact.configs['recommended-typescript'],
    eslintPluginPrettierRecommended
  ],

  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname
    }
  },

  rules: {
    '@eslint-react/no-missing-key': 'warn',
    'prettier/prettier': ['error', prettierrc]
  }
})
