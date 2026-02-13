import { isString } from './isString.js';

/**
 * Checks if a value is a string that contains only lowercase characters.
 * @param value - The value to check
 * @returns `true` if the value is all lowercase, `false` otherwise
 */
export function isLowerCase(value: unknown): value is string {
  if (!isString(value) || value.length === 0) {
    return false;
  }

  return value === value.toLowerCase() && value !== value.toUpperCase();
}
