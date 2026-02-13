import { isArray } from './isArray.js';
import { isPlainObject } from './isPlainObject.js';
import { isDate } from './isDate.js';

/** Compares two Date objects */
function areDatesEqual(a: Date, b: Date): boolean {
  return a.getTime() === b.getTime();
}

/** Compares two arrays deeply */
function areArraysEqual(a: unknown[], b: unknown[]): boolean {
  if (a.length !== b.length) {
    return false;
  }
  return a.every((item, index) => isEqual(item, b[index]));
}

/** Compares two plain objects deeply */
function areObjectsEqual(a: Record<string, unknown>, b: Record<string, unknown>): boolean {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) {
    return false;
  }

  return keysA.every((key) => isEqual(a[key], b[key]));
}

/** Compares two Maps deeply */
function areMapsEqual(a: Map<unknown, unknown>, b: Map<unknown, unknown>): boolean {
  if (a.size !== b.size) {
    return false;
  }
  for (const [key, val] of a) {
    if (!b.has(key) || !isEqual(val, b.get(key))) {
      return false;
    }
  }
  return true;
}

/** Compares two Sets */
function areSetsEqual(a: Set<unknown>, b: Set<unknown>): boolean {
  if (a.size !== b.size) {
    return false;
  }
  for (const val of a) {
    if (!b.has(val)) {
      return false;
    }
  }
  return true;
}

/** Handles comparison of special object types */
function compareSpecialTypes(a: unknown, b: unknown): boolean | null {
  // Handle Dates
  if (isDate(a) && isDate(b)) {
    return areDatesEqual(a, b);
  }

  // Handle Arrays
  if (isArray(a) && isArray(b)) {
    return areArraysEqual(a, b);
  }

  // Handle Objects
  if (isPlainObject(a) && isPlainObject(b)) {
    return areObjectsEqual(a, b);
  }

  // Handle RegExp
  if (a instanceof RegExp && b instanceof RegExp) {
    return a.toString() === b.toString();
  }

  // Handle Map
  if (a instanceof Map && b instanceof Map) {
    return areMapsEqual(a, b);
  }

  // Handle Set
  if (a instanceof Set && b instanceof Set) {
    return areSetsEqual(a, b);
  }

  return null; // No match found
}

/**
 * Performs a deep equality check between two values.
 * @param a - First value
 * @param b - Second value
 * @returns `true` if values are deeply equal, `false` otherwise
 */
export function isEqual(a: unknown, b: unknown): boolean {
  // Same reference or both primitives with same value
  if (a === b) {
    return true;
  }

  // Handle null/undefined
  if (a === null || b === null || a === undefined || b === undefined) {
    return a === b;
  }

  // Handle NaN
  if (Number.isNaN(a) && Number.isNaN(b)) {
    return true;
  }

  // Different types
  if (typeof a !== typeof b) {
    return false;
  }

  // Try comparing special types
  const result = compareSpecialTypes(a, b);
  return result ?? false;
}

/**
 * Checks if two arrays are equal (deep comparison).
 * @param a - First array
 * @param b - Second array
 * @returns `true` if arrays are deeply equal, `false` otherwise
 */
export function isArrayEqual(a: unknown, b: unknown): boolean {
  if (!isArray(a) || !isArray(b)) {
    return false;
  }
  return isEqual(a, b);
}

/**
 * Checks if two objects are equal (deep comparison).
 * @param a - First object
 * @param b - Second object
 * @returns `true` if objects are deeply equal, `false` otherwise
 */
export function isObjectEqual(a: unknown, b: unknown): boolean {
  if (!isPlainObject(a) || !isPlainObject(b)) {
    return false;
  }
  return isEqual(a, b);
}

/**
 * Checks if a value has changed from old to new.
 * @param oldValue - The old value
 * @param newValue - The new value
 * @returns `true` if values are different, `false` if same
 */
export function hasChanged(oldValue: unknown, newValue: unknown): boolean {
  return !isEqual(oldValue, newValue);
}

/**
 * Gets the changed keys between two objects.
 * @param oldObj - The old object
 * @param newObj - The new object
 * @returns Array of keys that have changed
 */
export function getChangedKeys(oldObj: unknown, newObj: unknown): string[] {
  if (!isPlainObject(oldObj) || !isPlainObject(newObj)) {
    return [];
  }

  const allKeys = new Set([...Object.keys(oldObj), ...Object.keys(newObj)]);
  const changedKeys: string[] = [];

  for (const key of allKeys) {
    if (!isEqual(oldObj[key], newObj[key])) {
      changedKeys.push(key);
    }
  }

  return changedKeys;
}

/**
 * Checks if any of the specified keys have changed between two objects.
 * @param oldObj - The old object
 * @param newObj - The new object
 * @param keys - The keys to check for changes
 * @returns `true` if any of the specified keys changed, `false` otherwise
 */
export function hasKeysChanged(oldObj: unknown, newObj: unknown, keys: string[]): boolean {
  if (!isPlainObject(oldObj) || !isPlainObject(newObj)) {
    return true;
  }

  return keys.some((key) => !isEqual(oldObj[key], newObj[key]));
}

/**
 * Performs a shallow equality check between two values.
 * @param a - First value
 * @param b - Second value
 * @returns `true` if values are shallowly equal, `false` otherwise
 */
export function isShallowEqual(a: unknown, b: unknown): boolean {
  if (a === b) {
    return true;
  }

  if (typeof a !== typeof b) {
    return false;
  }

  if (isArray(a) && isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    return a.every((item, index) => item === b[index]);
  }

  if (isPlainObject(a) && isPlainObject(b)) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
      return false;
    }

    return keysA.every((key) => a[key] === b[key]);
  }

  return false;
}
