import { isString } from './isString.js';

/**
 * Checks if a value is a valid IPv6 address string.
 * @param value - The value to check
 * @returns `true` if the value is a valid IPv6 address, `false` otherwise
 */
export function isIPv6(value: unknown): value is string {
  if (!isString(value)) {
    return false;
  }

  // Use URL API for validation - it will throw for invalid IPv6
  try {
    const url = new URL(`http://[${value}]`);
    // URL normalizes the hostname, so just check it parsed successfully
    return url.hostname.startsWith('[') && url.hostname.endsWith(']');
  } catch {
    return false;
  }
}
