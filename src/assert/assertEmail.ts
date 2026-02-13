import { isEmail } from '../is/isEmail.js';
import { AssertionError } from '../utils/AssertionError.js';

/**
 * Asserts that a value is a valid email string.
 * @param value - The value to check
 * @param message - Optional custom error message
 * @throws {AssertionError} If the value is not a valid email
 */
export function assertEmail(value: unknown, message?: string): asserts value is string {
  if (!isEmail(value)) {
    throw new AssertionError(message ?? `Expected a valid email, but received ${String(value)}`);
  }
}
