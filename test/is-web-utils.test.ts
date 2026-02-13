import { describe, it, expect } from 'vitest';
import {
  // Form validation
  isPhoneNumber,
  isCreditCard,
  isStrongPassword,
  isPostalCode,
  // Length checks
  hasMinLength,
  hasMaxLength,
  hasLength,
  hasLengthBetween,
  // Object checks
  hasOwn,
  hasKey,
  // Array checks
  isArrayOf,
  hasMinItems,
  hasMaxItems,
  includes,
  // Environment checks (these depend on runtime)
  isBrowser,
  isNode,
  isWebWorker,
  isServer,
  // File checks
  hasFileExtension,
  isImageFile,
  isDocumentFile,
  isMimeType,
  isImageMimeType,
  // Comparison checks
  isEqual,
  isArrayEqual,
  isObjectEqual,
  hasChanged,
  getChangedKeys,
  hasKeysChanged,
  isShallowEqual,
  // String checks
  matches,
  startsWith,
  endsWith,
  contains,
  isOneOf,
  isNoneOf,
} from '../src/is/index.js';

// Form validation tests
describe('isPhoneNumber', () => {
  it('should return true for valid phone numbers', () => {
    expect(isPhoneNumber('+1234567890')).toBe(true);
    expect(isPhoneNumber('+14155552671')).toBe(true);
    expect(isPhoneNumber('1234567890')).toBe(true);
    expect(isPhoneNumber('+1-415-555-2671')).toBe(true);
  });

  it('should return false for invalid phone numbers', () => {
    expect(isPhoneNumber('123')).toBe(false);
    expect(isPhoneNumber('abc')).toBe(false);
    expect(isPhoneNumber('')).toBe(false);
    expect(isPhoneNumber(null as unknown as string)).toBe(false);
  });
});

describe('isCreditCard', () => {
  it('should return true for valid credit card numbers', () => {
    expect(isCreditCard('4111111111111111')).toBe(true); // Visa test number
    expect(isCreditCard('5500000000000004')).toBe(true); // MC test number
    expect(isCreditCard('371449635398431')).toBe(true); // Amex test number
    expect(isCreditCard('4111 1111 1111 1111')).toBe(true); // With spaces
    expect(isCreditCard('4111-1111-1111-1111')).toBe(true); // With dashes
  });

  it('should return false for invalid credit card numbers', () => {
    expect(isCreditCard('1234567890123456')).toBe(false);
    expect(isCreditCard('123')).toBe(false);
    expect(isCreditCard('')).toBe(false);
    expect(isCreditCard(null as unknown as string)).toBe(false);
  });
});

describe('isStrongPassword', () => {
  it('should return true for strong passwords', () => {
    expect(isStrongPassword('Abcd1234!')).toBe(true);
    expect(isStrongPassword('MyP@ssw0rd!')).toBe(true);
    expect(isStrongPassword('StrongP@ss1')).toBe(true);
  });

  it('should return false for weak passwords', () => {
    expect(isStrongPassword('password')).toBe(false);
    expect(isStrongPassword('12345678')).toBe(false);
    expect(isStrongPassword('ALLCAPS1!')).toBe(false);
    expect(isStrongPassword('nocaps1!')).toBe(false);
    expect(isStrongPassword('NoNumber!')).toBe(false);
  });

  it('should respect custom options', () => {
    expect(isStrongPassword('pass', { minLength: 4, requireUppercase: false, requireNumbers: false, requireSpecialChars: false })).toBe(true);
    expect(isStrongPassword('PASS1234', { requireLowercase: false, requireSpecialChars: false })).toBe(true);
  });
});

describe('isPostalCode', () => {
  it('should validate US postal codes', () => {
    expect(isPostalCode('12345', 'US')).toBe(true);
    expect(isPostalCode('12345-6789', 'US')).toBe(true);
    expect(isPostalCode('1234', 'US')).toBe(false);
  });

  it('should validate UK postal codes', () => {
    expect(isPostalCode('SW1A 1AA', 'UK')).toBe(true);
    expect(isPostalCode('EC1A 1BB', 'UK')).toBe(true);
    expect(isPostalCode('12345', 'UK')).toBe(false);
  });

  it('should validate CA postal codes', () => {
    expect(isPostalCode('K1A 0B1', 'CA')).toBe(true);
    expect(isPostalCode('A1A1A1', 'CA')).toBe(true);
    expect(isPostalCode('12345', 'CA')).toBe(false);
  });

  it('should validate DE postal codes', () => {
    expect(isPostalCode('10115', 'DE')).toBe(true);
    expect(isPostalCode('1234', 'DE')).toBe(false);
  });
});

// Length checks tests
describe('hasMinLength', () => {
  it('should return true when length is at least min', () => {
    expect(hasMinLength('hello', 3)).toBe(true);
    expect(hasMinLength([1, 2, 3], 2)).toBe(true);
    expect(hasMinLength('ab', 2)).toBe(true);
  });

  it('should return false when length is less than min', () => {
    expect(hasMinLength('hi', 3)).toBe(false);
    expect(hasMinLength([1], 2)).toBe(false);
  });
});

describe('hasMaxLength', () => {
  it('should return true when length is at most max', () => {
    expect(hasMaxLength('hi', 3)).toBe(true);
    expect(hasMaxLength([1, 2], 3)).toBe(true);
  });

  it('should return false when length exceeds max', () => {
    expect(hasMaxLength('hello', 3)).toBe(false);
    expect(hasMaxLength([1, 2, 3, 4], 3)).toBe(false);
  });
});

describe('hasLength', () => {
  it('should return true when length matches exactly', () => {
    expect(hasLength('abc', 3)).toBe(true);
    expect(hasLength([1, 2], 2)).toBe(true);
  });

  it('should return false when length does not match', () => {
    expect(hasLength('ab', 3)).toBe(false);
    expect(hasLength([1, 2, 3], 2)).toBe(false);
  });
});

describe('hasLengthBetween', () => {
  it('should return true when length is in range', () => {
    expect(hasLengthBetween('abc', 2, 5)).toBe(true);
    expect(hasLengthBetween([1, 2], 1, 3)).toBe(true);
  });

  it('should return false when length is out of range', () => {
    expect(hasLengthBetween('a', 2, 5)).toBe(false);
    expect(hasLengthBetween('abcdef', 2, 5)).toBe(false);
  });
});

// Object checks tests
describe('hasOwn', () => {
  it('should return true for own properties', () => {
    expect(hasOwn({ a: 1 }, 'a')).toBe(true);
    expect(hasOwn({ foo: 'bar' }, 'foo')).toBe(true);
  });

  it('should return false for missing or inherited properties', () => {
    expect(hasOwn({ a: 1 }, 'b')).toBe(false);
    expect(hasOwn({}, 'toString')).toBe(false);
  });
});

describe('hasKey', () => {
  it('should return true for any accessible key', () => {
    expect(hasKey({ a: 1 }, 'a')).toBe(true);
    expect(hasKey({ a: undefined }, 'a')).toBe(true);
  });

  it('should return false for missing keys', () => {
    expect(hasKey({ a: 1 }, 'b')).toBe(false);
  });
});

// Array checks tests
describe('isArrayOf', () => {
  it('should return true when all items match predicate', () => {
    expect(isArrayOf([1, 2, 3], (x) => typeof x === 'number')).toBe(true);
    expect(isArrayOf(['a', 'b'], (x) => typeof x === 'string')).toBe(true);
  });

  it('should return false when any item fails predicate', () => {
    expect(isArrayOf([1, '2', 3], (x) => typeof x === 'number')).toBe(false);
  });

  it('should return false for non-arrays', () => {
    expect(isArrayOf('not array' as unknown as unknown[], (x): x is unknown => true)).toBe(false);
  });
});

describe('hasMinItems', () => {
  it('should return true when array has at least min items', () => {
    expect(hasMinItems([1, 2, 3], 2)).toBe(true);
    expect(hasMinItems([1], 1)).toBe(true);
  });

  it('should return false when array has fewer items', () => {
    expect(hasMinItems([1], 2)).toBe(false);
    expect(hasMinItems([], 1)).toBe(false);
  });
});

describe('hasMaxItems', () => {
  it('should return true when array has at most max items', () => {
    expect(hasMaxItems([1, 2], 3)).toBe(true);
    expect(hasMaxItems([], 1)).toBe(true);
  });

  it('should return false when array exceeds max', () => {
    expect(hasMaxItems([1, 2, 3, 4], 3)).toBe(false);
  });
});

describe('includes', () => {
  it('should return true when array includes value', () => {
    expect(includes([1, 2, 3], 2)).toBe(true);
    expect(includes(['a', 'b'], 'a')).toBe(true);
  });

  it('should return false when array does not include value', () => {
    expect(includes([1, 2, 3], 4)).toBe(false);
  });
});

// Environment checks tests
describe('environment checks', () => {
  it('should detect Node.js environment', () => {
    expect(isNode()).toBe(true);
    expect(isBrowser()).toBe(false);
    expect(isWebWorker()).toBe(false);
  });

  it('should detect server environment', () => {
    expect(isServer()).toBe(true);
  });
});

// File checks tests
describe('hasFileExtension', () => {
  it('should return true for matching extension', () => {
    expect(hasFileExtension('image.png', ['png'])).toBe(true);
    expect(hasFileExtension('document.PDF', ['pdf'])).toBe(true);
  });

  it('should return false for non-matching extension', () => {
    expect(hasFileExtension('image.png', ['jpg'])).toBe(false);
  });
});

describe('isImageFile', () => {
  it('should return true for image files', () => {
    expect(isImageFile('photo.jpg')).toBe(true);
    expect(isImageFile('logo.png')).toBe(true);
    expect(isImageFile('icon.gif')).toBe(true);
    expect(isImageFile('image.webp')).toBe(true);
    expect(isImageFile('vector.svg')).toBe(true);
  });

  it('should return false for non-image files', () => {
    expect(isImageFile('document.pdf')).toBe(false);
    expect(isImageFile('script.js')).toBe(false);
  });
});

describe('isDocumentFile', () => {
  it('should return true for document files', () => {
    expect(isDocumentFile('doc.pdf')).toBe(true);
    expect(isDocumentFile('file.doc')).toBe(true);
    expect(isDocumentFile('file.txt')).toBe(true);
  });

  it('should return false for non-document files', () => {
    expect(isDocumentFile('image.png')).toBe(false);
  });
});

describe('isMimeType', () => {
  it('should return true for matching MIME type', () => {
    expect(isMimeType('text/plain', ['text/plain'])).toBe(true);
    expect(isMimeType('image/png', ['image/png'])).toBe(true);
  });

  it('should return false for non-matching MIME type', () => {
    expect(isMimeType('text/plain', ['image/png'])).toBe(false);
  });
});

describe('isImageMimeType', () => {
  it('should return true for image MIME types', () => {
    expect(isImageMimeType('image/png')).toBe(true);
    expect(isImageMimeType('image/jpeg')).toBe(true);
    expect(isImageMimeType('image/gif')).toBe(true);
  });

  it('should return false for non-image MIME types', () => {
    expect(isImageMimeType('text/plain')).toBe(false);
    expect(isImageMimeType('application/json')).toBe(false);
  });
});

// Comparison checks tests
describe('isEqual', () => {
  it('should return true for equal primitives', () => {
    expect(isEqual(1, 1)).toBe(true);
    expect(isEqual('a', 'a')).toBe(true);
    expect(isEqual(null, null)).toBe(true);
    expect(isEqual(undefined, undefined)).toBe(true);
  });

  it('should return true for deeply equal objects', () => {
    expect(isEqual({ a: 1 }, { a: 1 })).toBe(true);
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(isEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true);
  });

  it('should return false for non-equal values', () => {
    expect(isEqual(1, 2)).toBe(false);
    expect(isEqual({ a: 1 }, { a: 2 })).toBe(false);
    expect(isEqual([1, 2], [1, 2, 3])).toBe(false);
  });
});

describe('isArrayEqual', () => {
  it('should return true for equal arrays', () => {
    expect(isArrayEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(isArrayEqual([], [])).toBe(true);
  });

  it('should return false for non-equal arrays', () => {
    expect(isArrayEqual([1, 2], [1, 2, 3])).toBe(false);
    expect(isArrayEqual([1, 2], [2, 1])).toBe(false);
  });
});

describe('isObjectEqual', () => {
  it('should return true for equal objects', () => {
    expect(isObjectEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    expect(isObjectEqual({}, {})).toBe(true);
  });

  it('should return false for non-equal objects', () => {
    expect(isObjectEqual({ a: 1 }, { a: 2 })).toBe(false);
    expect(isObjectEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
  });
});

describe('hasChanged', () => {
  it('should return true when values differ', () => {
    expect(hasChanged(1, 2)).toBe(true);
    expect(hasChanged({ a: 1 }, { a: 2 })).toBe(true);
  });

  it('should return false when values are same', () => {
    expect(hasChanged(1, 1)).toBe(false);
    expect(hasChanged({ a: 1 }, { a: 1 })).toBe(false);
  });
});

describe('getChangedKeys', () => {
  it('should return keys that changed', () => {
    const result = getChangedKeys({ a: 1, b: 2 }, { a: 1, b: 3 });
    expect(result).toEqual(['b']);
  });

  it('should return added and removed keys', () => {
    const result = getChangedKeys({ a: 1 }, { b: 2 });
    expect(result.sort()).toEqual(['a', 'b']);
  });

  it('should return empty array when objects are equal', () => {
    expect(getChangedKeys({ a: 1 }, { a: 1 })).toEqual([]);
  });
});

describe('hasKeysChanged', () => {
  it('should return true when specified keys changed', () => {
    expect(hasKeysChanged({ a: 1, b: 2 }, { a: 1, b: 3 }, ['b'])).toBe(true);
  });

  it('should return false when specified keys are same', () => {
    expect(hasKeysChanged({ a: 1, b: 2 }, { a: 1, b: 3 }, ['a'])).toBe(false);
  });
});

describe('isShallowEqual', () => {
  it('should return true for shallow equal objects', () => {
    expect(isShallowEqual({ a: 1 }, { a: 1 })).toBe(true);
  });

  it('should return false for objects with nested differences', () => {
    const obj = { b: 1 };
    expect(isShallowEqual({ a: obj }, { a: { b: 1 } })).toBe(false);
  });

  it('should return true when same reference used', () => {
    const obj = { b: 1 };
    expect(isShallowEqual({ a: obj }, { a: obj })).toBe(true);
  });
});

// String checks tests
describe('matches', () => {
  it('should return true when string matches regex', () => {
    expect(matches('hello123', /\d+$/)).toBe(true);
    expect(matches('abc', /^[a-z]+$/)).toBe(true);
  });

  it('should return false when string does not match', () => {
    expect(matches('hello', /\d+$/)).toBe(false);
  });
});

describe('startsWith', () => {
  it('should return true when string starts with prefix', () => {
    expect(startsWith('hello world', 'hello')).toBe(true);
  });

  it('should return false when string does not start with prefix', () => {
    expect(startsWith('hello world', 'world')).toBe(false);
  });
});

describe('endsWith', () => {
  it('should return true when string ends with suffix', () => {
    expect(endsWith('hello world', 'world')).toBe(true);
  });

  it('should return false when string does not end with suffix', () => {
    expect(endsWith('hello world', 'hello')).toBe(false);
  });
});

describe('contains', () => {
  it('should return true when string contains substring', () => {
    expect(contains('hello world', 'lo wo')).toBe(true);
  });

  it('should return false when string does not contain substring', () => {
    expect(contains('hello world', 'xyz')).toBe(false);
  });
});

describe('isOneOf', () => {
  it('should return true when value is in allowed list', () => {
    expect(isOneOf('a', ['a', 'b', 'c'])).toBe(true);
    expect(isOneOf(1, [1, 2, 3])).toBe(true);
  });

  it('should return false when value is not in list', () => {
    expect(isOneOf('d', ['a', 'b', 'c'])).toBe(false);
  });
});

describe('isNoneOf', () => {
  it('should return true when value is not in disallowed list', () => {
    expect(isNoneOf('d', ['a', 'b', 'c'])).toBe(true);
  });

  it('should return false when value is in list', () => {
    expect(isNoneOf('a', ['a', 'b', 'c'])).toBe(false);
  });
});
