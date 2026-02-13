/**
 * Array-like object interface.
 */
interface ArrayLike<T> {
  readonly length: number;
  readonly [n: number]: T;
}

/**
 * Checks if a value is array-like (has a length property).
 * @param value - The value to check
 * @returns `true` if the value is array-like, `false` otherwise
 */
export function isArrayLike<T = unknown>(value: unknown): value is ArrayLike<T> {
  if (value === null || value === undefined) {
    return false;
  }

  if (typeof value === 'function') {
    return false;
  }

  if (typeof value === 'string') {
    return true;
  }

  if (typeof value !== 'object') {
    return false;
  }

  const length = (value as ArrayLike<T>).length;
  return typeof length === 'number' && length >= 0 && Number.isInteger(length);
}
