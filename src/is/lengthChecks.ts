import { isString } from './isString.js';

/**
 * Checks if a value has a minimum length (works with strings and arrays).
 * @param value - The value to check
 * @param minLength - The minimum length required
 * @returns `true` if the value has at least the minimum length, `false` otherwise
 */
export function hasMinLength(value: unknown, minLength: number): boolean {
  if (isString(value) || Array.isArray(value)) {
    return value.length >= minLength;
  }
  return false;
}

/**
 * Checks if a value has a maximum length (works with strings and arrays).
 * @param value - The value to check
 * @param maxLength - The maximum length allowed
 * @returns `true` if the value has at most the maximum length, `false` otherwise
 */
export function hasMaxLength(value: unknown, maxLength: number): boolean {
  if (isString(value) || Array.isArray(value)) {
    return value.length <= maxLength;
  }
  return false;
}

/**
 * Checks if a value has an exact length (works with strings and arrays).
 * @param value - The value to check
 * @param length - The exact length required
 * @returns `true` if the value has the exact length, `false` otherwise
 */
export function hasLength(value: unknown, length: number): boolean {
  if (isString(value) || Array.isArray(value)) {
    return value.length === length;
  }
  return false;
}

/**
 * Checks if a value's length is within a range (works with strings and arrays).
 * @param value - The value to check
 * @param min - The minimum length
 * @param max - The maximum length
 * @returns `true` if the value's length is within the range, `false` otherwise
 */
export function hasLengthBetween(value: unknown, min: number, max: number): boolean {
  if (isString(value) || Array.isArray(value)) {
    return value.length >= min && value.length <= max;
  }
  return false;
}
