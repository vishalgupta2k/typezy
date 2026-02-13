import { describe, it, expect } from 'vitest';
import { maskString, pluralize } from '../src/utils/displayUtils.js';
import { cx } from '../src/utils/classNameUtils.js';
import { isDataURI, isCSSColor } from '../src/is/additionalChecks.js';

describe('maskString', () => {
  it('should mask middle characters', () => {
    expect(maskString('4242424242424242', 0, 4)).toBe('••••••••••••4242');
  });

  it('should show start characters', () => {
    expect(maskString('john@example.com', 1, 0, '*')).toBe('j***************');
  });

  it('should return original if visible chars exceed length', () => {
    expect(maskString('abc', 2, 2)).toBe('abc');
  });

  it('should return empty string for empty input', () => {
    expect(maskString('')).toBe('');
  });

  it('should return empty for non-string input', () => {
    expect(maskString(null as unknown as string)).toBe('');
  });
});

describe('pluralize', () => {
  it('should return singular for count of 1', () => {
    expect(pluralize(1, 'item')).toBe('1 item');
  });

  it('should return plural for other counts', () => {
    expect(pluralize(5, 'item')).toBe('5 items');
    expect(pluralize(0, 'item')).toBe('0 items');
  });

  it('should accept custom plural form', () => {
    expect(pluralize(3, 'child', 'children')).toBe('3 children');
    expect(pluralize(1, 'child', 'children')).toBe('1 child');
  });
});

describe('cx', () => {
  it('should join class names', () => {
    expect(cx('btn', 'btn-primary')).toBe('btn btn-primary');
  });

  it('should handle conditional classes', () => {
    const isActive = true;
    const isDisabled = false;
    expect(cx('btn', isActive && 'btn-active', isDisabled && 'btn-disabled')).toBe('btn btn-active');
  });

  it('should handle object syntax', () => {
    expect(cx('btn', { 'btn-active': true, 'btn-disabled': false })).toBe('btn btn-active');
  });

  it('should filter out falsy values', () => {
    expect(cx('text', undefined, null, false, '', 'bold')).toBe('text bold');
  });

  it('should return empty string for no truthy args', () => {
    expect(cx(false, undefined, null)).toBe('');
  });
});

describe('isDataURI', () => {
  it('should return true for valid data URIs', () => {
    expect(isDataURI('data:text/plain;base64,SGVsbG8=')).toBe(true);
    expect(isDataURI('data:image/png;base64,iVBOR')).toBe(true);
  });

  it('should return false for non data URIs', () => {
    expect(isDataURI('https://example.com')).toBe(false);
    expect(isDataURI('not-a-uri')).toBe(false);
  });

  it('should return false for non-strings', () => {
    expect(isDataURI(null)).toBe(false);
    expect(isDataURI(123)).toBe(false);
  });
});

describe('isCSSColor', () => {
  it('should return true for hex colors', () => {
    expect(isCSSColor('#fff')).toBe(true);
    expect(isCSSColor('#ff0000')).toBe(true);
    expect(isCSSColor('#ff000080')).toBe(true);
  });

  it('should return true for rgb colors', () => {
    expect(isCSSColor('rgb(255, 0, 0)')).toBe(true);
    expect(isCSSColor('rgba(255, 0, 0, 0.5)')).toBe(true);
  });

  it('should return true for hsl colors', () => {
    expect(isCSSColor('hsl(120, 100%, 50%)')).toBe(true);
    expect(isCSSColor('hsla(120, 100%, 50%, 0.5)')).toBe(true);
  });

  it('should return true for named colors', () => {
    expect(isCSSColor('red')).toBe(true);
    expect(isCSSColor('transparent')).toBe(true);
    expect(isCSSColor('rebeccapurple')).toBe(true);
  });

  it('should return false for invalid colors', () => {
    expect(isCSSColor('not-a-color')).toBe(false);
    expect(isCSSColor('#xyz')).toBe(false);
  });

  it('should return false for non-strings', () => {
    expect(isCSSColor(null)).toBe(false);
    expect(isCSSColor(123)).toBe(false);
  });
});
