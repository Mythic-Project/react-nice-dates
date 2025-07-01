// @ts-check
import eslintJs from '@eslint/js'
import eslintReact from '@eslint-react/eslint-plugin'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import prettierrc from './.prettierrc.json' with { type: 'json' }

export default tseslint.config({
  files: ['**/*.ts', '**/*.tsx'],
  ignores: ['**/build/**', '**/build-website/**', '**/node_modules/**'],

  extends: [
    eslintJs.configs.recommended,
    tseslint.configs.strictTypeChecked,
    eslintReact.configs['recommended-type-checked'],
    eslintPluginPrettierRecommended
  ],

  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      tsconfigRootDir: import.meta.dirname,
      project: 'tsconfig.eslint.json'
    }
  },

  rules: {
    '@typescript-eslint/no-confusing-void-expression': 'off',
    "@typescript-eslint/no-unnecessary-condition": 'off',
    'prettier/prettier': ['error', prettierrc]
  }
})
