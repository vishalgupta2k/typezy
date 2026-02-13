import { isString } from './isString.js';

/**
 * Hex color regex pattern (3 or 6 character hex with optional #).
 */
const HEX_COLOR_REGEX = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

/**
 * Checks if a value is a valid hex color string.
 * @param value - The value to check
 * @returns `true` if the value is a valid hex color string, `false` otherwise
 */
export function isHexColor(value: unknown): value is string {
  if (!isString(value)) {
    return false;
  }

  return HEX_COLOR_REGEX.test(value);
}
