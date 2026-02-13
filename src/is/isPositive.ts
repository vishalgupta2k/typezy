import { isNumber } from './isNumber.js';

/**
 * Checks if a value is a positive number (greater than 0).
 * @param value - The value to check
 * @returns `true` if the value is a positive number, `false` otherwise
 */
export function isPositive(value: unknown): value is number {
  return isNumber(value) && value > 0;
}
