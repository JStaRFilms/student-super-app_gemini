// jest.config.cjs - CommonJS configuration for Jest
module.exports = {
  testEnvironment: 'jsdom',
  testRunner: 'jest-circus/runner',
  verbose: true,
  bail: 1,
  detectOpenHandles: true,
  forceExit: true,
  
  setupFiles: [
    '<rootDir>/test-utils/polyfills.js',
    '<rootDir>/src/setupTests.ts',
  ],
  
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/e2e/',
    '<rootDir>/cypress/',
  ],
  
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)',
    '**/src/**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: 'test-results', outputName: 'junit.xml' }],
  ],
  
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/**/types.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
};
