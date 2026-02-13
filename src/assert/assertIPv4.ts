import { isIPv4 } from '../is/isIPv4.js';
import { AssertionError } from '../utils/AssertionError.js';

/**
 * Asserts that a value is a valid IPv4 address string.
 * @param value - The value to check
 * @param message - Optional custom error message
 * @throws {AssertionError} If the value is not a valid IPv4 address
 */
export function assertIPv4(value: unknown, message?: string): asserts value is string {
  if (!isIPv4(value)) {
    throw new AssertionError(message ?? `Expected a valid IPv4 address, but received ${String(value)}`);
  }
}
