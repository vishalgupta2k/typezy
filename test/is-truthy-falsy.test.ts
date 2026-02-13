import { describe, it, expect } from 'vitest';
import { isTruthy, isFalsy } from '../src/is/index.js';

describe('isTruthy', () => {
  it('should return true for truthy values', () => {
    expect(isTruthy(1)).toBe(true);
    expect(isTruthy('hello')).toBe(true);
    expect(isTruthy(true)).toBe(true);
    expect(isTruthy([])).toBe(true);
    expect(isTruthy({})).toBe(true);
    expect(isTruthy(() => {})).toBe(true);
    expect(isTruthy(-1)).toBe(true);
    expect(isTruthy(Infinity)).toBe(true);
  });

  it('should return false for falsy values', () => {
    expect(isTruthy(0)).toBe(false);
    expect(isTruthy('')).toBe(false);
    expect(isTruthy(false)).toBe(false);
    expect(isTruthy(null)).toBe(false);
    expect(isTruthy(undefined)).toBe(false);
    expect(isTruthy(Number.NaN)).toBe(false);
  });
});

describe('isFalsy', () => {
  it('should return true for falsy values', () => {
    expect(isFalsy(0)).toBe(true);
    expect(isFalsy('')).toBe(true);
    expect(isFalsy(false)).toBe(true);
    expect(isFalsy(null)).toBe(true);
    expect(isFalsy(undefined)).toBe(true);
    expect(isFalsy(Number.NaN)).toBe(true);
  });

  it('should return false for truthy values', () => {
    expect(isFalsy(1)).toBe(false);
    expect(isFalsy('hello')).toBe(false);
    expect(isFalsy(true)).toBe(false);
    expect(isFalsy([])).toBe(false);
    expect(isFalsy({})).toBe(false);
  });
});
