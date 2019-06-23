const typings = ['@/types', '@/api/ApiTypes'];

module.exports = {
    rootDir: '../',
    moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts', 'tsx'],
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '^.+\\.tsx?$': '<rootDir>/setup/jest.transform.js',
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    },
    transformIgnorePatterns: ['/node_modules/'],
    moduleNameMapper: {
        [`^${typings.join('|')}$`]: 'jest-transform-stub',
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    snapshotSerializers: ['jest-serializer-vue'],
    testMatch: ['<rootDir>/src/**/*.spec.(js|jsx|ts|tsx)'],
    testURL: 'http://localhost/',
    watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
