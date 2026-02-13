import { isFunction } from '../is/isFunction.js';
import { AssertionError } from '../utils/AssertionError.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any;

/**
 * Asserts that a value is a function.
 * @param value - The value to check
 * @param message - Optional custom error message
 * @throws {AssertionError} If the value is not a function
 */
export function assertFunction(value: unknown, message?: string): asserts value is AnyFunction {
  if (!isFunction(value)) {
    throw new AssertionError(message ?? `Expected a function, but received ${typeof value}`);
  }
}
