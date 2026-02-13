import { describe, it, expect } from 'vitest';
import {
  parseCookieString,
  parseContentType,
  isValidHeaderValue,
} from '../src/utils/httpUtils.js';

describe('parseCookieString', () => {
  it('should parse simple cookie string', () => {
    expect(parseCookieString('name=John; theme=dark')).toEqual({
      name: 'John',
      theme: 'dark',
    });
  });

  it('should handle quoted values', () => {
    expect(parseCookieString('name="John Doe"')).toEqual({ name: 'John Doe' });
  });

  it('should handle empty string', () => {
    expect(parseCookieString('')).toEqual({});
  });

  it('should handle values with equals signs', () => {
    expect(parseCookieString('token=abc=def')).toEqual({ token: 'abc=def' });
  });

  it('should return empty for non-string input', () => {
    expect(parseCookieString(null as unknown as string)).toEqual({});
  });
});

describe('parseContentType', () => {
  it('should parse content type with charset', () => {
    const result = parseContentType('application/json; charset=utf-8');
    expect(result.type).toBe('application');
    expect(result.subtype).toBe('json');
    expect(result.params.charset).toBe('utf-8');
  });

  it('should parse simple content type', () => {
    const result = parseContentType('text/html');
    expect(result.type).toBe('text');
    expect(result.subtype).toBe('html');
    expect(result.params).toEqual({});
  });

  it('should handle empty string', () => {
    const result = parseContentType('');
    expect(result.type).toBe('');
    expect(result.subtype).toBe('');
  });

  it('should handle multiple params', () => {
    const result = parseContentType('multipart/form-data; boundary=abc; charset=utf-8');
    expect(result.params.boundary).toBe('abc');
    expect(result.params.charset).toBe('utf-8');
  });
});

describe('isValidHeaderValue', () => {
  it('should return true for valid header values', () => {
    expect(isValidHeaderValue('application/json')).toBe(true);
    expect(isValidHeaderValue('Bearer token123')).toBe(true);
  });

  it('should return false for values with null bytes', () => {
    expect(isValidHeaderValue('value\0here')).toBe(false);
  });

  it('should return false for values with newlines', () => {
    expect(isValidHeaderValue('value\r\nInjection: true')).toBe(false);
  });

  it('should return false for non-strings', () => {
    expect(isValidHeaderValue(null)).toBe(false);
    expect(isValidHeaderValue(123)).toBe(false);
  });
});
