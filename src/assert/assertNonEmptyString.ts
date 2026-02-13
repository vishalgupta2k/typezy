import { isNonEmptyString } from '../is/isNonEmptyString.js';
import { AssertionError } from '../utils/AssertionError.js';

/**
 * Asserts that a value is a non-empty string.
 * @param value - The value to check
 * @param message - Optional custom error message
 * @throws {AssertionError} If the value is not a non-empty string
 */
export function assertNonEmptyString(value: unknown, message?: string): asserts value is string {
  if (!isNonEmptyString(value)) {
    throw new AssertionError(message ?? `Expected a non-empty string, but received ${typeof value}`);
  }
}
