import { isUUID } from '../is/isUUID.js';
import { AssertionError } from '../utils/AssertionError.js';

/**
 * Asserts that a value is a valid UUID string.
 * @param value - The value to check
 * @param message - Optional custom error message
 * @throws {AssertionError} If the value is not a valid UUID
 */
export function assertUUID(value: unknown, message?: string): asserts value is string {
  if (!isUUID(value)) {
    throw new AssertionError(message ?? `Expected a valid UUID, but received ${String(value)}`);
  }
}
