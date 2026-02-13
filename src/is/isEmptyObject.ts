import { isPlainObject } from './isPlainObject.js';

/**
 * Checks if a value is an empty plain object (has no own properties).
 * @param value - The value to check
 * @returns True if the value is a plain object with no own properties
 * @example isEmptyObject({}) // true
 * @example isEmptyObject({ a: 1 }) // false
 * @example isEmptyObject(null) // false
 * @example isEmptyObject([]) // false (arrays are not plain objects)
 */
export function isEmptyObject(value: unknown): value is Record<string, never> {
  return isPlainObject(value) && Object.keys(value).length === 0;
}
