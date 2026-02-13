import { isString } from './isString.js';

/**
 * Checks if a value is a non-empty string.
 * @param value - The value to check
 * @returns `true` if the value is a non-empty string, `false` otherwise
 */
export function isNonEmptyString(value: unknown): value is string {
  return isString(value) && value.length > 0;
}
