import { isString } from '../is/isString.js';
import { isEmail } from '../is/isEmail.js';
import { isURL } from '../is/isURL.js';
import { isUUID } from '../is/isUUID.js';
import { isPhoneNumber } from '../is/isPhoneNumber.js';
import { isStrongPassword } from '../is/isStrongPassword.js';
import type { PasswordOptions } from '../is/isStrongPassword.js';
import { isDefined } from '../is/isDefined.js';
import { isNumber } from '../is/isNumber.js';
import { isInRange } from '../is/isInRange.js';
import type { ValidationResult, ValidationRule } from './types.js';

/**
 * Validates that a value is defined (not null/undefined) and not an empty string.
 * @param value - The value to validate
 * @returns ValidationResult with error message if invalid
 */
export function validateRequired(value: unknown): ValidationResult {
  if (!isDefined(value) || (isString(value) && value.trim() === '')) {
    return { valid: false, error: 'This field is required' };
  }
  return { valid: true };
}

/**
 * Validates that a value is a valid email address.
 * @param value - The value to validate
 * @returns ValidationResult with error message if invalid
 */
export function validateEmail(value: unknown): ValidationResult {
  if (!isEmail(value)) {
    return { valid: false, error: 'Please enter a valid email address' };
  }
  return { valid: true };
}

/**
 * Validates that a value is a valid URL.
 * @param value - The value to validate
 * @returns ValidationResult with error message if invalid
 */
export function validateURL(value: unknown): ValidationResult {
  if (!isURL(value)) {
    return { valid: false, error: 'Please enter a valid URL' };
  }
  return { valid: true };
}

/**
 * Validates that a value is a valid UUID.
 * @param value - The value to validate
 * @returns ValidationResult with error message if invalid
 */
export function validateUUID(value: unknown): ValidationResult {
  if (!isUUID(value)) {
    return { valid: false, error: 'Please enter a valid UUID' };
  }
  return { valid: true };
}

/**
 * Creates a validator that checks minimum length of a string or array.
 * @param min - Minimum length
 * @returns A validation rule function
 * @example validateMinLength(3)('ab') // { valid: false, error: 'Must be at least 3 characters' }
 */
export function validateMinLength(min: number): ValidationRule {
  return (value: unknown): ValidationResult => {
    if (isString(value) && value.length < min) {
      return { valid: false, error: `Must be at least ${min} characters` };
    }
    if (Array.isArray(value) && value.length < min) {
      return { valid: false, error: `Must have at least ${min} items` };
    }
    return { valid: true };
  };
}

/**
 * Creates a validator that checks maximum length of a string or array.
 * @param max - Maximum length
 * @returns A validation rule function
 * @example validateMaxLength(10)('hello') // { valid: true }
 */
export function validateMaxLength(max: number): ValidationRule {
  return (value: unknown): ValidationResult => {
    if (isString(value) && value.length > max) {
      return { valid: false, error: `Must be at most ${max} characters` };
    }
    if (Array.isArray(value) && value.length > max) {
      return { valid: false, error: `Must have at most ${max} items` };
    }
    return { valid: true };
  };
}

/**
 * Creates a validator that checks if a number is within a range.
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns A validation rule function
 */
export function validateInRange(min: number, max: number): ValidationRule {
  return (value: unknown): ValidationResult => {
    if (!isNumber(value) || !isInRange(value, min, max)) {
      return { valid: false, error: `Must be between ${min} and ${max}` };
    }
    return { valid: true };
  };
}

/**
 * Validates that a value is a strong password.
 * @param options - Optional password strength options
 * @returns A validation rule function
 */
export function validateStrongPassword(options?: PasswordOptions): ValidationRule {
  return (value: unknown): ValidationResult => {
    if (!isStrongPassword(value, options)) {
      return { valid: false, error: 'Password does not meet strength requirements' };
    }
    return { valid: true };
  };
}

/**
 * Validates that a value is a valid phone number.
 * @param value - The value to validate
 * @returns ValidationResult with error message if invalid
 */
export function validatePhoneNumber(value: unknown): ValidationResult {
  if (!isPhoneNumber(value)) {
    return { valid: false, error: 'Please enter a valid phone number' };
  }
  return { valid: true };
}

/**
 * Creates a validator that checks a value against a regex pattern.
 * @param pattern - The regex pattern to match
 * @param errorMessage - Custom error message
 * @returns A validation rule function
 * @example validatePattern(/^\d+$/, 'Must contain only numbers')
 */
export function validatePattern(pattern: RegExp, errorMessage: string): ValidationRule {
  return (value: unknown): ValidationResult => {
    if (!isString(value) || !pattern.test(value)) {
      return { valid: false, error: errorMessage };
    }
    return { valid: true };
  };
}

/**
 * Creates a composite validator from multiple rules. Runs rules in order,
 * returns the first error encountered.
 * @param rules - Array of validation rules to apply
 * @returns A validation rule function
 * @example
 * const validateName = createValidator(validateRequired, validateMinLength(2), validateMaxLength(50));
 * validateName('') // { valid: false, error: 'This field is required' }
 * validateName('A') // { valid: false, error: 'Must be at least 2 characters' }
 * validateName('John') // { valid: true }
 */
export function createValidator(...rules: ValidationRule[]): ValidationRule {
  return (value: unknown): ValidationResult => {
    for (const rule of rules) {
      const result = rule(value);
      if (!result.valid) {
        return result;
      }
    }
    return { valid: true };
  };
}

/**
 * Runs all validation rules and returns all errors (not just the first).
 * Useful for showing all form errors at once.
 * @param rules - Array of validation rules to apply
 * @returns A function that returns an array of all validation results with errors
 * @example
 * const validateAll = collectErrors(validateRequired, validateMinLength(8), validateStrongPassword());
 * validateAll('ab') // [{ valid: false, error: 'Must be at least 8 characters' }, { valid: false, error: 'Password does not meet...' }]
 */
export function collectErrors(...rules: ValidationRule[]) {
  return (value: unknown): ValidationResult[] => {
    const errors: ValidationResult[] = [];

    for (const rule of rules) {
      const result = rule(value);
      if (!result.valid) {
        errors.push(result);
      }
    }

    return errors;
  };
}
