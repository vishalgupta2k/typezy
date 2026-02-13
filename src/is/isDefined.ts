/**
 * Checks if a value is defined (not null and not undefined).
 * This is the opposite of isNullish.
 * @param value - The value to check
 * @returns `true` if the value is not null and not undefined, `false` otherwise
 * @example isDefined('hello') // true
 * @example isDefined(0) // true
 * @example isDefined(null) // false
 * @example isDefined(undefined) // false
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
