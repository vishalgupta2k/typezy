import { isString } from './isString.js';

/**
 * Checks if a value is a string that contains only uppercase characters.
 * @param value - The value to check
 * @returns `true` if the value is all uppercase, `false` otherwise
 */
export function isUpperCase(value: unknown): value is string {
  if (!isString(value) || value.length === 0) {
    return false;
  }

  return value === value.toUpperCase() && value !== value.toLowerCase();
}
