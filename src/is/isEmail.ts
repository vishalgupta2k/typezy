import { isString } from './isString.js';

/**
 * Email regex pattern based on RFC 5322 (simplified version for practical use).
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Checks if a value is a valid email string.
 * @param value - The value to check
 * @returns `true` if the value is a valid email string, `false` otherwise
 */
export function isEmail(value: unknown): value is string {
  if (!isString(value)) {
    return false;
  }

  return EMAIL_REGEX.test(value);
}
