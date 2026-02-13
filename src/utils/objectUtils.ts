import { isPlainObject } from '../is/isPlainObject.js';

/**
 * Creates a new object with only the specified keys from the source object.
 * @param obj - The source object
 * @param keys - The keys to pick
 * @returns A new object with only the specified keys
 * @example pick({ a: 1, b: 2, c: 3 }, ['a', 'c']) // { a: 1, c: 3 }
 */
export function pick<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>;

  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }

  return result;
}

/**
 * Creates a new object without the specified keys from the source object.
 * @param obj - The source object
 * @param keys - The keys to omit
 * @returns A new object without the specified keys
 * @example omit({ a: 1, b: 2, c: 3 }, ['b']) // { a: 1, c: 3 }
 */
export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const result = { ...obj };

  for (const key of keys) {
    delete result[key];
  }

  return result as Omit<T, K>;
}

/**
 * Deep merges a source object into a target object.
 * Nested objects are merged recursively; arrays and primitives are replaced.
 * @param target - The target object
 * @param source - The source object to merge in
 * @returns A new deeply merged object
 * @example deepMerge({ a: { b: 1, c: 2 } }, { a: { b: 3 } }) // { a: { b: 3, c: 2 } }
 */
export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  source: Record<string, unknown>,
): T {
  const result = { ...target } as Record<string, unknown>;

  for (const key of Object.keys(source)) {
    const targetVal = result[key];
    const sourceVal = source[key];

    if (isPlainObject(targetVal) && isPlainObject(sourceVal)) {
      result[key] = deepMerge(targetVal, sourceVal);
    } else {
      result[key] = sourceVal;
    }
  }

  return result as T;
}

/**
 * Flattens a nested object into a single-level object with dot-path keys.
 * @param obj - The object to flatten
 * @param separator - The separator for keys (default: '.')
 * @returns A flat record with dot-path keys
 * @example flattenObject({ a: { b: 1, c: { d: 2 } } }) // { 'a.b': 1, 'a.c.d': 2 }
 */
export function flattenObject(
  obj: Record<string, unknown>,
  separator: string = '.',
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  function recurse(current: Record<string, unknown>, prefix: string): void {
    for (const key of Object.keys(current)) {
      const newKey = prefix ? `${prefix}${separator}${key}` : key;
      const value = current[key];

      if (isPlainObject(value)) {
        recurse(value, newKey);
      } else {
        result[newKey] = value;
      }
    }
  }

  recurse(obj, '');
  return result;
}

/**
 * Maps the keys of an object using a transform function.
 * @param obj - The source object
 * @param fn - A function that receives each key and returns a new key
 * @returns A new object with transformed keys
 * @example mapKeys({ a: 1, b: 2 }, (k) => k.toUpperCase()) // { A: 1, B: 2 }
 */
export function mapKeys<V>(
  obj: Record<string, V>,
  fn: (key: string) => string,
): Record<string, V> {
  const result: Record<string, V> = {};

  for (const key of Object.keys(obj)) {
    result[fn(key)] = obj[key] as V;
  }

  return result;
}

/**
 * Maps the values of an object using a transform function.
 * @param obj - The source object
 * @param fn - A function that receives each value and key, returning a new value
 * @returns A new object with transformed values
 * @example mapValues({ a: 1, b: 2 }, (v) => v * 2) // { a: 2, b: 4 }
 */
export function mapValues<V, R>(
  obj: Record<string, V>,
  fn: (value: V, key: string) => R,
): Record<string, R> {
  const result: Record<string, R> = {};

  for (const key of Object.keys(obj)) {
    result[key] = fn(obj[key] as V, key);
  }

  return result;
}
