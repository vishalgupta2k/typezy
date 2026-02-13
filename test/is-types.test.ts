import { describe, it, expect } from 'vitest';
import {
  isObject,
  isPrimitive,
  isArrayLike,
  isTypedArray,
  isWeakMap,
  isWeakSet,
  isAsyncFunction,
  isGeneratorFunction,
} from '../src/is/index.js';

describe('isObject', () => {
  it('should return true for objects', () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(true);
    expect(isObject(new Date())).toBe(true);
    expect(isObject(/regex/)).toBe(true);
  });

  it('should return false for non-objects', () => {
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
    expect(isObject('string')).toBe(false);
    expect(isObject(123)).toBe(false);
  });
});

describe('isPrimitive', () => {
  it('should return true for primitives', () => {
    expect(isPrimitive('string')).toBe(true);
    expect(isPrimitive(123)).toBe(true);
    expect(isPrimitive(true)).toBe(true);
    expect(isPrimitive(null)).toBe(true);
    expect(isPrimitive(undefined)).toBe(true);
    expect(isPrimitive(Symbol('test'))).toBe(true);
    expect(isPrimitive(BigInt(123))).toBe(true);
  });

  it('should return false for non-primitives', () => {
    expect(isPrimitive({})).toBe(false);
    expect(isPrimitive([])).toBe(false);
    expect(isPrimitive(() => {})).toBe(false);
  });
});

describe('isArrayLike', () => {
  it('should return true for array-like objects', () => {
    expect(isArrayLike([])).toBe(true);
    expect(isArrayLike('string')).toBe(true);
    expect(isArrayLike({ length: 0 })).toBe(true);
    expect(isArrayLike({ 0: 'a', 1: 'b', length: 2 })).toBe(true);
  });

  it('should return false for non-array-like values', () => {
    expect(isArrayLike({})).toBe(false);
    expect(isArrayLike(null)).toBe(false);
    expect(isArrayLike(undefined)).toBe(false);
    expect(isArrayLike(() => {})).toBe(false);
    expect(isArrayLike({ length: -1 })).toBe(false);
  });
});

describe('isTypedArray', () => {
  it('should return true for typed arrays', () => {
    expect(isTypedArray(new Int8Array())).toBe(true);
    expect(isTypedArray(new Uint8Array())).toBe(true);
    expect(isTypedArray(new Float32Array())).toBe(true);
    expect(isTypedArray(new BigInt64Array())).toBe(true);
  });

  it('should return false for non-typed arrays', () => {
    expect(isTypedArray([])).toBe(false);
    expect(isTypedArray(new ArrayBuffer(8))).toBe(false);
    expect(isTypedArray(new DataView(new ArrayBuffer(8)))).toBe(false);
  });
});

describe('isWeakMap', () => {
  it('should return true for WeakMap', () => {
    expect(isWeakMap(new WeakMap())).toBe(true);
  });

  it('should return false for non-WeakMap', () => {
    expect(isWeakMap(new Map())).toBe(false);
    expect(isWeakMap({})).toBe(false);
  });
});

describe('isWeakSet', () => {
  it('should return true for WeakSet', () => {
    expect(isWeakSet(new WeakSet())).toBe(true);
  });

  it('should return false for non-WeakSet', () => {
    expect(isWeakSet(new Set())).toBe(false);
    expect(isWeakSet([])).toBe(false);
  });
});

describe('isAsyncFunction', () => {
  it('should return true for async functions', () => {
    expect(isAsyncFunction(async () => {})).toBe(true);
    expect(isAsyncFunction(async function () {})).toBe(true);
  });

  it('should return false for non-async functions', () => {
    expect(isAsyncFunction(() => {})).toBe(false);
    expect(isAsyncFunction(function () {})).toBe(false);
    expect(isAsyncFunction(() => Promise.resolve())).toBe(false);
  });
});

describe('isGeneratorFunction', () => {
  it('should return true for generator functions', () => {
    expect(isGeneratorFunction(function* () {})).toBe(true);
    expect(isGeneratorFunction(function* gen() { yield 1; })).toBe(true);
  });

  it('should return false for non-generator functions', () => {
    expect(isGeneratorFunction(() => {})).toBe(false);
    expect(isGeneratorFunction(async function () {})).toBe(false);
  });
});
