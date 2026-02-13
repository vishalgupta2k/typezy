import { describe, it, expect } from 'vitest';
import {
  assertNonEmptyObject,
  assertUUID,
  assertJSON,
  assertPhoneNumber,
  assertCreditCard,
  assertStrongPassword,
  assertInRange,
  assertPostalCode,
  assertHexColor,
  assertIPv4,
  assertIPv6,
  assertSemVer,
  assertSlug,
  AssertionError,
} from '../src/assert/index.js';

describe('assertNonEmptyObject', () => {
  it('should not throw for non-empty objects', () => {
    expect(() => assertNonEmptyObject({ a: 1 })).not.toThrow();
  });

  it('should throw for empty objects', () => {
    expect(() => assertNonEmptyObject({})).toThrow(AssertionError);
  });

  it('should throw for non-objects', () => {
    expect(() => assertNonEmptyObject(null)).toThrow(AssertionError);
    expect(() => assertNonEmptyObject([])).toThrow(AssertionError);
  });
});

describe('assertUUID', () => {
  it('should not throw for valid UUIDs', () => {
    expect(() => assertUUID('550e8400-e29b-41d4-a716-446655440000')).not.toThrow();
  });

  it('should throw for invalid UUIDs', () => {
    expect(() => assertUUID('not-a-uuid')).toThrow(AssertionError);
    expect(() => assertUUID(123)).toThrow(AssertionError);
  });
});

describe('assertJSON', () => {
  it('should not throw for valid JSON strings', () => {
    expect(() => assertJSON('{"a": 1}')).not.toThrow();
    expect(() => assertJSON('[1, 2, 3]')).not.toThrow();
  });

  it('should throw for invalid JSON', () => {
    expect(() => assertJSON('{invalid}')).toThrow(AssertionError);
    expect(() => assertJSON(123)).toThrow(AssertionError);
  });
});

describe('assertPhoneNumber', () => {
  it('should not throw for valid phone numbers', () => {
    expect(() => assertPhoneNumber('+1234567890')).not.toThrow();
  });

  it('should throw for invalid phone numbers', () => {
    expect(() => assertPhoneNumber('abc')).toThrow(AssertionError);
    expect(() => assertPhoneNumber(123)).toThrow(AssertionError);
  });
});

describe('assertCreditCard', () => {
  it('should not throw for valid credit card numbers', () => {
    expect(() => assertCreditCard('4111111111111111')).not.toThrow();
  });

  it('should throw for invalid credit card numbers', () => {
    expect(() => assertCreditCard('1234')).toThrow(AssertionError);
    expect(() => assertCreditCard(123)).toThrow(AssertionError);
  });
});

describe('assertStrongPassword', () => {
  it('should not throw for strong passwords', () => {
    expect(() => assertStrongPassword('MyStr0ngP@ss')).not.toThrow();
  });

  it('should throw for weak passwords', () => {
    expect(() => assertStrongPassword('weak')).toThrow(AssertionError);
  });

  it('should accept options', () => {
    expect(() => assertStrongPassword('abcdefgh', { requireUppercase: false, requireNumbers: false })).not.toThrow();
  });
});

describe('assertInRange', () => {
  it('should not throw for numbers in range', () => {
    expect(() => assertInRange(5, 0, 10)).not.toThrow();
    expect(() => assertInRange(0, 0, 10)).not.toThrow();
    expect(() => assertInRange(10, 0, 10)).not.toThrow();
  });

  it('should throw for numbers out of range', () => {
    expect(() => assertInRange(11, 0, 10)).toThrow(AssertionError);
    expect(() => assertInRange(-1, 0, 10)).toThrow(AssertionError);
  });

  it('should throw for non-numbers', () => {
    expect(() => assertInRange('5', 0, 10)).toThrow(AssertionError);
  });
});

describe('assertPostalCode', () => {
  it('should not throw for valid postal codes', () => {
    expect(() => assertPostalCode('90210', 'US')).not.toThrow();
  });

  it('should throw for invalid postal codes', () => {
    expect(() => assertPostalCode('abc', 'US')).toThrow(AssertionError);
  });
});

describe('assertHexColor', () => {
  it('should not throw for valid hex colors', () => {
    expect(() => assertHexColor('#ff0000')).not.toThrow();
    expect(() => assertHexColor('#fff')).not.toThrow();
  });

  it('should throw for invalid hex colors', () => {
    expect(() => assertHexColor('red')).toThrow(AssertionError);
    expect(() => assertHexColor(123)).toThrow(AssertionError);
  });
});

describe('assertIPv4', () => {
  it('should not throw for valid IPv4 addresses', () => {
    expect(() => assertIPv4('192.168.1.1')).not.toThrow();
  });

  it('should throw for invalid IPv4 addresses', () => {
    expect(() => assertIPv4('999.999.999.999')).toThrow(AssertionError);
    expect(() => assertIPv4('not-ip')).toThrow(AssertionError);
  });
});

describe('assertIPv6', () => {
  it('should not throw for valid IPv6 addresses', () => {
    expect(() => assertIPv6('::1')).not.toThrow();
  });

  it('should throw for invalid IPv6 addresses', () => {
    expect(() => assertIPv6('not-ipv6')).toThrow(AssertionError);
  });
});

describe('assertSemVer', () => {
  it('should not throw for valid semver strings', () => {
    expect(() => assertSemVer('1.0.0')).not.toThrow();
    expect(() => assertSemVer('1.2.3-beta.1')).not.toThrow();
  });

  it('should throw for invalid semver strings', () => {
    expect(() => assertSemVer('1.0')).toThrow(AssertionError);
    expect(() => assertSemVer('abc')).toThrow(AssertionError);
  });
});

describe('assertSlug', () => {
  it('should not throw for valid slugs', () => {
    expect(() => assertSlug('hello-world')).not.toThrow();
    expect(() => assertSlug('my-post-123')).not.toThrow();
  });

  it('should throw for invalid slugs', () => {
    expect(() => assertSlug('Hello World')).toThrow(AssertionError);
    expect(() => assertSlug(123)).toThrow(AssertionError);
  });
});
