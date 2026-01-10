module.exports = {
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/tests/setupEnv.js'],
  transform: {
    '^.+\\.js$': ['babel-jest', { configFile: './babel.config.cjs' }]
  }
  ,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'services/**/*.js',
    'controllers/**/*.js',
    'repositories/**/*.js',
    'utils/**/*.js',
    '!**/node_modules/**',
    '!tests/**'
  ],
  coverageThreshold: {
    global: {
      branches: 28,
      functions: 40,
      lines: 40,
      statements: 40
    }
  }
};
