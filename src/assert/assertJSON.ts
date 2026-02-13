import { isJSON } from '../is/isJSON.js';
import { AssertionError } from '../utils/AssertionError.js';

/**
 * Asserts that a value is a valid JSON string.
 * @param value - The value to check
 * @param message - Optional custom error message
 * @throws {AssertionError} If the value is not a valid JSON string
 */
export function assertJSON(value: unknown, message?: string): asserts value is string {
  if (!isJSON(value)) {
    throw new AssertionError(message ?? `Expected a valid JSON string, but received ${String(value)}`);
  }
}
