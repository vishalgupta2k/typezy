import { isStrongPassword } from '../is/isStrongPassword.js';
import type { PasswordOptions } from '../is/isStrongPassword.js';
import { AssertionError } from '../utils/AssertionError.js';

/**
 * Asserts that a value is a strong password.
 * @param value - The value to check
 * @param options - Optional password strength options
 * @param message - Optional custom error message
 * @throws {AssertionError} If the value is not a strong password
 */
export function assertStrongPassword(
  value: unknown,
  options?: PasswordOptions,
  message?: string,
): asserts value is string {
  if (!isStrongPassword(value, options)) {
    throw new AssertionError(message ?? `Expected a strong password, but received ${String(value)}`);
  }
}
