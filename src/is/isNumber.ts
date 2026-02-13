/**
 * Checks if a value is a number (excluding NaN).
 * @param value - The value to check
 * @returns `true` if the value is a finite number, `false` otherwise
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value);
}
