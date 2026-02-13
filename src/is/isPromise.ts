/**
 * Checks if a value is a Promise.
 * @param value - The value to check
 * @returns `true` if the value is a Promise, `false` otherwise
 */
export function isPromise<T = unknown>(value: unknown): value is Promise<T> {
  return (
    value instanceof Promise ||
    (value !== null &&
      typeof value === 'object' &&
      'then' in value &&
      typeof (value as Promise<T>).then === 'function' &&
      'catch' in value &&
      typeof (value as Promise<T>).catch === 'function')
  );
}
