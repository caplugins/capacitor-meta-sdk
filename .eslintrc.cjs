module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['@ionic/eslint-config/recommended'],
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: ['dist/', 'node_modules/', 'rollup.config.js'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'import/order': 'off',
  },
};
