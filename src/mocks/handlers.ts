// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

// Mock data
const mockAnnouncements = [
  {
    id: '1',
    title: 'Welcome Back!',
    content: 'Welcome back to the new academic year!',
    createdAt: new Date().toISOString(),
    author: {
      name: 'Admin',
      email: 'admin@example.com',
    },
  },
];

const mockResources = [
  {
    id: '1',
    title: 'Introduction to Law',
    fileUrl: '/files/intro-to-law.pdf',
    type: 'Lecture Note',
    courseCode: 'LAW101',
    level: 100,
    semester: 1,
    uploader: {
      name: 'John Doe',
      email: 'john@example.com',
    },
  },
];

export const handlers = [
  // Mock announcements endpoint
  http.get('/api/trpc/announcement.getLatestAnnouncements', () => {
    return HttpResponse.json({ result: { data: mockAnnouncements } });
  }),

  // Mock resources endpoint
  http.get('/api/trpc/resource.getResources', () => {
    return HttpResponse.json({ result: { data: mockResources } });
  }),

  // Mock feedback submission
  http.post('/api/trpc/feedback.submitFeedback', async ({ request }) => {
    const { input } = await request.json() as { input: { content: string } };
    if (!input?.content) {
      return new HttpResponse(
        JSON.stringify({ error: { message: 'Content is required' } }),
        { status: 400 }
      );
    }
    return HttpResponse.json({ result: { data: { id: '1', content: input.content } } });
  }),
];
