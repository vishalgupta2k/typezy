/**
 * Checks if a value is a generator function.
 * @param value - The value to check
 * @returns `true` if the value is a generator function, `false` otherwise
 */
export function isGeneratorFunction(value: unknown): value is GeneratorFunction {
  return Object.prototype.toString.call(value) === '[object GeneratorFunction]';
}
