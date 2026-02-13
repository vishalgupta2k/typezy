/**
 * Checks if a value is a WeakSet.
 * @param value - The value to check
 * @returns `true` if the value is a WeakSet, `false` otherwise
 */
export function isWeakSet<T extends object = object>(value: unknown): value is WeakSet<T> {
  return value instanceof WeakSet;
}
