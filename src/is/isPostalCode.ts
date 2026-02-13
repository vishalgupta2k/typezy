import { isString } from './isString.js';

/**
 * Common postal code patterns by country/region.
 */
const POSTAL_PATTERNS: Record<string, RegExp> = {
  US: /^\d{5}(-\d{4})?$/,
  UK: /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i,
  CA: /^[A-Z]\d[A-Z]\s*\d[A-Z]\d$/i,
  DE: /^\d{5}$/,
  FR: /^\d{5}$/,
  IN: /^\d{6}$/,
  AU: /^\d{4}$/,
  JP: /^\d{3}-?\d{4}$/,
  BR: /^\d{5}-?\d{3}$/,
  ANY: /^[\dA-Z]{3,10}$/i,
};

/**
 * Checks if a value is a valid postal code.
 * @param value - The value to check
 * @param countryCode - Optional country code (US, UK, CA, DE, FR, IN, AU, JP, BR) or 'ANY'
 * @returns `true` if the value is a valid postal code, `false` otherwise
 */
export function isPostalCode(value: unknown, countryCode: string = 'ANY'): value is string {
  if (!isString(value)) {
    return false;
  }

  const pattern = POSTAL_PATTERNS[countryCode.toUpperCase()] ?? POSTAL_PATTERNS.ANY;
  return pattern?.test(value.trim()) ?? false;
}
