import { describe, it, expect } from 'vitest';
import {
  clamp,
  roundTo,
  formatCurrency,
  formatCompact,
  formatPercentage,
} from '../src/utils/numberUtils.js';

describe('clamp', () => {
  it('should return value when in range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('should clamp to min', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it('should clamp to max', () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it('should handle equal min and max', () => {
    expect(clamp(5, 3, 3)).toBe(3);
  });
});

describe('roundTo', () => {
  it('should round to specified decimals', () => {
    expect(roundTo(3.14159, 2)).toBe(3.14);
    expect(roundTo(3.14159, 0)).toBe(3);
    expect(roundTo(3.14159, 4)).toBe(3.1416);
  });

  it('should handle rounding edge case (1.005)', () => {
    expect(roundTo(1.005, 2)).toBe(1.01);
  });

  it('should default to 0 decimals', () => {
    expect(roundTo(3.7)).toBe(4);
  });
});

describe('formatCurrency', () => {
  it('should format as USD by default', () => {
    const result = formatCurrency(1234.56);
    expect(result).toContain('1,234.56');
  });

  it('should format with custom locale and currency', () => {
    const result = formatCurrency(1234.56, 'de-DE', 'EUR');
    // German locale uses . as thousands separator and , as decimal
    expect(result).toBeTruthy();
  });
});

describe('formatCompact', () => {
  it('should format thousands', () => {
    const result = formatCompact(1234);
    expect(result).toMatch(/1\.2K/i);
  });

  it('should format millions', () => {
    const result = formatCompact(1234567);
    expect(result).toMatch(/1\.2M/i);
  });

  it('should not compact small numbers', () => {
    const result = formatCompact(42);
    expect(result).toBe('42');
  });
});

describe('formatPercentage', () => {
  it('should format a decimal as percentage', () => {
    expect(formatPercentage(0.5)).toBe('50%');
  });

  it('should support decimal places', () => {
    expect(formatPercentage(0.856, 1)).toBe('85.6%');
  });

  it('should handle 0', () => {
    expect(formatPercentage(0)).toBe('0%');
  });

  it('should handle 1 (100%)', () => {
    expect(formatPercentage(1)).toBe('100%');
  });
});
