import { isString } from './isString.js';

/**
 * Slug regex pattern (lowercase alphanumeric with hyphens).
 */
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Checks if a value is a valid URL slug.
 * @param value - The value to check
 * @returns `true` if the value is a valid slug, `false` otherwise
 */
export function isSlug(value: unknown): value is string {
  if (!isString(value) || value.length === 0) {
    return false;
  }

  return SLUG_REGEX.test(value);
}
