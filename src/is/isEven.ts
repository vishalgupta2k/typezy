import { isInteger } from './isInteger.js';

/**
 * Checks if a value is an even number.
 * @param value - The value to check
 * @returns `true` if the value is an even integer, `false` otherwise
 */
export function isEven(value: unknown): value is number {
  return isInteger(value) && value % 2 === 0;
}
