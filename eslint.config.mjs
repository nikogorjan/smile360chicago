import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import nextPlugin from '@next/eslint-plugin-next'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'

/**
 * Native flat config (no @eslint/eslintrc FlatCompat). FlatCompat + ESLint 9 +
 * eslint-config-next crashes with "Converting circular structure to JSON" (the legacy
 * validator can't stringify eslint-plugin-react's circular configs), so we compose the
 * same rule set — next/core-web-vitals + next/typescript — directly from the plugins'
 * own flat configs instead.
 */
const eslintConfig = [
  // node_modules + .git are ignored by flat config automatically.
  { ignores: ['.next/', 'src/payload-types.ts', 'src/payload-generated-schema.ts'] },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'], // new JSX transform — no React import needed
  jsxA11y.flatConfigs.recommended,

  // react-hooks v7's bundled configs still use the legacy `plugins: ['react-hooks']`
  // array form (not flat-compatible), and `recommended-latest` enables many aggressive
  // new rules — so register the plugin ourselves with the two standard rules.
  {
    plugins: { 'react-hooks': reactHooks },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  // @next/eslint-plugin-next (recommended + core-web-vitals)
  {
    plugins: { '@next/next': nextPlugin },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },

  // Project conventions / relaxations
  {
    settings: { react: { version: 'detect' } },
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
    },
  },
]

export default eslintConfig
