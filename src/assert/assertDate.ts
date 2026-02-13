import { isDate } from '../is/isDate.js';
import { AssertionError } from '../utils/AssertionError.js';

/**
 * Asserts that a value is a Date object.
 * @param value - The value to check
 * @param message - Optional custom error message
 * @throws {AssertionError} If the value is not a Date object
 */
export function assertDate(value: unknown, message?: string): asserts value is Date {
  if (!isDate(value)) {
    throw new AssertionError(message ?? `Expected a Date object, but received ${typeof value}`);
  }
}
