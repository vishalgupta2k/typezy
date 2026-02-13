import { isString } from './isString.js';

/**
 * Checks if a string matches a given pattern.
 * @param value - The value to check
 * @param pattern - The regex pattern to match against
 * @returns `true` if the string matches the pattern, `false` otherwise
 */
export function matches(value: unknown, pattern: RegExp): value is string {
  if (!isString(value)) {
    return false;
  }
  return pattern.test(value);
}

/**
 * Checks if a string starts with any of the given prefixes.
 * @param value - The value to check
 * @param prefixes - The prefixes to check for
 * @returns `true` if the string starts with any prefix, `false` otherwise
 */
export function startsWith(value: unknown, ...prefixes: string[]): value is string {
  if (!isString(value)) {
    return false;
  }
  return prefixes.some((prefix) => value.startsWith(prefix));
}

/**
 * Checks if a string ends with any of the given suffixes.
 * @param value - The value to check
 * @param suffixes - The suffixes to check for
 * @returns `true` if the string ends with any suffix, `false` otherwise
 */
export function endsWith(value: unknown, ...suffixes: string[]): value is string {
  if (!isString(value)) {
    return false;
  }
  return suffixes.some((suffix) => value.endsWith(suffix));
}

/**
 * Checks if a string contains a substring.
 * @param value - The value to check
 * @param substring - The substring to look for
 * @returns `true` if the string contains the substring, `false` otherwise
 */
export function contains(value: unknown, substring: string): value is string {
  if (!isString(value)) {
    return false;
  }
  return value.includes(substring);
}

/**
 * Checks if a value equals one of the allowed values.
 * @param value - The value to check
 * @param allowed - The allowed values
 * @returns `true` if the value is one of the allowed values, `false` otherwise
 */
export function isOneOf<T>(value: unknown, allowed: readonly T[]): value is T {
  return allowed.includes(value as T);
}

/**
 * Checks if a value is not one of the disallowed values.
 * @param value - The value to check
 * @param disallowed - The disallowed values
 * @returns `true` if the value is not in the disallowed list, `false` otherwise
 */
export function isNoneOf<T>(value: T, disallowed: readonly T[]): boolean {
  return !disallowed.includes(value);
}
