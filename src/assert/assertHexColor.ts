import { isHexColor } from '../is/isHexColor.js';
import { AssertionError } from '../utils/AssertionError.js';

/**
 * Asserts that a value is a valid hex color string.
 * @param value - The value to check
 * @param message - Optional custom error message
 * @throws {AssertionError} If the value is not a valid hex color
 */
export function assertHexColor(value: unknown, message?: string): asserts value is string {
  if (!isHexColor(value)) {
    throw new AssertionError(message ?? `Expected a valid hex color, but received ${String(value)}`);
  }
}
