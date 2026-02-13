import { isDefined } from '../is/isDefined.js';

/**
 * Filters out null and undefined values from an array.
 * Returns a new array with only defined values, preserving the type.
 * @param arr - The array to filter
 * @returns A new array without null or undefined values
 * @example filterDefined([1, null, 2, undefined, 3]) // [1, 2, 3]
 * @example filterDefined(['a', null, 'b']) // ['a', 'b']
 */
export function filterDefined<T>(arr: (T | null | undefined)[]): T[] {
  return arr.filter((item): item is T => isDefined(item));
}

/**
 * Removes all falsy values from an array (false, 0, '', null, undefined, NaN).
 * @param arr - The array to compact
 * @returns A new array without falsy values
 * @example compact([0, 1, false, 2, '', 3, null]) // [1, 2, 3]
 */
export function compact<T>(arr: (T | null | undefined | false | '' | 0)[]): T[] {
  return arr.filter(Boolean) as T[];
}

/**
 * Filters array to only truthy values with type safety.
 * @param arr - The array to filter
 * @returns A new array with only truthy values
 * @example filterTruthy([0, 'hello', '', null, 42]) // ['hello', 42]
 */
export function filterTruthy<T>(arr: T[]): Exclude<T, null | undefined | false | '' | 0>[] {
  return arr.filter(Boolean) as Exclude<T, null | undefined | false | '' | 0>[];
}

/**
 * Removes duplicate values from an array.
 * Works with primitives. For objects, use uniqueBy.
 * @param arr - The array to deduplicate
 * @returns A new array with unique values
 * @example unique([1, 2, 2, 3, 1]) // [1, 2, 3]
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/**
 * Removes duplicate values from an array based on a key function.
 * @param arr - The array to deduplicate
 * @param keyFn - A function that returns the key to compare
 * @returns A new array with unique values based on the key
 * @example uniqueBy([{id: 1}, {id: 2}, {id: 1}], x => x.id) // [{id: 1}, {id: 2}]
 */
export function uniqueBy<T, K>(arr: T[], keyFn: (item: T) => K): T[] {
  const seen = new Set<K>();
  return arr.filter((item) => {
    const key = keyFn(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

/**
 * Splits an array into two arrays based on a predicate function.
 * @param arr - The array to partition
 * @param predicate - A function that returns true for items in the first array
 * @returns A tuple of two arrays: [matching, non-matching]
 * @example partition([1, 2, 3, 4], x => x % 2 === 0) // [[2, 4], [1, 3]]
 */
export function partition<T>(
  arr: T[],
  predicate: (item: T, index: number) => boolean
): [T[], T[]] {
  const truthy: T[] = [];
  const falsy: T[] = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i] as T;
    if (predicate(item, i)) {
      truthy.push(item);
    } else {
      falsy.push(item);
    }
  }
  return [truthy, falsy];
}

/**
 * Returns the first element of an array or undefined.
 * @param arr - The array
 * @returns The first element or undefined
 * @example first([1, 2, 3]) // 1
 * @example first([]) // undefined
 */
export function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

/**
 * Returns the last element of an array or undefined.
 * @param arr - The array
 * @returns The last element or undefined
 * @example last([1, 2, 3]) // 3
 * @example last([]) // undefined
 */
export function last<T>(arr: T[]): T | undefined {
  return arr.at(-1);
}
