import { isString } from './isString.js';

/**
 * UUID regex pattern (v1-v5 and NIL UUID).
 */
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Checks if a value is a valid UUID string.
 * @param value - The value to check
 * @returns `true` if the value is a valid UUID string, `false` otherwise
 */
export function isUUID(value: unknown): value is string {
  if (!isString(value)) {
    return false;
  }

  return UUID_REGEX.test(value);
}
