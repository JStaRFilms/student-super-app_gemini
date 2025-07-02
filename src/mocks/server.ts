// src/mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'warn' });
  
  // Add a simple console.log to confirm the server is starting
  console.log('MSW server started for tests');
});

// Reset any runtime request handlers we may add during the tests.
afterEach(() => {
  server.resetHandlers();
  // Clear all mocks between tests
  jest.clearAllMocks();
});

// Clean up after the tests are finished.
afterAll(() => {
  server.close();
  console.log('MSW server closed');
});
