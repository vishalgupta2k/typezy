import { isNumber } from './isNumber.js';

/**
 * Checks if a value is a number within a specified range (inclusive).
 * @param value - The value to check
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns `true` if the value is within the range, `false` otherwise
 */
export function isInRange(value: unknown, min: number, max: number): value is number {
  return isNumber(value) && value >= min && value <= max;
}
