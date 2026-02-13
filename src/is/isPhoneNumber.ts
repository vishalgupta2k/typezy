import { isString } from './isString.js';

/**
 * Basic phone number regex - supports various international formats.
 * Allows optional + prefix, digits, spaces, dashes, dots, and parentheses.
 */
const PHONE_REGEX = /^[+]?[\d\s\-().]{7,20}$/;

/**
 * Checks if a value is a valid phone number format.
 * @param value - The value to check
 * @returns `true` if the value looks like a phone number, `false` otherwise
 */
export function isPhoneNumber(value: unknown): value is string {
  if (!isString(value)) {
    return false;
  }

  const digits = value.replaceAll(/\D/g, '');
  return PHONE_REGEX.test(value) && digits.length >= 7 && digits.length <= 15;
}
