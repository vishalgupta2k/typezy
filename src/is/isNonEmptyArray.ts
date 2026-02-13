import { isArray } from './isArray.js';

/**
 * Checks if a value is a non-empty array.
 * @param value - The value to check
 * @returns `true` if the value is a non-empty array, `false` otherwise
 */
export function isNonEmptyArray<T>(value: unknown): value is [T, ...T[]] {
  return isArray(value) && value.length > 0;
}
