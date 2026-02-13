import { describe, it, expect } from 'vitest';
import {
  parseNumber,
  parseInteger,
  parseString,
  parseBoolean,
  parseJSON,
  parseArray,
} from '../src/utils/parseUtils';

describe('Parse Utilities', () => {
  describe('parseNumber', () => {
    it('should parse valid numbers', () => {
      expect(parseNumber('42', 0)).toBe(42);
      expect(parseNumber('3.14', 0)).toBe(3.14);
      expect(parseNumber(100, 0)).toBe(100);
    });

    it('should return default for invalid values', () => {
      expect(parseNumber('abc', 0)).toBe(0);
      expect(parseNumber(null, 10)).toBe(10);
      expect(parseNumber(undefined, 5)).toBe(5);
      expect(parseNumber('', 99)).toBe(99);
    });

    it('should handle NaN', () => {
      expect(parseNumber(Number.NaN, 0)).toBe(0);
    });

    it('should handle negative numbers', () => {
      expect(parseNumber('-42', 0)).toBe(-42);
    });
  });

  describe('parseInteger', () => {
    it('should parse valid integers', () => {
      expect(parseInteger('42', 0)).toBe(42);
      expect(parseInteger('3.7', 0)).toBe(3);
      expect(parseInteger('3.2', 0)).toBe(3);
    });

    it('should return default for invalid values', () => {
      expect(parseInteger('abc', 0)).toBe(0);
      expect(parseInteger(null, 10)).toBe(10);
    });
  });

  describe('parseString', () => {
    it('should convert values to string', () => {
      expect(parseString('hello', '')).toBe('hello');
      expect(parseString(42, '')).toBe('42');
      expect(parseString(true, '')).toBe('true');
    });

    it('should return default for null/undefined', () => {
      expect(parseString(null, 'default')).toBe('default');
      expect(parseString(undefined, 'default')).toBe('default');
    });
  });

  describe('parseBoolean', () => {
    it('should parse truthy strings', () => {
      expect(parseBoolean('true', false)).toBe(true);
      expect(parseBoolean('TRUE', false)).toBe(true);
      expect(parseBoolean('1', false)).toBe(true);
      expect(parseBoolean('yes', false)).toBe(true);
      expect(parseBoolean('on', false)).toBe(true);
    });

    it('should parse falsy strings', () => {
      expect(parseBoolean('false', true)).toBe(false);
      expect(parseBoolean('FALSE', true)).toBe(false);
      expect(parseBoolean('0', true)).toBe(false);
      expect(parseBoolean('no', true)).toBe(false);
      expect(parseBoolean('off', true)).toBe(false);
    });

    it('should handle boolean values directly', () => {
      expect(parseBoolean(true, false)).toBe(true);
      expect(parseBoolean(false, true)).toBe(false);
    });

    it('should return default for ambiguous values', () => {
      expect(parseBoolean('maybe', false)).toBe(false);
      expect(parseBoolean('maybe', true)).toBe(true);
    });

    it('should return default for null/undefined', () => {
      expect(parseBoolean(null, true)).toBe(true);
      expect(parseBoolean(undefined, false)).toBe(false);
    });
  });

  describe('parseJSON', () => {
    it('should parse valid JSON', () => {
      expect(parseJSON('{"a":1}', {})).toEqual({ a: 1 });
      expect(parseJSON('[1,2,3]', [])).toEqual([1, 2, 3]);
    });

    it('should return default for invalid JSON', () => {
      expect(parseJSON('invalid', {})).toEqual({});
      expect(parseJSON('{broken', [])).toEqual([]);
    });

    it('should return default for null/undefined/empty', () => {
      expect(parseJSON(null, { default: true })).toEqual({ default: true });
      expect(parseJSON(undefined, [])).toEqual([]);
      expect(parseJSON('', {})).toEqual({});
    });
  });

  describe('parseArray', () => {
    it('should parse comma-separated strings', () => {
      expect(parseArray('a,b,c', ',', [])).toEqual(['a', 'b', 'c']);
    });

    it('should trim whitespace', () => {
      expect(parseArray('a , b , c', ',', [])).toEqual(['a', 'b', 'c']);
    });

    it('should use custom separator', () => {
      expect(parseArray('a|b|c', '|', [])).toEqual(['a', 'b', 'c']);
    });

    it('should filter empty strings', () => {
      expect(parseArray('a,,b', ',', [])).toEqual(['a', 'b']);
    });

    it('should return default for null/undefined/empty', () => {
      expect(parseArray(null, ',', ['default'])).toEqual(['default']);
      expect(parseArray('', ',', ['default'])).toEqual(['default']);
    });
  });
});
