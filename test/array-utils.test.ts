import { describe, it, expect } from 'vitest';
import {
  filterDefined,
  compact,
  filterTruthy,
  unique,
  uniqueBy,
  partition,
  first,
  last,
} from '../src/utils/arrayUtils';

describe('Array Utilities', () => {
  describe('filterDefined', () => {
    it('should remove null and undefined values', () => {
      expect(filterDefined([1, null, 2, undefined, 3])).toEqual([1, 2, 3]);
    });

    it('should preserve other falsy values', () => {
      expect(filterDefined([0, null, '', undefined, false])).toEqual([0, '', false]);
    });

    it('should work with strings', () => {
      expect(filterDefined(['a', null, 'b', undefined])).toEqual(['a', 'b']);
    });

    it('should return empty array for all nullish values', () => {
      expect(filterDefined([null, undefined, null])).toEqual([]);
    });

    it('should return empty array for empty input', () => {
      expect(filterDefined([])).toEqual([]);
    });
  });

  describe('compact', () => {
    it('should remove all falsy values', () => {
      expect(compact([0, 1, false, 2, '', 3, null, undefined])).toEqual([1, 2, 3]);
    });

    it('should keep truthy values', () => {
      expect(compact(['hello', 42, true, {}, []])).toEqual(['hello', 42, true, {}, []]);
    });

    it('should return empty array for all falsy values', () => {
      expect(compact([0, false, '', null, undefined])).toEqual([]);
    });
  });

  describe('filterTruthy', () => {
    it('should filter to only truthy values', () => {
      expect(filterTruthy([0, 'hello', '', null, 42, false])).toEqual(['hello', 42]);
    });
  });

  describe('unique', () => {
    it('should remove duplicates from array', () => {
      expect(unique([1, 2, 2, 3, 1, 4])).toEqual([1, 2, 3, 4]);
    });

    it('should work with strings', () => {
      expect(unique(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
    });

    it('should preserve order', () => {
      expect(unique([3, 1, 2, 1, 3])).toEqual([3, 1, 2]);
    });

    it('should return empty array for empty input', () => {
      expect(unique([])).toEqual([]);
    });
  });

  describe('uniqueBy', () => {
    it('should remove duplicates based on key function', () => {
      const items = [{ id: 1, name: 'a' }, { id: 2, name: 'b' }, { id: 1, name: 'c' }];
      expect(uniqueBy(items, (x) => x.id)).toEqual([
        { id: 1, name: 'a' },
        { id: 2, name: 'b' },
      ]);
    });

    it('should work with string keys', () => {
      const items = [{ type: 'a' }, { type: 'b' }, { type: 'a' }];
      expect(uniqueBy(items, (x) => x.type)).toHaveLength(2);
    });
  });

  describe('partition', () => {
    it('should split array based on predicate', () => {
      const [evens, odds] = partition([1, 2, 3, 4, 5], (x) => x % 2 === 0);
      expect(evens).toEqual([2, 4]);
      expect(odds).toEqual([1, 3, 5]);
    });

    it('should handle all matching', () => {
      const [matching, nonMatching] = partition([2, 4, 6], (x) => x % 2 === 0);
      expect(matching).toEqual([2, 4, 6]);
      expect(nonMatching).toEqual([]);
    });

    it('should handle none matching', () => {
      const [matching, nonMatching] = partition([1, 3, 5], (x) => x % 2 === 0);
      expect(matching).toEqual([]);
      expect(nonMatching).toEqual([1, 3, 5]);
    });
  });

  describe('first', () => {
    it('should return first element', () => {
      expect(first([1, 2, 3])).toBe(1);
    });

    it('should return undefined for empty array', () => {
      expect(first([])).toBeUndefined();
    });
  });

  describe('last', () => {
    it('should return last element', () => {
      expect(last([1, 2, 3])).toBe(3);
    });

    it('should return undefined for empty array', () => {
      expect(last([])).toBeUndefined();
    });
  });
});
