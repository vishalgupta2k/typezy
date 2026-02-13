import { isSlug } from '../is/isSlug.js';
import { AssertionError } from '../utils/AssertionError.js';

/**
 * Asserts that a value is a valid URL slug.
 * @param value - The value to check
 * @param message - Optional custom error message
 * @throws {AssertionError} If the value is not a valid slug
 */
export function assertSlug(value: unknown, message?: string): asserts value is string {
  if (!isSlug(value)) {
    throw new AssertionError(message ?? `Expected a valid slug, but received ${String(value)}`);
  }
}
