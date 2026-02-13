import { isString } from './isString.js';

/**
 * Checks if a value is a string that can be parsed as a valid date.
 * @param value - The value to check
 * @returns `true` if the value is a valid date string, `false` otherwise
 */
export function isDateString(value: unknown): value is string {
  if (!isString(value) || value.trim().length === 0) {
    return false;
  }

  const date = new Date(value);
  return !Number.isNaN(date.getTime());
}
