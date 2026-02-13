import { isNumber } from './isNumber.js';

/**
 * Checks if a value is a negative number (less than 0).
 * @param value - The value to check
 * @returns `true` if the value is a negative number, `false` otherwise
 */
export function isNegative(value: unknown): value is number {
  return isNumber(value) && value < 0;
}
