import { isBoolean } from '../is/isBoolean.js';
import { AssertionError } from '../utils/AssertionError.js';

/**
 * Asserts that a value is a boolean.
 * @param value - The value to check
 * @param message - Optional custom error message
 * @throws {AssertionError} If the value is not a boolean
 */
export function assertBoolean(value: unknown, message?: string): asserts value is boolean {
  if (!isBoolean(value)) {
    throw new AssertionError(message ?? `Expected a boolean, but received ${typeof value}`);
  }
}
