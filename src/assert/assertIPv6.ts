import { isIPv6 } from '../is/isIPv6.js';
import { AssertionError } from '../utils/AssertionError.js';

/**
 * Asserts that a value is a valid IPv6 address string.
 * @param value - The value to check
 * @param message - Optional custom error message
 * @throws {AssertionError} If the value is not a valid IPv6 address
 */
export function assertIPv6(value: unknown, message?: string): asserts value is string {
  if (!isIPv6(value)) {
    throw new AssertionError(message ?? `Expected a valid IPv6 address, but received ${String(value)}`);
  }
}
