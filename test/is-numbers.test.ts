import { describe, it, expect } from 'vitest';
import {
  isPositive,
  isNegative,
  isEven,
  isOdd,
  isInRange,
} from '../src/is/index.js';

describe('isPositive', () => {
  it('should return true for positive numbers', () => {
    expect(isPositive(1)).toBe(true);
    expect(isPositive(0.001)).toBe(true);
    expect(isPositive(Infinity)).toBe(true);
  });

  it('should return false for non-positive numbers', () => {
    expect(isPositive(0)).toBe(false);
    expect(isPositive(-1)).toBe(false);
    expect(isPositive(-Infinity)).toBe(false);
  });

  it('should return false for non-numbers', () => {
    expect(isPositive('1')).toBe(false);
    expect(isPositive(null)).toBe(false);
  });
});

describe('isNegative', () => {
  it('should return true for negative numbers', () => {
    expect(isNegative(-1)).toBe(true);
    expect(isNegative(-0.001)).toBe(true);
    expect(isNegative(-Infinity)).toBe(true);
  });

  it('should return false for non-negative numbers', () => {
    expect(isNegative(0)).toBe(false);
    expect(isNegative(1)).toBe(false);
    expect(isNegative(Infinity)).toBe(false);
  });

  it('should return false for non-numbers', () => {
    expect(isNegative('-1')).toBe(false);
    expect(isNegative(null)).toBe(false);
  });
});

describe('isEven', () => {
  it('should return true for even integers', () => {
    expect(isEven(0)).toBe(true);
    expect(isEven(2)).toBe(true);
    expect(isEven(-4)).toBe(true);
    expect(isEven(100)).toBe(true);
  });

  it('should return false for odd integers', () => {
    expect(isEven(1)).toBe(false);
    expect(isEven(-3)).toBe(false);
    expect(isEven(99)).toBe(false);
  });

  it('should return false for non-integers', () => {
    expect(isEven(2.5)).toBe(false);
    expect(isEven('2')).toBe(false);
  });
});

describe('isOdd', () => {
  it('should return true for odd integers', () => {
    expect(isOdd(1)).toBe(true);
    expect(isOdd(-3)).toBe(true);
    expect(isOdd(99)).toBe(true);
  });

  it('should return false for even integers', () => {
    expect(isOdd(0)).toBe(false);
    expect(isOdd(2)).toBe(false);
    expect(isOdd(-4)).toBe(false);
  });

  it('should return false for non-integers', () => {
    expect(isOdd(1.5)).toBe(false);
    expect(isOdd('1')).toBe(false);
  });
});

describe('isInRange', () => {
  it('should return true for numbers in range', () => {
    expect(isInRange(5, 0, 10)).toBe(true);
    expect(isInRange(0, 0, 10)).toBe(true);
    expect(isInRange(10, 0, 10)).toBe(true);
    expect(isInRange(-5, -10, 0)).toBe(true);
  });

  it('should return false for numbers outside range', () => {
    expect(isInRange(11, 0, 10)).toBe(false);
    expect(isInRange(-1, 0, 10)).toBe(false);
  });

  it('should return false for non-numbers', () => {
    expect(isInRange('5', 0, 10)).toBe(false);
    expect(isInRange(null, 0, 10)).toBe(false);
  });
});
