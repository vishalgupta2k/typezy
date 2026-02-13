import { describe, it, expect } from 'vitest';
import {
  isURL,
  isEmail,
  isFunction,
  isPromise,
  isIterable,
  isEmpty,
  isNonEmptyString,
  isInteger,
  isSafeInteger,
} from '../src/is/index.js';

describe('isURL', () => {
  it('should return true for valid URLs', () => {
    expect(isURL('https://example.com')).toBe(true);
    expect(isURL('http://localhost:3000')).toBe(true);
    expect(isURL('ftp://ftp.example.com')).toBe(true);
    expect(isURL('https://example.com/path?query=1')).toBe(true);
  });

  it('should return false for invalid URLs', () => {
    expect(isURL('not-a-url')).toBe(false);
    expect(isURL('example.com')).toBe(false);
    expect(isURL('')).toBe(false);
    expect(isURL(null)).toBe(false);
    expect(isURL(123)).toBe(false);
  });
});

describe('isEmail', () => {
  it('should return true for valid emails', () => {
    expect(isEmail('test@example.com')).toBe(true);
    expect(isEmail('user.name@domain.co.uk')).toBe(true);
    expect(isEmail('user+tag@example.com')).toBe(true);
  });

  it('should return false for invalid emails', () => {
    expect(isEmail('not-an-email')).toBe(false);
    expect(isEmail('@example.com')).toBe(false);
    expect(isEmail('user@')).toBe(false);
    expect(isEmail('')).toBe(false);
    expect(isEmail(null)).toBe(false);
  });
});

describe('isFunction', () => {
  it('should return true for functions', () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(function () {})).toBe(true);
    expect(isFunction(async () => {})).toBe(true);
    // eslint-disable-next-line @typescript-eslint/no-extraneous-class
    expect(isFunction(class TestClass {})).toBe(true);
  });

  it('should return false for non-functions', () => {
    expect(isFunction({})).toBe(false);
    expect(isFunction(null)).toBe(false);
    expect(isFunction('function')).toBe(false);
  });
});

describe('isPromise', () => {
  it('should return true for promises', () => {
    expect(isPromise(Promise.resolve())).toBe(true);
    expect(isPromise(new Promise(() => {}))).toBe(true);
  });

  it('should return false for non-promises', () => {
    expect(isPromise({})).toBe(false);
    expect(isPromise(null)).toBe(false);
    expect(isPromise(() => {})).toBe(false);
  });
});

describe('isIterable', () => {
  it('should return true for iterables', () => {
    expect(isIterable([])).toBe(true);
    expect(isIterable('string')).toBe(true);
    expect(isIterable(new Map())).toBe(true);
    expect(isIterable(new Set())).toBe(true);
  });

  it('should return false for non-iterables', () => {
    expect(isIterable({})).toBe(false);
    expect(isIterable(123)).toBe(false);
    expect(isIterable(null)).toBe(false);
    expect(isIterable(undefined)).toBe(false);
  });
});

describe('isEmpty', () => {
  it('should return true for empty values', () => {
    expect(isEmpty('')).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty(new Map())).toBe(true);
    expect(isEmpty(new Set())).toBe(true);
  });

  it('should return false for non-empty values', () => {
    expect(isEmpty('hello')).toBe(false);
    expect(isEmpty([1])).toBe(false);
    expect(isEmpty({ a: 1 })).toBe(false);
    expect(isEmpty(new Map([['key', 'value']]))).toBe(false);
    expect(isEmpty(new Set([1]))).toBe(false);
  });

  it('should return false for non-empty primitives', () => {
    expect(isEmpty(0)).toBe(false);
    expect(isEmpty(false)).toBe(false);
  });
});

describe('isNonEmptyString', () => {
  it('should return true for non-empty strings', () => {
    expect(isNonEmptyString('hello')).toBe(true);
    expect(isNonEmptyString(' ')).toBe(true);
  });

  it('should return false for empty strings', () => {
    expect(isNonEmptyString('')).toBe(false);
  });

  it('should return false for non-strings', () => {
    expect(isNonEmptyString(123)).toBe(false);
    expect(isNonEmptyString(null)).toBe(false);
  });
});

describe('isInteger', () => {
  it('should return true for integers', () => {
    expect(isInteger(0)).toBe(true);
    expect(isInteger(1)).toBe(true);
    expect(isInteger(-1)).toBe(true);
    expect(isInteger(1000000)).toBe(true);
  });

  it('should return false for non-integers', () => {
    expect(isInteger(3.14)).toBe(false);
    expect(isInteger(Number.NaN)).toBe(false);
    expect(isInteger(Infinity)).toBe(false);
    expect(isInteger('1')).toBe(false);
  });
});

describe('isSafeInteger', () => {
  it('should return true for safe integers', () => {
    expect(isSafeInteger(0)).toBe(true);
    expect(isSafeInteger(Number.MAX_SAFE_INTEGER)).toBe(true);
    expect(isSafeInteger(Number.MIN_SAFE_INTEGER)).toBe(true);
  });

  it('should return false for unsafe integers', () => {
    expect(isSafeInteger(Number.MAX_SAFE_INTEGER + 1)).toBe(false);
    expect(isSafeInteger(Number.MIN_SAFE_INTEGER - 1)).toBe(false);
  });

  it('should return false for non-integers', () => {
    expect(isSafeInteger(3.14)).toBe(false);
    expect(isSafeInteger('1')).toBe(false);
  });
});
