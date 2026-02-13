/**
 * Checks if a value is a Date object.
 * @param value - The value to check
 * @returns `true` if the value is a Date object, `false` otherwise
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date;
}
