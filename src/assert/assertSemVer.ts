import { isSemVer } from '../is/isSemVer.js';
import { AssertionError } from '../utils/AssertionError.js';

/**
 * Asserts that a value is a valid semantic version string.
 * @param value - The value to check
 * @param message - Optional custom error message
 * @throws {AssertionError} If the value is not a valid semver string
 */
export function assertSemVer(value: unknown, message?: string): asserts value is string {
  if (!isSemVer(value)) {
    throw new AssertionError(message ?? `Expected a valid semver string, but received ${String(value)}`);
  }
}
