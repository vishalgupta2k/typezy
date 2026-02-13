import { isString } from './isString.js';

/**
 * Checks if a value is a valid JSON string.
 * @param value - The value to check
 * @returns `true` if the value is a valid JSON string, `false` otherwise
 */
export function isJSON(value: unknown): value is string {
  if (!isString(value)) {
    return false;
  }

  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
}
