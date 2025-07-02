// Import Jest's expect and other globals
import { expect, beforeAll, afterEach, afterAll } from '@jest/globals';
// Import MSW server and handlers
import { server } from './mocks/server';
// Import jest-dom for custom matchers
import '@testing-library/jest-dom';

// Set up MSW with node environment
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  // Mock console.error and console.warn to avoid polluting test output
  // from expected errors
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    // Suppress expected error messages
    if (typeof args[0] === 'string' && 
        (args[0].includes('Error: connect ECONNREFUSED') ||
         args[0].includes('Error: NetworkError'))) {
      return;
    }
    originalError.call(console, ...args);
  });

  jest.spyOn(console, 'warn').mockImplementation((...args) => {
    // Suppress expected warning messages
    if (typeof args[0] === 'string' && 
        args[0].includes('A non-serializable value was detected in the state')) {
      return;
    }
    originalWarn.call(console, ...args);
  });

  // Start the MSW server
  server.listen({ onUnhandledRequest: 'error' });
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  // Clear all mocks after each test
  jest.clearAllMocks();
});

// Clean up after the tests are finished.
afterAll(() => {
  // Restore original console methods
  jest.restoreAllMocks();
  // Close the MSW server
  server.close();
});

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return '/';
  },
}));

// Add global error handler for uncaught exceptions
process.on('unhandledRejection', (reason) => {
  // Fail the test if there are any unhandled promise rejections
  throw reason;
});

// Add global error handler for uncaught exceptions
process.on('uncaughtException', (error) => {
  // Fail the test if there are any uncaught exceptions
  throw error;
});
