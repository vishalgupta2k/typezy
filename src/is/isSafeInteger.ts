/**
 * Checks if a value is a safe integer.
 * A safe integer is an integer that can be exactly represented as an IEEE-754 double precision number.
 * @param value - The value to check
 * @returns `true` if the value is a safe integer, `false` otherwise
 */
export function isSafeInteger(value: unknown): value is number {
  return Number.isSafeInteger(value);
}
