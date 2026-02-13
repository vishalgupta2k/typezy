/**
 * Checks if a value is undefined.
 * @param value - The value to check
 * @returns `true` if the value is undefined, `false` otherwise
 */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}
