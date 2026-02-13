import { isInteger } from './isInteger.js';

/**
 * Checks if a value is an odd number.
 * @param value - The value to check
 * @returns `true` if the value is an odd integer, `false` otherwise
 */
export function isOdd(value: unknown): value is number {
  return isInteger(value) && value % 2 !== 0;
}
