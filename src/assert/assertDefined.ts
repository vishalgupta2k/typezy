import { AssertionError } from '../utils/AssertionError.js';

/**
 * Asserts that a value is not null or undefined.
 * @param value - The value to check
 * @param message - Optional custom error message
 * @throws {AssertionError} If the value is null or undefined
 */
export function assertDefined<T>(value: T, message?: string): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    throw new AssertionError(message ?? `Expected a defined value, but received ${value}`);
  }
}
