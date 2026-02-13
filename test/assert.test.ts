import { describe, it, expect } from 'vitest';
import {
  assertString,
  assertNumber,
  assertBoolean,
  assertArray,
  assertPlainObject,
  assertFunction,
  assertDate,
  assertNonEmptyString,
  assertNonEmptyArray,
  assertInteger,
  assertDefined,
  assertEmail,
  assertURL,
  AssertionError,
} from '../src/assert/index.js';

describe('assertString', () => {
  it('should not throw for strings', () => {
    expect(() => assertString('hello')).not.toThrow();
    expect(() => assertString('')).not.toThrow();
  });

  it('should throw AssertionError for non-strings', () => {
    expect(() => assertString(123)).toThrow(AssertionError);
    expect(() => assertString(null)).toThrow(AssertionError);
  });

  it('should use custom error message', () => {
    expect(() => assertString(123, 'Custom message')).toThrow('Custom message');
  });
});

describe('assertNumber', () => {
  it('should not throw for numbers', () => {
    expect(() => assertNumber(123)).not.toThrow();
    expect(() => assertNumber(0)).not.toThrow();
    expect(() => assertNumber(-1.5)).not.toThrow();
  });

  it('should throw AssertionError for non-numbers', () => {
    expect(() => assertNumber('123')).toThrow(AssertionError);
    expect(() => assertNumber(Number.NaN)).toThrow(AssertionError);
  });
});

describe('assertBoolean', () => {
  it('should not throw for booleans', () => {
    expect(() => assertBoolean(true)).not.toThrow();
    expect(() => assertBoolean(false)).not.toThrow();
  });

  it('should throw AssertionError for non-booleans', () => {
    expect(() => assertBoolean(0)).toThrow(AssertionError);
    expect(() => assertBoolean('true')).toThrow(AssertionError);
  });
});

describe('assertArray', () => {
  it('should not throw for arrays', () => {
    expect(() => assertArray([])).not.toThrow();
    expect(() => assertArray([1, 2, 3])).not.toThrow();
  });

  it('should throw AssertionError for non-arrays', () => {
    expect(() => assertArray({})).toThrow(AssertionError);
    expect(() => assertArray('array')).toThrow(AssertionError);
  });
});

describe('assertPlainObject', () => {
  it('should not throw for plain objects', () => {
    expect(() => assertPlainObject({})).not.toThrow();
    expect(() => assertPlainObject({ a: 1 })).not.toThrow();
  });

  it('should throw AssertionError for non-plain objects', () => {
    expect(() => assertPlainObject([])).toThrow(AssertionError);
    expect(() => assertPlainObject(new Date())).toThrow(AssertionError);
    expect(() => assertPlainObject(null)).toThrow(AssertionError);
  });
});

describe('assertFunction', () => {
  it('should not throw for functions', () => {
    expect(() => assertFunction(() => {})).not.toThrow();
    expect(() => assertFunction(function () {})).not.toThrow();
  });

  it('should throw AssertionError for non-functions', () => {
    expect(() => assertFunction({})).toThrow(AssertionError);
    expect(() => assertFunction(null)).toThrow(AssertionError);
  });
});

describe('assertDate', () => {
  it('should not throw for Date objects', () => {
    expect(() => assertDate(new Date())).not.toThrow();
  });

  it('should throw AssertionError for non-Date values', () => {
    expect(() => assertDate('2024-01-01')).toThrow(AssertionError);
    expect(() => assertDate(null)).toThrow(AssertionError);
  });
});

describe('assertNonEmptyString', () => {
  it('should not throw for non-empty strings', () => {
    expect(() => assertNonEmptyString('hello')).not.toThrow();
  });

  it('should throw AssertionError for empty strings', () => {
    expect(() => assertNonEmptyString('')).toThrow(AssertionError);
  });

  it('should throw AssertionError for non-strings', () => {
    expect(() => assertNonEmptyString(123)).toThrow(AssertionError);
  });
});

describe('assertNonEmptyArray', () => {
  it('should not throw for non-empty arrays', () => {
    expect(() => assertNonEmptyArray([1])).not.toThrow();
    expect(() => assertNonEmptyArray([1, 2, 3])).not.toThrow();
  });

  it('should throw AssertionError for empty arrays', () => {
    expect(() => assertNonEmptyArray([])).toThrow(AssertionError);
  });

  it('should throw AssertionError for non-arrays', () => {
    expect(() => assertNonEmptyArray({})).toThrow(AssertionError);
  });
});

describe('assertInteger', () => {
  it('should not throw for integers', () => {
    expect(() => assertInteger(0)).not.toThrow();
    expect(() => assertInteger(123)).not.toThrow();
    expect(() => assertInteger(-456)).not.toThrow();
  });

  it('should throw AssertionError for non-integers', () => {
    expect(() => assertInteger(3.14)).toThrow(AssertionError);
    expect(() => assertInteger('123')).toThrow(AssertionError);
  });
});

describe('assertDefined', () => {
  it('should not throw for defined values', () => {
    expect(() => assertDefined(0)).not.toThrow();
    expect(() => assertDefined('')).not.toThrow();
    expect(() => assertDefined(false)).not.toThrow();
  });

  it('should throw AssertionError for null and undefined', () => {
    expect(() => assertDefined(null)).toThrow(AssertionError);
    expect(() => assertDefined(undefined)).toThrow(AssertionError);
  });
});

describe('assertEmail', () => {
  it('should not throw for valid emails', () => {
    expect(() => assertEmail('test@example.com')).not.toThrow();
  });

  it('should throw AssertionError for invalid emails', () => {
    expect(() => assertEmail('not-an-email')).toThrow(AssertionError);
    expect(() => assertEmail(null)).toThrow(AssertionError);
  });
});

describe('assertURL', () => {
  it('should not throw for valid URLs', () => {
    expect(() => assertURL('https://example.com')).not.toThrow();
  });

  it('should throw AssertionError for invalid URLs', () => {
    expect(() => assertURL('not-a-url')).toThrow(AssertionError);
    expect(() => assertURL(null)).toThrow(AssertionError);
  });
});

describe('AssertionError', () => {
  it('should have correct name', () => {
    const error = new AssertionError('test message');
    expect(error.name).toBe('AssertionError');
  });

  it('should have correct message', () => {
    const error = new AssertionError('test message');
    expect(error.message).toBe('test message');
  });

  it('should be instance of Error', () => {
    const error = new AssertionError('test');
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(AssertionError);
  });
});
