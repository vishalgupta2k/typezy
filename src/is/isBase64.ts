import { isString } from './isString.js';

/**
 * Basic Base64 regex pattern.
 */
const BASE64_REGEX = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

/**
 * Checks if a value is a valid Base64 encoded string.
 * @param value - The value to check
 * @returns `true` if the value is a valid Base64 string, `false` otherwise
 */
export function isBase64(value: unknown): value is string {
  if (!isString(value) || value.length === 0) {
    return false;
  }

  return BASE64_REGEX.test(value);
}
