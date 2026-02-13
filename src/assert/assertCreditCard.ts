import { isCreditCard } from '../is/isCreditCard.js';
import { AssertionError } from '../utils/AssertionError.js';

/**
 * Asserts that a value is a valid credit card number string.
 * @param value - The value to check
 * @param message - Optional custom error message
 * @throws {AssertionError} If the value is not a valid credit card number
 */
export function assertCreditCard(value: unknown, message?: string): asserts value is string {
  if (!isCreditCard(value)) {
    throw new AssertionError(message ?? `Expected a valid credit card number, but received ${String(value)}`);
  }
}
