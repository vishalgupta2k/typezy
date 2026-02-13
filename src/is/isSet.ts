/**
 * Checks if a value is a Set.
 * @param value - The value to check
 * @returns `true` if the value is a Set, `false` otherwise
 */
export function isSet<T = unknown>(value: unknown): value is Set<T> {
  return value instanceof Set;
}
