// jest.setup.js
// Learn more: https://github.com/testing-library/jest-dom#usage
import '@testing-library/jest-dom';

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
    return '';
  },
}));

// Mock next-auth/react
jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react');
  const mockSession = {
    data: { user: { name: 'Test User', email: 'test@example.com' } },
    status: 'authenticated',
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => mockSession),
  };
});
