import { isArray } from '../is/isArray.js';
import { AssertionError } from '../utils/AssertionError.js';

/**
 * Asserts that a value is an array.
 * @param value - The value to check
 * @param message - Optional custom error message
 * @throws {AssertionError} If the value is not an array
 */
export function assertArray(value: unknown, message?: string): asserts value is unknown[] {
  if (!isArray(value)) {
    throw new AssertionError(message ?? `Expected an array, but received ${typeof value}`);
  }
}
