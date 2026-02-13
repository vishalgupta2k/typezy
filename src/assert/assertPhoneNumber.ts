import { isPhoneNumber } from '../is/isPhoneNumber.js';
import { AssertionError } from '../utils/AssertionError.js';

/**
 * Asserts that a value is a valid phone number string.
 * @param value - The value to check
 * @param message - Optional custom error message
 * @throws {AssertionError} If the value is not a valid phone number
 */
export function assertPhoneNumber(value: unknown, message?: string): asserts value is string {
  if (!isPhoneNumber(value)) {
    throw new AssertionError(message ?? `Expected a valid phone number, but received ${String(value)}`);
  }
}
