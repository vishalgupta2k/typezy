import { describe, it, expect } from 'vitest';
import {
  isSymbol,
  isBigInt,
  isRegExp,
  isError,
  isMap,
  isSet,
  isFiniteNumber,
  isNaNValue,
} from '../src/is/index.js';

describe('isSymbol', () => {
  it('should return true for symbols', () => {
    expect(isSymbol(Symbol())).toBe(true);
    expect(isSymbol(Symbol('test'))).toBe(true);
    expect(isSymbol(Symbol.for('global'))).toBe(true);
  });

  it('should return false for non-symbols', () => {
    expect(isSymbol('symbol')).toBe(false);
    expect(isSymbol(null)).toBe(false);
    expect(isSymbol(undefined)).toBe(false);
  });
});

describe('isBigInt', () => {
  it('should return true for bigints', () => {
    expect(isBigInt(BigInt(0))).toBe(true);
    expect(isBigInt(BigInt(123))).toBe(true);
    expect(isBigInt(1234567890123456789012345678901234567890n)).toBe(true);
  });

  it('should return false for non-bigints', () => {
    expect(isBigInt(123)).toBe(false);
    expect(isBigInt('123')).toBe(false);
    expect(isBigInt(null)).toBe(false);
  });
});

describe('isRegExp', () => {
  it('should return true for regular expressions', () => {
    expect(isRegExp(/test/)).toBe(true);
    expect(isRegExp(/test/)).toBe(true);
    expect(isRegExp(/test/gi)).toBe(true);
  });

  it('should return false for non-regular expressions', () => {
    expect(isRegExp('/test/')).toBe(false);
    expect(isRegExp(null)).toBe(false);
    expect(isRegExp({})).toBe(false);
  });
});

describe('isError', () => {
  it('should return true for Error objects', () => {
    expect(isError(new Error('test error'))).toBe(true);
    expect(isError(new TypeError('type error'))).toBe(true);
    expect(isError(new RangeError('range error'))).toBe(true);
    expect(isError(new SyntaxError('syntax error'))).toBe(true);
  });

  it('should return false for non-Error values', () => {
    expect(isError({ message: 'error' })).toBe(false);
    expect(isError('error')).toBe(false);
    expect(isError(null)).toBe(false);
  });
});

describe('isMap', () => {
  it('should return true for Map objects', () => {
    expect(isMap(new Map())).toBe(true);
    expect(isMap(new Map([['key', 'value']]))).toBe(true);
  });

  it('should return false for non-Map values', () => {
    expect(isMap({})).toBe(false);
    expect(isMap(new WeakMap())).toBe(false);
    expect(isMap(null)).toBe(false);
  });
});

describe('isSet', () => {
  it('should return true for Set objects', () => {
    expect(isSet(new Set())).toBe(true);
    expect(isSet(new Set([1, 2, 3]))).toBe(true);
  });

  it('should return false for non-Set values', () => {
    expect(isSet([])).toBe(false);
    expect(isSet(new WeakSet())).toBe(false);
    expect(isSet(null)).toBe(false);
  });
});

describe('isFiniteNumber', () => {
  it('should return true for finite numbers', () => {
    expect(isFiniteNumber(0)).toBe(true);
    expect(isFiniteNumber(123)).toBe(true);
    expect(isFiniteNumber(-456.78)).toBe(true);
  });

  it('should return false for infinite numbers', () => {
    expect(isFiniteNumber(Infinity)).toBe(false);
    expect(isFiniteNumber(-Infinity)).toBe(false);
  });

  it('should return false for NaN and non-numbers', () => {
    expect(isFiniteNumber(Number.NaN)).toBe(false);
    expect(isFiniteNumber('123')).toBe(false);
    expect(isFiniteNumber(null)).toBe(false);
  });
});

describe('isNaNValue', () => {
  it('should return true for NaN', () => {
    expect(isNaNValue(Number.NaN)).toBe(true);
    expect(isNaNValue(Number.NaN)).toBe(true);
  });

  it('should return false for non-NaN values', () => {
    expect(isNaNValue(123)).toBe(false);
    expect(isNaNValue(Infinity)).toBe(false);
    expect(isNaNValue('NaN')).toBe(false);
    expect(isNaNValue(undefined)).toBe(false);
  });
});
