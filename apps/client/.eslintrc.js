module.exports = {
  extends: [
    'eslint-config-custom',
    '@vue/typescript/recommended',
    'plugin:vue/vue3-recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json'
  },
  ignorePatterns: ['src/**/*.d.ts'],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        '': 'never',
      },
    ]
  },
};