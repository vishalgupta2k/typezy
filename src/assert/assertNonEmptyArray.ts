import { isNonEmptyArray } from '../is/isNonEmptyArray.js';
import { AssertionError } from '../utils/AssertionError.js';

/**
 * Asserts that a value is a non-empty array.
 * @param value - The value to check
 * @param message - Optional custom error message
 * @throws {AssertionError} If the value is not a non-empty array
 */
export function assertNonEmptyArray<T>(value: unknown, message?: string): asserts value is [T, ...T[]] {
  if (!isNonEmptyArray(value)) {
    throw new AssertionError(message ?? `Expected a non-empty array, but received ${typeof value}`);
  }
}
