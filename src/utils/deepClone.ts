/**
 * Creates a deep clone of the provided value.
 * Uses `structuredClone` if available, falling back to JSON serialization for older environments.
 * Note: JSON fallback does not support Dates, Maps, Sets, or circular references.
 * @param value - The value to deeply clone
 * @returns A deep clone of the value
 * @example
 * const original = { a: 1, b: { c: 2 } };
 * const copy = deepClone(original);
 * copy.b.c = 3; // original.b.c remains 2
 */
export function deepClone<T>(value: T): T {
  if (typeof structuredClone === 'function') {
    return structuredClone(value);
  }
  
  if (value === undefined) {
    return value;
  }

  // Fallback for environments without structuredClone
  return JSON.parse(JSON.stringify(value));
}
