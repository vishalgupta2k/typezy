/**
 * Represents any function type.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any;

/**
 * Checks if a value is a function.
 * @param value - The value to check
 * @returns `true` if the value is a function, `false` otherwise
 */
export function isFunction(value: unknown): value is AnyFunction {
  return typeof value === 'function';
}
