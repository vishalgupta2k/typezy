import { isURL } from '../is/isURL.js';
import { AssertionError } from '../utils/AssertionError.js';

/**
 * Asserts that a value is a valid URL string.
 * @param value - The value to check
 * @param message - Optional custom error message
 * @throws {AssertionError} If the value is not a valid URL
 */
export function assertURL(value: unknown, message?: string): asserts value is string {
  if (!isURL(value)) {
    throw new AssertionError(message ?? `Expected a valid URL, but received ${String(value)}`);
  }
}
