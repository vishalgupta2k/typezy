import { isPostalCode } from '../is/isPostalCode.js';
import { AssertionError } from '../utils/AssertionError.js';

/**
 * Asserts that a value is a valid postal code.
 * @param value - The value to check
 * @param countryCode - Optional country code (US, UK, CA, DE, FR, IN, AU, JP, BR) or 'ANY'
 * @param message - Optional custom error message
 * @throws {AssertionError} If the value is not a valid postal code
 */
export function assertPostalCode(
  value: unknown,
  countryCode: string = 'ANY',
  message?: string,
): asserts value is string {
  if (!isPostalCode(value, countryCode)) {
    throw new AssertionError(message ?? `Expected a valid postal code, but received ${String(value)}`);
  }
}
