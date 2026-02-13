import { isDate } from './isDate.js';

/**
 * Checks if a value is a valid Date object (not Invalid Date).
 * @param value - The value to check
 * @returns `true` if the value is a valid Date object, `false` otherwise
 */
export function isValidDate(value: unknown): value is Date {
  return isDate(value) && !Number.isNaN(value.getTime());
}
