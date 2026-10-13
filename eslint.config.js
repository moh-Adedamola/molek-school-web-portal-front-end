import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

// Plain-JS config. The old one imported typescript-eslint, which is not
// installed, so `npm run lint` could not start at all.
export default defineConfig([
    globalIgnores(['dist', '.molek-backup']),
    {
        files: ['**/*.{js,jsx}'],
        extends: [
            js.configs.recommended,
            reactHooks.configs['recommended-latest'],
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            ecmaVersion: 2022,
            globals: globals.browser,
            parserOptions: { ecmaFeatures: { jsx: true } },
        },
        rules: {
            // Without eslint-plugin-react, ESLint cannot see JSX usage, so
            // <Icon />, <Header /> and <motion.div> would all be reported as
            // unused. Skip capitalised names and `motion`.
            'no-unused-vars': ['error', {
                varsIgnorePattern: '^([A-Z_]|motion$)',
                argsIgnorePattern: '^[A-Z_]',
            }],
        },
    },
    {
        files: ['**/*.test.js'],
        languageOptions: { globals: globals.node },
    },
])
