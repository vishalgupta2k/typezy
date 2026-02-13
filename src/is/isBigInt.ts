/**
 * Checks if a value is a bigint.
 * @param value - The value to check
 * @returns `true` if the value is a bigint, `false` otherwise
 */
export function isBigInt(value: unknown): value is bigint {
  return typeof value === 'bigint';
}
