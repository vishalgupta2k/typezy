import { describe, it, expect } from 'vitest';
import {
  isJSON,
  isUUID,
  isHexColor,
  isIPv4,
  isIPv6,
  isBlank,
  isAlpha,
  isAlphanumeric,
  isNumericString,
  isDateString,
  isLowerCase,
  isUpperCase,
  isBase64,
  isJWT,
  isSlug,
  isSemVer,
} from '../src/is/index.js';

describe('isJSON', () => {
  it('should return true for valid JSON strings', () => {
    expect(isJSON('{}')).toBe(true);
    expect(isJSON('[]')).toBe(true);
    expect(isJSON('{"name":"test"}')).toBe(true);
    expect(isJSON('"string"')).toBe(true);
    expect(isJSON('123')).toBe(true);
    expect(isJSON('true')).toBe(true);
    expect(isJSON('null')).toBe(true);
  });

  it('should return false for invalid JSON strings', () => {
    expect(isJSON('{')).toBe(false);
    expect(isJSON("{'name':'test'}")).toBe(false);
    expect(isJSON('undefined')).toBe(false);
  });

  it('should return false for non-strings', () => {
    expect(isJSON(null)).toBe(false);
    expect(isJSON({})).toBe(false);
  });
});

describe('isUUID', () => {
  it('should return true for valid UUIDs', () => {
    expect(isUUID('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
    expect(isUUID('6ba7b810-9dad-11d1-80b4-00c04fd430c8')).toBe(true);
    expect(isUUID('00000000-0000-0000-0000-000000000000')).toBe(true);
  });

  it('should return false for invalid UUIDs', () => {
    expect(isUUID('not-a-uuid')).toBe(false);
    expect(isUUID('550e8400-e29b-41d4-a716')).toBe(false);
    expect(isUUID('')).toBe(false);
  });
});

describe('isHexColor', () => {
  it('should return true for valid hex colors', () => {
    expect(isHexColor('#fff')).toBe(true);
    expect(isHexColor('#ffffff')).toBe(true);
    expect(isHexColor('fff')).toBe(true);
    expect(isHexColor('FFFFFF')).toBe(true);
    expect(isHexColor('#ABC123')).toBe(true);
  });

  it('should return false for invalid hex colors', () => {
    expect(isHexColor('#ffff')).toBe(false);
    expect(isHexColor('#gggggg')).toBe(false);
    expect(isHexColor('rgb(0,0,0)')).toBe(false);
  });
});

describe('isIPv4', () => {
  it('should return true for valid IPv4 addresses', () => {
    expect(isIPv4('192.168.1.1')).toBe(true);
    expect(isIPv4('0.0.0.0')).toBe(true);
    expect(isIPv4('255.255.255.255')).toBe(true);
    expect(isIPv4('127.0.0.1')).toBe(true);
  });

  it('should return false for invalid IPv4 addresses', () => {
    expect(isIPv4('256.0.0.0')).toBe(false);
    expect(isIPv4('192.168.1')).toBe(false);
    expect(isIPv4('192.168.1.1.1')).toBe(false);
    expect(isIPv4('abc.def.ghi.jkl')).toBe(false);
  });
});

describe('isIPv6', () => {
  it('should return true for valid IPv6 addresses', () => {
    expect(isIPv6('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true);
    expect(isIPv6('::1')).toBe(true);
    expect(isIPv6('fe80::1')).toBe(true);
  });

  it('should return false for invalid IPv6 addresses', () => {
    expect(isIPv6('192.168.1.1')).toBe(false);
    expect(isIPv6('not-an-ip')).toBe(false);
  });
});

describe('isBlank', () => {
  it('should return true for blank strings', () => {
    expect(isBlank('')).toBe(true);
    expect(isBlank('   ')).toBe(true);
    expect(isBlank('\t\n')).toBe(true);
  });

  it('should return false for non-blank strings', () => {
    expect(isBlank('hello')).toBe(false);
    expect(isBlank(' hello ')).toBe(false);
  });

  it('should return false for non-strings', () => {
    expect(isBlank(null)).toBe(false);
    expect(isBlank(undefined)).toBe(false);
  });
});

describe('isAlpha', () => {
  it('should return true for alphabetic strings', () => {
    expect(isAlpha('hello')).toBe(true);
    expect(isAlpha('HELLO')).toBe(true);
    expect(isAlpha('HelloWorld')).toBe(true);
  });

  it('should return false for non-alphabetic strings', () => {
    expect(isAlpha('hello123')).toBe(false);
    expect(isAlpha('hello world')).toBe(false);
    expect(isAlpha('')).toBe(false);
  });
});

describe('isAlphanumeric', () => {
  it('should return true for alphanumeric strings', () => {
    expect(isAlphanumeric('hello123')).toBe(true);
    expect(isAlphanumeric('ABC')).toBe(true);
    expect(isAlphanumeric('123')).toBe(true);
  });

  it('should return false for non-alphanumeric strings', () => {
    expect(isAlphanumeric('hello world')).toBe(false);
    expect(isAlphanumeric('hello-123')).toBe(false);
    expect(isAlphanumeric('')).toBe(false);
  });
});

describe('isNumericString', () => {
  it('should return true for numeric strings', () => {
    expect(isNumericString('123')).toBe(true);
    expect(isNumericString('-123.45')).toBe(true);
    expect(isNumericString('0')).toBe(true);
    expect(isNumericString('1e10')).toBe(true);
  });

  it('should return false for non-numeric strings', () => {
    expect(isNumericString('abc')).toBe(false);
    expect(isNumericString('')).toBe(false);
    expect(isNumericString('   ')).toBe(false);
  });
});

describe('isDateString', () => {
  it('should return true for valid date strings', () => {
    expect(isDateString('2024-01-01')).toBe(true);
    expect(isDateString('January 1, 2024')).toBe(true);
    expect(isDateString('2024-01-01T00:00:00Z')).toBe(true);
  });

  it('should return false for invalid date strings', () => {
    expect(isDateString('not a date')).toBe(false);
    expect(isDateString('')).toBe(false);
  });
});

describe('isLowerCase', () => {
  it('should return true for lowercase strings', () => {
    expect(isLowerCase('hello')).toBe(true);
    expect(isLowerCase('hello world')).toBe(true);
  });

  it('should return false for non-lowercase strings', () => {
    expect(isLowerCase('Hello')).toBe(false);
    expect(isLowerCase('HELLO')).toBe(false);
    expect(isLowerCase('')).toBe(false);
    expect(isLowerCase('123')).toBe(false);
  });
});

describe('isUpperCase', () => {
  it('should return true for uppercase strings', () => {
    expect(isUpperCase('HELLO')).toBe(true);
    expect(isUpperCase('HELLO WORLD')).toBe(true);
  });

  it('should return false for non-uppercase strings', () => {
    expect(isUpperCase('Hello')).toBe(false);
    expect(isUpperCase('hello')).toBe(false);
    expect(isUpperCase('')).toBe(false);
    expect(isUpperCase('123')).toBe(false);
  });
});

describe('isBase64', () => {
  it('should return true for valid base64 strings', () => {
    expect(isBase64('SGVsbG8gV29ybGQ=')).toBe(true);
    expect(isBase64('YWJj')).toBe(true);
    expect(isBase64('YWJjZA==')).toBe(true);
  });

  it('should return false for invalid base64 strings', () => {
    expect(isBase64('not base64!')).toBe(false);
    expect(isBase64('')).toBe(false);
  });
});

describe('isJWT', () => {
  it('should return true for valid JWT format', () => {
    const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    expect(isJWT(jwt)).toBe(true);
  });

  it('should return false for invalid JWT format', () => {
    expect(isJWT('not.a.jwt!')).toBe(false);
    expect(isJWT('only.two')).toBe(false);
    expect(isJWT('')).toBe(false);
  });
});

describe('isSlug', () => {
  it('should return true for valid slugs', () => {
    expect(isSlug('hello-world')).toBe(true);
    expect(isSlug('my-post-123')).toBe(true);
    expect(isSlug('simple')).toBe(true);
  });

  it('should return false for invalid slugs', () => {
    expect(isSlug('Hello-World')).toBe(false);
    expect(isSlug('hello_world')).toBe(false);
    expect(isSlug('-hello')).toBe(false);
    expect(isSlug('')).toBe(false);
  });
});

describe('isSemVer', () => {
  it('should return true for valid semver strings', () => {
    expect(isSemVer('1.0.0')).toBe(true);
    expect(isSemVer('0.0.1')).toBe(true);
    expect(isSemVer('1.2.3-alpha')).toBe(true);
    expect(isSemVer('1.2.3-alpha.1')).toBe(true);
    expect(isSemVer('1.2.3+build')).toBe(true);
    expect(isSemVer('1.2.3-alpha+build')).toBe(true);
  });

  it('should return false for invalid semver strings', () => {
    expect(isSemVer('1.0')).toBe(false);
    expect(isSemVer('v1.0.0')).toBe(false);
    expect(isSemVer('1.0.0.0')).toBe(false);
    expect(isSemVer('')).toBe(false);
  });
});
