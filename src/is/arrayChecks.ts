import { isArray } from './isArray.js';

/**
 * Type guard function signature.
 */
type TypeGuard<T> = (value: unknown) => value is T;

/**
 * Checks if a value is an array where all elements pass a type guard.
 * @param value - The value to check
 * @param guard - The type guard function to apply to each element
 * @returns `true` if value is an array and all elements pass the guard
 */
export function isArrayOf<T>(value: unknown, guard: TypeGuard<T>): value is T[] {
  if (!isArray(value)) {
    return false;
  }
  return value.every(guard);
}

/**
 * Checks if an array has at least a minimum number of items.
 * @param value - The value to check
 * @param min - The minimum number of items required
 * @returns `true` if the array has at least min items, `false` otherwise
 */
export function hasMinItems(value: unknown, min: number): value is unknown[] {
  return isArray(value) && value.length >= min;
}

/**
 * Checks if an array has at most a maximum number of items.
 * @param value - The value to check
 * @param max - The maximum number of items allowed
 * @returns `true` if the array has at most max items, `false` otherwise
 */
export function hasMaxItems(value: unknown, max: number): value is unknown[] {
  return isArray(value) && value.length <= max;
}

/**
 * Checks if an array contains a specific value.
 * @param arr - The array to search
 * @param item - The item to look for
 * @returns `true` if the array contains the item, `false` otherwise
 */
export function includes<T>(arr: unknown, item: T): boolean {
  return isArray(arr) && arr.includes(item);
}
