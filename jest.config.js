const { defaults } = require('jest-config');

const types = ['@/types', '@/types/api'];

module.exports = {
  transform: {
    '^.+\\.(js|ts|tsx)$': '<rootDir>/setup/jest.transform.js',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  moduleNameMapper: {
    [`^${types.join('|')}$`]: 'jest-transform-stub',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: [...defaults.testPathIgnorePatterns, '.cache', 'public'],
  testMatch: ['<rootDir>/src/**/*.spec.(js|ts|tsx)', '<rootDir>/api/**/*.spec.(js|ts|tsx)'],
  testURL: 'http://localhost/',
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
