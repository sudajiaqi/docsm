const { defaults } = require('jest-config');

module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  // testMatch: ['**/tests/**/*.test.[jt]s?(x)', '**/?(*.)+(spec|tests).[jt]s?(x)'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  globals: {
    __DEV__: true,
  },
  testRegex: '(\\/tests\\/.*(test|spec))\\.[jt]sx?$',
  testPathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/'],
};
