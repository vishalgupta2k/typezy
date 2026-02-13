import { describe, it, expect } from 'vitest';
import {
  toNumber,
  toInteger,
  toString,
  toBoolean,
  coalesce,
  coalesceTruthy,
} from '../src/utils/coercionUtils';

describe('Coercion Utilities', () => {
  describe('toNumber', () => {
    it('should convert valid values to number', () => {
      expect(toNumber('42')).toBe(42);
      expect(toNumber('3.14')).toBe(3.14);
      expect(toNumber(100)).toBe(100);
    });

    it('should return undefined for invalid values', () => {
      expect(toNumber('abc')).toBeUndefined();
      expect(toNumber(null)).toBeUndefined();
      expect(toNumber(undefined)).toBeUndefined();
      expect(toNumber('')).toBeUndefined();
    });

    it('should handle edge cases', () => {
      expect(toNumber('0')).toBe(0);
      expect(toNumber('-5')).toBe(-5);
    });
  });

  describe('toInteger', () => {
    it('should convert to integer', () => {
      expect(toInteger('42')).toBe(42);
      expect(toInteger('3.7')).toBe(3);
      expect(toInteger('3.2')).toBe(3);
    });

    it('should return undefined for invalid values', () => {
      expect(toInteger('abc')).toBeUndefined();
      expect(toInteger(null)).toBeUndefined();
    });
  });

  describe('toString', () => {
    it('should convert values to string', () => {
      expect(toString(42)).toBe('42');
      expect(toString(true)).toBe('true');
      expect(toString('hello')).toBe('hello');
    });

    it('should return undefined for null/undefined', () => {
      expect(toString(null)).toBeUndefined();
      expect(toString(undefined)).toBeUndefined();
    });
  });

  describe('toBoolean', () => {
    it('should convert truthy strings to true', () => {
      expect(toBoolean('true')).toBe(true);
      expect(toBoolean('1')).toBe(true);
      expect(toBoolean('yes')).toBe(true);
      expect(toBoolean('on')).toBe(true);
    });

    it('should convert falsy strings to false', () => {
      expect(toBoolean('false')).toBe(false);
      expect(toBoolean('0')).toBe(false);
      expect(toBoolean('no')).toBe(false);
      expect(toBoolean('off')).toBe(false);
    });

    it('should handle boolean values directly', () => {
      expect(toBoolean(true)).toBe(true);
      expect(toBoolean(false)).toBe(false);
    });

    it('should handle numbers', () => {
      expect(toBoolean(1)).toBe(true);
      expect(toBoolean(0)).toBe(false);
      expect(toBoolean(42)).toBeUndefined(); // Ambiguous
    });

    it('should return undefined for ambiguous/null values', () => {
      expect(toBoolean('maybe')).toBeUndefined();
      expect(toBoolean(null)).toBeUndefined();
      expect(toBoolean(undefined)).toBeUndefined();
    });
  });

  describe('coalesce', () => {
    it('should return first non-null/undefined value', () => {
      expect(coalesce(null, undefined, 'hello', 'world')).toBe('hello');
      expect(coalesce(null, 42, 100)).toBe(42);
    });

    it('should keep falsy but defined values', () => {
      expect(coalesce(null, 0, 1)).toBe(0);
      expect(coalesce(undefined, '', 'hello')).toBe('');
      expect(coalesce(null, false, true)).toBe(false);
    });

    it('should return undefined if all values are nullish', () => {
      expect(coalesce(null, undefined, null)).toBeUndefined();
    });

    it('should return first value if defined', () => {
      expect(coalesce(1, 2, 3)).toBe(1);
    });
  });

  describe('coalesceTruthy', () => {
    it('should return first truthy value', () => {
      expect(coalesceTruthy(0, '', null, 'hello')).toBe('hello');
      expect(coalesceTruthy(false, 0, 42)).toBe(42);
    });

    it('should return undefined if all values are falsy', () => {
      expect(coalesceTruthy(0, '', false, null)).toBeUndefined();
    });
  });
});
