import { describe, it, expect } from 'vitest';
import {
  validateRequired,
  validateEmail,
  validateURL,
  validateUUID,
  validateMinLength,
  validateMaxLength,
  validateInRange,
  validateStrongPassword,
  validatePhoneNumber,
  validatePattern,
  createValidator,
  collectErrors,
} from '../src/validate/index.js';

describe('validateRequired', () => {
  it('should pass for defined non-empty values', () => {
    expect(validateRequired('hello')).toEqual({ valid: true });
    expect(validateRequired(0)).toEqual({ valid: true });
    expect(validateRequired(false)).toEqual({ valid: true });
  });

  it('should fail for null/undefined/empty string', () => {
    expect(validateRequired(null).valid).toBe(false);
    expect(validateRequired(undefined).valid).toBe(false);
    expect(validateRequired('').valid).toBe(false);
    expect(validateRequired('   ').valid).toBe(false);
  });
});

describe('validateEmail', () => {
  it('should pass for valid emails', () => {
    expect(validateEmail('test@example.com').valid).toBe(true);
  });

  it('should fail for invalid emails', () => {
    const result = validateEmail('not-email');
    expect(result.valid).toBe(false);
    expect(result.error).toBeTruthy();
  });
});

describe('validateURL', () => {
  it('should pass for valid URLs', () => {
    expect(validateURL('https://example.com').valid).toBe(true);
  });

  it('should fail for invalid URLs', () => {
    expect(validateURL('not-url').valid).toBe(false);
  });
});

describe('validateUUID', () => {
  it('should pass for valid UUIDs', () => {
    expect(validateUUID('550e8400-e29b-41d4-a716-446655440000').valid).toBe(true);
  });

  it('should fail for invalid UUIDs', () => {
    expect(validateUUID('not-uuid').valid).toBe(false);
  });
});

describe('validateMinLength', () => {
  it('should pass for strings meeting minimum length', () => {
    expect(validateMinLength(3)('abc').valid).toBe(true);
  });

  it('should fail for strings below minimum length', () => {
    const result = validateMinLength(3)('ab');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('3');
  });

  it('should work with arrays', () => {
    expect(validateMinLength(2)([1, 2]).valid).toBe(true);
    expect(validateMinLength(3)([1, 2]).valid).toBe(false);
  });
});

describe('validateMaxLength', () => {
  it('should pass for strings within max length', () => {
    expect(validateMaxLength(5)('abc').valid).toBe(true);
  });

  it('should fail for strings exceeding max length', () => {
    expect(validateMaxLength(2)('abc').valid).toBe(false);
  });
});

describe('validateInRange', () => {
  it('should pass for numbers in range', () => {
    expect(validateInRange(0, 10)(5).valid).toBe(true);
  });

  it('should fail for numbers out of range', () => {
    expect(validateInRange(0, 10)(11).valid).toBe(false);
  });

  it('should fail for non-numbers', () => {
    expect(validateInRange(0, 10)('5').valid).toBe(false);
  });
});

describe('validateStrongPassword', () => {
  it('should pass for strong passwords', () => {
    expect(validateStrongPassword()('MyStr0ngP@ss').valid).toBe(true);
  });

  it('should fail for weak passwords', () => {
    expect(validateStrongPassword()('weak').valid).toBe(false);
  });
});

describe('validatePhoneNumber', () => {
  it('should pass for valid phone numbers', () => {
    expect(validatePhoneNumber('+1234567890').valid).toBe(true);
  });

  it('should fail for invalid phone numbers', () => {
    expect(validatePhoneNumber('abc').valid).toBe(false);
  });
});

describe('validatePattern', () => {
  it('should pass when pattern matches', () => {
    expect(validatePattern(/^\d+$/, 'Numbers only')('12345').valid).toBe(true);
  });

  it('should fail when pattern does not match', () => {
    const result = validatePattern(/^\d+$/, 'Numbers only')('abc');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('Numbers only');
  });
});

describe('createValidator', () => {
  it('should return first error', () => {
    const validate = createValidator(validateRequired, validateMinLength(3));

    expect(validate('').valid).toBe(false);
    expect(validate('').error).toContain('required');

    expect(validate('ab').valid).toBe(false);
    expect(validate('ab').error).toContain('3');

    expect(validate('abc').valid).toBe(true);
  });

  it('should pass when all rules pass', () => {
    const validate = createValidator(validateRequired, validateEmail);
    expect(validate('test@example.com')).toEqual({ valid: true });
  });
});

describe('collectErrors', () => {
  it('should return all errors', () => {
    const validate = collectErrors(
      validateRequired,
      validateMinLength(10),
      validateEmail,
    );

    const errors = validate('ab');
    expect(errors.length).toBe(2); // min length + email
  });

  it('should return empty array when all pass', () => {
    const validate = collectErrors(validateRequired, validateEmail);
    expect(validate('test@example.com')).toHaveLength(0);
  });
});
