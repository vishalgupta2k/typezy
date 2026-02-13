/**
 * Checks if a value is truthy.
 * @param value - The value to check
 * @returns `true` if the value is truthy, `false` otherwise
 */
export function isTruthy<T>(value: T): value is Exclude<T, false | 0 | '' | null | undefined> {
  return Boolean(value);
}
