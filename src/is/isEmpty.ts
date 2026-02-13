import { isString } from './isString.js';
import { isArray } from './isArray.js';
import { isPlainObject } from './isPlainObject.js';

/**
 * Checks if a value is empty.
 * - Empty string: ''
 * - Empty array: []
 * - Empty object: {}
 * - Null or undefined
 * - Map or Set with size 0
 * 
 * @param value - The value to check
 * @returns `true` if the value is empty, `false` otherwise
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) {
    return true;
  }

  if (isString(value) || isArray(value)) {
    return value.length === 0;
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  if (isPlainObject(value)) {
    return Object.keys(value).length === 0;
  }

  return false;
}
