/**
 * Checks if a value is a Map.
 * @param value - The value to check
 * @returns `true` if the value is a Map, `false` otherwise
 */
export function isMap<K = unknown, V = unknown>(value: unknown): value is Map<K, V> {
  return value instanceof Map;
}
