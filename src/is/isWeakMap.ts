/**
 * Checks if a value is a WeakMap.
 * @param value - The value to check
 * @returns `true` if the value is a WeakMap, `false` otherwise
 */
export function isWeakMap<K extends object = object, V = unknown>(value: unknown): value is WeakMap<K, V> {
  return value instanceof WeakMap;
}
