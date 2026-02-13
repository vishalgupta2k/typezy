import { isString } from './isString.js';

/**
 * Options for password strength validation.
 */
export interface PasswordOptions {
  minLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumbers?: boolean;
  requireSpecialChars?: boolean;
}

const DEFAULT_OPTIONS: Required<PasswordOptions> = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: false,
};

/**
 * Checks if a value is a strong password based on configurable rules.
 * @param value - The value to check
 * @param options - Password strength options
 * @returns `true` if the password meets all requirements, `false` otherwise
 */
export function isStrongPassword(value: unknown, options?: PasswordOptions): value is string {
  if (!isString(value)) {
    return false;
  }

  const opts = { ...DEFAULT_OPTIONS, ...options };

  if (value.length < opts.minLength) {
    return false;
  }

  if (opts.requireUppercase && !/[A-Z]/.test(value)) {
    return false;
  }

  if (opts.requireLowercase && !/[a-z]/.test(value)) {
    return false;
  }

  if (opts.requireNumbers && !/\d/.test(value)) {
    return false;
  }

  if (opts.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
    return false;
  }

  return true;
}
