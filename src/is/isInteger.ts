/**
 * Checks if a value is an integer.
 * @param value - The value to check
 * @returns `true` if the value is an integer, `false` otherwise
 */
export function isInteger(value: unknown): value is number {
  return Number.isInteger(value);
}
