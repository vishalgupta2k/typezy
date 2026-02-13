import { isPlainObject } from '../is/isPlainObject.js';
import { AssertionError } from '../utils/AssertionError.js';

/**
 * Asserts that a value is a plain object.
 * @param value - The value to check
 * @param message - Optional custom error message
 * @throws {AssertionError} If the value is not a plain object
 */
export function assertPlainObject(value: unknown, message?: string): asserts value is Record<string, unknown> {
  if (!isPlainObject(value)) {
    throw new AssertionError(message ?? `Expected a plain object, but received ${typeof value}`);
  }
}
