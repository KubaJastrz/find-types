module.exports = {
  moduleNameMapper: {
    '^/@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '^(?!.*\\.(js|jsx|ts|tsx|json)$)': 'jest-transform-stub',
  },
  transformIgnorePatterns: [],
  resetMocks: true,
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
}
