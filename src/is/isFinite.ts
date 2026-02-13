import { isNumber } from './isNumber.js';

/**
 * Checks if a value is a finite number.
 * @param value - The value to check
 * @returns `true` if the value is a finite number, `false` otherwise
 */
export function isFiniteNumber(value: unknown): value is number {
  return isNumber(value) && Number.isFinite(value);
}
