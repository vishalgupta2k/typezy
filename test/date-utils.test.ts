import { describe, it, expect } from 'vitest';
import { isInFuture, isInPast, isToday, isBetweenDates, isSameDay } from '../src/is/dateChecks.js';
import { timeAgo, formatRelativeDate } from '../src/utils/dateUtils.js';

describe('isInFuture', () => {
  it('should return true for future dates', () => {
    const future = new Date(Date.now() + 86400000); // tomorrow
    expect(isInFuture(future)).toBe(true);
  });

  it('should return false for past dates', () => {
    const past = new Date(Date.now() - 86400000);
    expect(isInFuture(past)).toBe(false);
  });

  it('should work with date strings', () => {
    expect(isInFuture('2099-01-01')).toBe(true);
    expect(isInFuture('2000-01-01')).toBe(false);
  });

  it('should return false for invalid values', () => {
    expect(isInFuture('not-a-date')).toBe(false);
    expect(isInFuture(null)).toBe(false);
  });
});

describe('isInPast', () => {
  it('should return true for past dates', () => {
    const past = new Date(Date.now() - 86400000);
    expect(isInPast(past)).toBe(true);
  });

  it('should return false for future dates', () => {
    const future = new Date(Date.now() + 86400000);
    expect(isInPast(future)).toBe(false);
  });
});

describe('isToday', () => {
  it('should return true for today', () => {
    expect(isToday(new Date())).toBe(true);
  });

  it('should return false for yesterday', () => {
    const yesterday = new Date(Date.now() - 86400000);
    expect(isToday(yesterday)).toBe(false);
  });

  it('should return false for invalid values', () => {
    expect(isToday('not-a-date')).toBe(false);
  });
});

describe('isBetweenDates', () => {
  it('should return true for dates in range', () => {
    const start = new Date('2024-01-01');
    const end = new Date('2024-12-31');
    expect(isBetweenDates(new Date('2024-06-15'), start, end)).toBe(true);
  });

  it('should return true for dates at boundaries (inclusive)', () => {
    const start = new Date('2024-01-01');
    const end = new Date('2024-12-31');
    expect(isBetweenDates(start, start, end)).toBe(true);
    expect(isBetweenDates(end, start, end)).toBe(true);
  });

  it('should return false for dates outside range', () => {
    const start = new Date('2024-01-01');
    const end = new Date('2024-12-31');
    expect(isBetweenDates(new Date('2023-06-15'), start, end)).toBe(false);
  });
});

describe('isSameDay', () => {
  it('should return true for dates on the same day', () => {
    const a = new Date('2024-06-15T10:00:00');
    const b = new Date('2024-06-15T22:00:00');
    expect(isSameDay(a, b)).toBe(true);
  });

  it('should return false for dates on different days', () => {
    const a = new Date('2024-06-15');
    const b = new Date('2024-06-16');
    expect(isSameDay(a, b)).toBe(false);
  });
});

describe('timeAgo', () => {
  it('should return "just now" for very recent dates', () => {
    expect(timeAgo(new Date())).toBe('just now');
  });

  it('should return seconds ago', () => {
    const date = new Date(Date.now() - 30000);
    expect(timeAgo(date)).toBe('30 seconds ago');
  });

  it('should return minutes ago', () => {
    const date = new Date(Date.now() - 5 * 60 * 1000);
    expect(timeAgo(date)).toBe('5 minutes ago');
  });

  it('should return hours ago', () => {
    const date = new Date(Date.now() - 3 * 60 * 60 * 1000);
    expect(timeAgo(date)).toBe('3 hours ago');
  });

  it('should return days ago', () => {
    const date = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    expect(timeAgo(date)).toBe('2 days ago');
  });

  it('should handle future dates', () => {
    const date = new Date(Date.now() + 5 * 60 * 1000);
    expect(timeAgo(date)).toBe('in 5 minutes');
  });

  it('should handle singular forms', () => {
    const date = new Date(Date.now() - 60 * 1000);
    expect(timeAgo(date)).toBe('1 minute ago');
  });
});

describe('formatRelativeDate', () => {
  it('should return "Today" for today', () => {
    expect(formatRelativeDate(new Date())).toBe('Today');
  });

  it('should return "Yesterday" for yesterday', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(formatRelativeDate(yesterday)).toBe('Yesterday');
  });

  it('should return "Tomorrow" for tomorrow', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    expect(formatRelativeDate(tomorrow)).toBe('Tomorrow');
  });

  it('should return day name for recent past dates', () => {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const result = formatRelativeDate(threeDaysAgo);
    expect(result).toMatch(/^Last (Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)$/);
  });

  it('should return formatted date for distant dates', () => {
    const result = formatRelativeDate(new Date('2020-03-15'));
    expect(result).toBe('Mar 15, 2020');
  });
});
