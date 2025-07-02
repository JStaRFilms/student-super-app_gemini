// test-utils.tsx
import { render, type RenderOptions } from '@testing-library/react';
import { type ReactElement, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { type Session } from 'next-auth';

// Create a test session
export const mockSession: Session = {
  user: {
    id: 'test-user-id',
    name: 'Test User',
    email: 'test@example.com',
    role: 'STUDENT',
    matricNumber: 'A12345',
  },
  expires: '2025-12-31T23:59:59.999Z',
};

// Create a custom render function that includes providers
export const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & { session?: Session | null },
) => {
  const { session = mockSession, ...rest } = options || {};
  
  // Create a new QueryClient for each test
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        // Turn off retries to prevent test timeouts
        retryOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  });

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );

  return {
    ...render(ui, { wrapper: Wrapper, ...rest }),
    queryClient,
  };
};

// Re-export everything from RTL
export * from '@testing-library/react';
// Override render method
export { renderWithProviders as render };
