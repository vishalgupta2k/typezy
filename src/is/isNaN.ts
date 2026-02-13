/**
 * Checks if a value is NaN.
 * @param value - The value to check
 * @returns `true` if the value is NaN, `false` otherwise
 */
export function isNaNValue(value: unknown): boolean {
  return Number.isNaN(value);
}
