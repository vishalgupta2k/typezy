import { isString } from './isString.js';

/**
 * Checks if a value is a string containing only alphabetic characters.
 * @param value - The value to check
 * @returns `true` if the value contains only alphabetic characters, `false` otherwise
 */
export function isAlpha(value: unknown): value is string {
  if (!isString(value) || value.length === 0) {
    return false;
  }

  return /^[a-zA-Z]+$/.test(value);
}
