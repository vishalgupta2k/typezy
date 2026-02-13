import { isString } from './isString.js';

/**
 * Checks if a value is a valid URL string.
 * @param value - The value to check
 * @returns `true` if the value is a valid URL string, `false` otherwise
 */
export function isURL(value: unknown): value is string {
  if (!isString(value)) {
    return false;
  }

  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}
