/**
 * Checks if a value is a plain object (not null, not an array, not a class instance).
 * @param value - The value to check
 * @returns `true` if the value is a plain object, `false` otherwise
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const proto = Object.getPrototypeOf(value);
  return proto === null || proto === Object.prototype;
}
