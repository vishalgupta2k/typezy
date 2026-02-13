import { isInRange } from '../is/isInRange.js';
import { AssertionError } from '../utils/AssertionError.js';

/**
 * Asserts that a value is a number within a specified range (inclusive).
 * @param value - The value to check
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @param message - Optional custom error message
 * @throws {AssertionError} If the value is not a number in range
 */
export function assertInRange(
  value: unknown,
  min: number,
  max: number,
  message?: string,
): asserts value is number {
  if (!isInRange(value, min, max)) {
    throw new AssertionError(
      message ?? `Expected a number between ${min} and ${max}, but received ${String(value)}`,
    );
  }
}
