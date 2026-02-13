import { isPlainObject } from './isPlainObject.js';

/**
 * Checks if a value is a non-empty plain object (has at least one own property).
 * @param value - The value to check
 * @returns True if the value is a plain object with at least one own property
 * @example isNonEmptyObject({ a: 1 }) // true
 * @example isNonEmptyObject({}) // false
 * @example isNonEmptyObject(null) // false
 * @example isNonEmptyObject([1, 2]) // false (arrays are not plain objects)
 */
export function isNonEmptyObject(value: unknown): value is Record<string, unknown> {
  return isPlainObject(value) && Object.keys(value).length > 0;
}
