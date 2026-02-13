import { isNull } from "./isNull";

/**
 * Checks if a value is any object (not null).
 * @param value - The value to check
 * @returns `true` if the value is an object, `false` otherwise
 */
export function isObject(value: unknown): value is object {
  return !isNull(value) && typeof value === 'object';
}
