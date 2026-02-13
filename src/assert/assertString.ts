import { isString } from '../is/isString.js';
import { AssertionError } from '../utils/AssertionError.js';

/**
 * Asserts that a value is a string.
 * @param value - The value to check
 * @param message - Optional custom error message
 * @throws {AssertionError} If the value is not a string
 */
export function assertString(value: unknown, message?: string): asserts value is string {
  if (!isString(value)) {
    throw new AssertionError(message ?? `Expected a string, but received ${typeof value}`);
  }
}
