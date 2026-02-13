import { isNumber } from '../is/isNumber.js';
import { AssertionError } from '../utils/AssertionError.js';

/**
 * Asserts that a value is a number (excluding NaN).
 * @param value - The value to check
 * @param message - Optional custom error message
 * @throws {AssertionError} If the value is not a number
 */
export function assertNumber(value: unknown, message?: string): asserts value is number {
  if (!isNumber(value)) {
    throw new AssertionError(message ?? `Expected a number, but received ${typeof value}`);
  }
}
