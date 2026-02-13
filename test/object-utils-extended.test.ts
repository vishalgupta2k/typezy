import { describe, it, expect } from 'vitest';
import {
  pick,
  omit,
  deepMerge,
  flattenObject,
  mapKeys,
  mapValues,
} from '../src/utils/objectUtils.js';

describe('pick', () => {
  it('should pick specified keys', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 });
  });

  it('should ignore non-existent keys', () => {
    const obj = { a: 1, b: 2 };
    expect(pick(obj, ['a', 'c' as keyof typeof obj])).toEqual({ a: 1 });
  });

  it('should return empty object for empty keys', () => {
    expect(pick({ a: 1 }, [])).toEqual({});
  });
});

describe('omit', () => {
  it('should omit specified keys', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(omit(obj, ['b'])).toEqual({ a: 1, c: 3 });
  });

  it('should return full object for empty keys', () => {
    const obj = { a: 1, b: 2 };
    expect(omit(obj, [])).toEqual({ a: 1, b: 2 });
  });
});

describe('deepMerge', () => {
  it('should deeply merge objects', () => {
    const target = { a: { b: 1, c: 2 }, d: 3 };
    const source = { a: { b: 10 } };
    expect(deepMerge(target, source)).toEqual({ a: { b: 10, c: 2 }, d: 3 });
  });

  it('should replace non-object values', () => {
    const target = { a: 1 };
    const source = { a: 2 };
    expect(deepMerge(target, source)).toEqual({ a: 2 });
  });

  it('should add new keys', () => {
    const target = { a: 1 };
    const source = { b: 2 };
    expect(deepMerge(target, source)).toEqual({ a: 1, b: 2 });
  });

  it('should not mutate the original object', () => {
    const target = { a: { b: 1 } };
    const result = deepMerge(target, { a: { b: 2 } });
    expect(target.a.b).toBe(1);
    expect(result.a.b).toBe(2);
  });
});

describe('flattenObject', () => {
  it('should flatten nested objects', () => {
    const obj = { a: { b: 1, c: { d: 2 } } };
    expect(flattenObject(obj)).toEqual({ 'a.b': 1, 'a.c.d': 2 });
  });

  it('should handle flat objects', () => {
    expect(flattenObject({ a: 1, b: 2 })).toEqual({ a: 1, b: 2 });
  });

  it('should support custom separator', () => {
    const obj = { a: { b: 1 } };
    expect(flattenObject(obj, '/')).toEqual({ 'a/b': 1 });
  });

  it('should handle arrays as values', () => {
    const obj = { a: [1, 2, 3] };
    expect(flattenObject(obj)).toEqual({ a: [1, 2, 3] });
  });
});

describe('mapKeys', () => {
  it('should transform keys', () => {
    expect(mapKeys({ a: 1, b: 2 }, (k) => k.toUpperCase())).toEqual({ A: 1, B: 2 });
  });
});

describe('mapValues', () => {
  it('should transform values', () => {
    expect(mapValues({ a: 1, b: 2 }, (v) => v * 2)).toEqual({ a: 2, b: 4 });
  });

  it('should pass key to transform function', () => {
    expect(mapValues({ a: 1, b: 2 }, (v, k) => `${k}:${v}`)).toEqual({
      a: 'a:1',
      b: 'b:2',
    });
  });
});
