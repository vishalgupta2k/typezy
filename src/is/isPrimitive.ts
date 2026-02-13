/**
 * Primitive types in JavaScript.
 */
type Primitive = string | number | boolean | bigint | symbol | null | undefined;

/**
 * Checks if a value is a primitive type.
 * @param value - The value to check
 * @returns `true` if the value is a primitive, `false` otherwise
 */
export function isPrimitive(value: unknown): value is Primitive {
  return value === null || (typeof value !== 'object' && typeof value !== 'function');
}
