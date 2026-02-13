import { isInteger } from '../is/isInteger.js';
import { AssertionError } from '../utils/AssertionError.js';

/**
 * Asserts that a value is an integer.
 * @param value - The value to check
 * @param message - Optional custom error message
 * @throws {AssertionError} If the value is not an integer
 */
export function assertInteger(value: unknown, message?: string): asserts value is number {
  if (!isInteger(value)) {
    throw new AssertionError(message ?? `Expected an integer, but received ${typeof value}`);
  }
}
