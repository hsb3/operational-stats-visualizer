module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.mjs?$': 'babel-jest',
    '^.+\\.css$': 'jest-transform-stub',
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less)$': 'jest-transform-stub',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(react-force-graph|react-kapsule|jerrypick)/)',
  ],
};
