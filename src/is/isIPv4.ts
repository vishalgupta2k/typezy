import { isString } from './isString.js';

/**
 * Validates an IPv4 octet (0-255).
 */
function isValidOctet(octet: string): boolean {
  if (!/^\d{1,3}$/.test(octet)) {
    return false;
  }
  const num = Number.parseInt(octet, 10);
  return num >= 0 && num <= 255 && String(num) === octet;
}

/**
 * Checks if a value is a valid IPv4 address string.
 * @param value - The value to check
 * @returns `true` if the value is a valid IPv4 address, `false` otherwise
 */
export function isIPv4(value: unknown): value is string {
  if (!isString(value)) {
    return false;
  }

  const parts = value.split('.');
  if (parts.length !== 4) {
    return false;
  }

  return parts.every(isValidOctet);
}
