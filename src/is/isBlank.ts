import { isString } from './isString.js';

/**
 * Checks if a value is a blank string (empty or contains only whitespace).
 * @param value - The value to check
 * @returns `true` if the value is a blank string, `false` otherwise
 */
export function isBlank(value: unknown): value is string {
  return isString(value) && value.trim().length === 0;
}
