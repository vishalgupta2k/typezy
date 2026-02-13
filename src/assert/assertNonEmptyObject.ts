import { isNonEmptyObject } from '../is/isNonEmptyObject.js';
import { AssertionError } from '../utils/AssertionError.js';

/**
 * Asserts that a value is a non-empty plain object.
 * @param value - The value to check
 * @param message - Optional custom error message
 * @throws {AssertionError} If the value is not a non-empty object
 */
export function assertNonEmptyObject(
  value: unknown,
  message?: string,
): asserts value is Record<string, unknown> {
  if (!isNonEmptyObject(value)) {
    throw new AssertionError(message ?? `Expected a non-empty object, but received ${String(value)}`);
  }
}
