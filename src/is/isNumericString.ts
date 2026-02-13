import { isString } from './isString.js';

/**
 * Checks if a value is a string that represents a valid number.
 * @param value - The value to check
 * @returns `true` if the value is a numeric string, `false` otherwise
 */
export function isNumericString(value: unknown): value is string {
  if (!isString(value) || value.trim().length === 0) {
    return false;
  }

  return !Number.isNaN(Number(value));
}
