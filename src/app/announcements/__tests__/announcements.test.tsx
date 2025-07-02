import { describe, it, expect, jest, beforeAll, afterEach, afterAll } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { http, HttpResponse } from 'msw';
import type { Session } from 'next-auth';
import AnnouncementsPage from '../page';
import { server } from '@/mocks/server';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

describe('Announcements Page', () => {
  // Create a new QueryClient for each test
  let queryClient: QueryClient;

  beforeAll(() => {
    // Start the mock service worker
    server.listen({ onUnhandledRequest: 'error' });
  });

  beforeEach(() => {
    // Create a new QueryClient for each test
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false, // Disable retries for tests
        },
      },
    });

    // Mock session data with proper Session type
    const mockSession: Session = {
      user: {
        id: 'test-user-id',
        name: 'Test User',
        email: 'test@example.com',
        role: 'student',
        matricNumber: 'TEST123',
      },
      expires: new Date(Date.now() + 2 * 86400).toISOString(),
    };

    // Mock the useSession hook
    jest.mock('next-auth/react', () => ({
      ...(jest.requireActual('next-auth/react') as object),
      useSession: () => ({ data: mockSession, status: 'authenticated' }),
    }));
  });

  afterEach(() => {
    // Reset the mock service worker and clear all mocks
    server.resetHandlers();
    jest.clearAllMocks();
    queryClient.clear();
  });

  afterAll(() => {
    // Clean up the mock service worker
    server.close();
  });

  it('displays announcements when loaded', async () => {
    // Mock the API response using MSW v2+
    server.use(
      http.get('/api/announcements', () => {
        return HttpResponse.json([
          {
            id: '1',
            title: 'Test Announcement',
            content: 'This is a test announcement',
            createdAt: new Date().toISOString(),
            author: {
              name: 'Test User',
              email: 'test@example.com',
            },
          },
        ]);
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={null}>
          <AnnouncementsPage />
        </SessionProvider>
      </QueryClientProvider>
    );

    // Check if the loading state is shown
    expect(screen.getByText('Loading announcements...')).toBeInTheDocument();

    // Wait for the announcements to be loaded
    const announcementTitle = await screen.findByText('Test Announcement');
    expect(announcementTitle).toBeInTheDocument();
    expect(screen.getByText('This is a test announcement')).toBeInTheDocument();
  });
});