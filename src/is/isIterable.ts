/**
 * Checks if a value is iterable (has Symbol.iterator).
 * @param value - The value to check
 * @returns `true` if the value is iterable, `false` otherwise
 */
export function isIterable<T = unknown>(value: unknown): value is Iterable<T> {
  if (value === null || value === undefined) {
    return false;
  }

  return typeof (value as Iterable<T>)[Symbol.iterator] === 'function';
}
