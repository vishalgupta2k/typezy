/**
 * Checks if a value is falsy.
 * @param value - The value to check
 * @returns `true` if the value is falsy, `false` otherwise
 */
export function isFalsy(value: unknown): value is false | 0 | '' | null | undefined {
  return !value;
}
