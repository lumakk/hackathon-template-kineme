/** @type {import('eslint').Linter.Config} */
module.exports = {
  // Use the root directory as the current working directory for configuration resolution
  root: true,
  // Define the execution environments
  env: {
    browser: true,
    es2020: true,
    node: true,
    // Enable Vitest globals like 'describe', 'it', 'expect'
    'vitest-globals/env': true,
  },
  // Extend recommended configurations
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  // Specify the parser options
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    // Point ESLint to the frontend's TypeScript config
    project: ['./tsconfig.json'],
  },
  // Custom plugins (for testing, etc.)
  plugins: ['@typescript-eslint', 'react-refresh', 'vitest-globals'],
  // Custom rules for the React app
  rules: {
    // Allows JSX to be used without explicitly importing React (React 17+ requirement)
    'react/react-in-jsx-scope': 'off',
    // Warns about unused variables but allows for underscore prefix (e.g., _unused)
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    // Specific rule for Vite/React setup to check for fast refresh issues
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
