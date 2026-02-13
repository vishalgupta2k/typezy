/**
 * Checks if a value is an async function.
 * @param value - The value to check
 * @returns `true` if the value is an async function, `false` otherwise
 */
export function isAsyncFunction(value: unknown): value is (...args: unknown[]) => Promise<unknown> {
  return Object.prototype.toString.call(value) === '[object AsyncFunction]';
}
