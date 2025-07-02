// Minimal Jest configuration in CommonJS format
module.exports = {
  testEnvironment: 'node',  // Start with node environment for simplicity
  
  // Test discovery patterns
  testMatch: [
    '**/__tests__/**/*.test.js',
    '**/src/**/*.test.js'
  ],
  
  // Look in src directory
  roots: ['<rootDir>/src'],
  
  // Output
  verbose: true,
  bail: 1,
  
  // Debugging
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
  
  // Module resolution
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  
  // Enable debug output
  globals: {
    'ts-jest': {
      diagnostics: true
    }
  },
  
  // Setup files
  setupFiles: [
    '<rootDir>/test-utils/polyfills.js',
    '<rootDir>/src/setupTests.ts'
  ]
};
