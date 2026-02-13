import { describe, it, expect } from 'vitest';
import { isNonEmptyObject } from '../src/is/isNonEmptyObject';
import { isEmptyObject } from '../src/is/isEmptyObject';

describe('Object Check Utilities', () => {
  describe('isNonEmptyObject', () => {
    it('should return true for objects with properties', () => {
      expect(isNonEmptyObject({ a: 1 })).toBe(true);
      expect(isNonEmptyObject({ a: 1, b: 2 })).toBe(true);
      expect(isNonEmptyObject({ key: undefined })).toBe(true); // has own property
    });

    it('should return false for empty objects', () => {
      expect(isNonEmptyObject({})).toBe(false);
    });

    it('should return false for non-plain objects', () => {
      expect(isNonEmptyObject(null)).toBe(false);
      expect(isNonEmptyObject(undefined)).toBe(false);
      expect(isNonEmptyObject([1, 2, 3])).toBe(false);
      expect(isNonEmptyObject([])).toBe(false);
      expect(isNonEmptyObject('string')).toBe(false);
      expect(isNonEmptyObject(42)).toBe(false);
      expect(isNonEmptyObject(new Date())).toBe(false);
    });
  });

  describe('isEmptyObject', () => {
    it('should return true for empty objects', () => {
      expect(isEmptyObject({})).toBe(true);
    });

    it('should return false for objects with properties', () => {
      expect(isEmptyObject({ a: 1 })).toBe(false);
      expect(isEmptyObject({ key: undefined })).toBe(false);
    });

    it('should return false for non-plain objects', () => {
      expect(isEmptyObject(null)).toBe(false);
      expect(isEmptyObject(undefined)).toBe(false);
      expect(isEmptyObject([])).toBe(false);
      expect(isEmptyObject([1, 2])).toBe(false);
      expect(isEmptyObject('string')).toBe(false);
      expect(isEmptyObject(42)).toBe(false);
    });
  });
});
