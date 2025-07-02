import { describe, it, expect } from '@jest/globals';
import { formatDate } from '../date.js';

describe('formatDate', () => {
  it('formats a date string correctly', () => {
    const date = '2023-05-15T12:00:00Z';
    expect(formatDate(date)).toBe('May 15, 2023');
  });

  it('formats a Date object correctly', () => {
    const date = new Date('2023-05-15T12:00:00Z');
    expect(formatDate(date)).toBe('May 15, 2023');
  });

  it('returns empty string for invalid date', () => {
    expect(formatDate('invalid-date')).toBe('');
  });

  it('handles different date formats', () => {
    expect(formatDate('2023-01-01')).toBe('January 1, 2023');
    expect(formatDate('01/15/2023')).toBe('January 15, 2023');
  });

  it('handles different locales', () => {
    const date = new Date('2023-05-15T12:00:00Z');
    expect(formatDate(date, 'en-US')).toBe('May 15, 2023');
    expect(formatDate(date, 'de-DE')).toBe('15. Mai 2023');
  });
});
