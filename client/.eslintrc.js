module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: 'tsconfig.json',
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
      'react-app',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:import/typescript',
      'prettier',
      'prettier/@typescript-eslint',
    ],
    root: true,
    env: {
      node: true,
      jest: true,
    },
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/member-delimiter-style': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      'import/order': ['error', {
        'groups': ['builtin', 'external', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        'alphabetize': {
          order: 'asc'
        },
      }],
      'import/no-useless-path-segments': ['error', {
        noUselessIndex: true,
      }],
      "jsx-a11y/anchor-has-content": [0],
    },
  };
