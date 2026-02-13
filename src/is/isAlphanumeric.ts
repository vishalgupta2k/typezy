import { isString } from './isString.js';

/**
 * Checks if a value is a string containing only alphanumeric characters.
 * @param value - The value to check
 * @returns `true` if the value contains only alphanumeric characters, `false` otherwise
 */
export function isAlphanumeric(value: unknown): value is string {
  if (!isString(value) || value.length === 0) {
    return false;
  }

  return /^[a-zA-Z0-9]+$/.test(value);
}
