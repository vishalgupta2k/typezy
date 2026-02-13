import { describe, it, expect } from 'vitest';
import {
  parseSearchParams,
  buildQueryString,
  mergeSearchParams,
  isAbsoluteURL,
  isRelativeURL,
} from '../src/utils/urlUtils.js';

describe('parseSearchParams', () => {
  it('should parse query string from a full URL', () => {
    const result = parseSearchParams('https://example.com?page=1&sort=name');
    expect(result).toEqual({ page: '1', sort: 'name' });
  });

  it('should parse a standalone query string', () => {
    expect(parseSearchParams('?page=1&sort=name')).toEqual({ page: '1', sort: 'name' });
  });

  it('should parse query string without leading ?', () => {
    expect(parseSearchParams('page=1&sort=name')).toEqual({ page: '1', sort: 'name' });
  });

  it('should return empty object for empty string', () => {
    expect(parseSearchParams('')).toEqual({});
  });

  it('should return empty object for invalid input', () => {
    expect(parseSearchParams(null as unknown as string)).toEqual({});
  });
});

describe('buildQueryString', () => {
  it('should build query string from params', () => {
    const result = buildQueryString({ page: 1, sort: 'name' });
    expect(result).toContain('page=1');
    expect(result).toContain('sort=name');
  });

  it('should filter out undefined and null values', () => {
    const result = buildQueryString({ page: 1, filter: undefined, sort: null });
    expect(result).toBe('page=1');
  });

  it('should handle boolean values', () => {
    const result = buildQueryString({ active: true });
    expect(result).toBe('active=true');
  });

  it('should return empty string for empty params', () => {
    expect(buildQueryString({})).toBe('');
  });
});

describe('mergeSearchParams', () => {
  it('should merge new params into URL', () => {
    const result = mergeSearchParams('https://example.com?page=1', { sort: 'name' });
    expect(result).toContain('page=1');
    expect(result).toContain('sort=name');
  });

  it('should override existing params', () => {
    const result = mergeSearchParams('https://example.com?page=1', { page: '2' });
    expect(result).toContain('page=2');
  });

  it('should remove params set to undefined', () => {
    const result = mergeSearchParams('https://example.com?page=1&sort=name', { page: undefined });
    expect(result).not.toContain('page=');
    expect(result).toContain('sort=name');
  });

  it('should return base for invalid URL', () => {
    expect(mergeSearchParams('not-a-url', { page: '1' })).toBe('not-a-url');
  });
});

describe('isAbsoluteURL', () => {
  it('should return true for absolute URLs', () => {
    expect(isAbsoluteURL('https://example.com')).toBe(true);
    expect(isAbsoluteURL('http://example.com')).toBe(true);
    expect(isAbsoluteURL('ftp://files.example.com')).toBe(true);
  });

  it('should return false for relative URLs', () => {
    expect(isAbsoluteURL('/about')).toBe(false);
    expect(isAbsoluteURL('./page')).toBe(false);
    expect(isAbsoluteURL('about')).toBe(false);
  });

  it('should return false for non-strings', () => {
    expect(isAbsoluteURL(null)).toBe(false);
    expect(isAbsoluteURL(123)).toBe(false);
  });
});

describe('isRelativeURL', () => {
  it('should return true for relative URLs', () => {
    expect(isRelativeURL('/about')).toBe(true);
    expect(isRelativeURL('./page')).toBe(true);
    expect(isRelativeURL('about')).toBe(true);
  });

  it('should return false for absolute URLs', () => {
    expect(isRelativeURL('https://example.com')).toBe(false);
  });

  it('should return false for non-strings', () => {
    expect(isRelativeURL(null)).toBe(false);
  });
});
