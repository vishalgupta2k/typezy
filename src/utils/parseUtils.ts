import { isNullish } from '../is/isNullish.js';
import { isBoolean } from '../is/isBoolean.js';
import { isNumber } from '../is/isNumber.js';
import { isString } from '../is/isString.js';

/**
 * Parses a value to a number with a default fallback.
 * Returns the default if the value cannot be converted to a valid number.
 * @param value - The value to parse
 * @param defaultValue - The default value to return if parsing fails
 * @returns The parsed number or the default value
 * @example parseNumber('42', 0) // 42
 * @example parseNumber('abc', 0) // 0
 * @example parseNumber(null, 10) // 10
 * @example parseNumber('3.14', 0) // 3.14
 */
export function parseNumber(value: unknown, defaultValue: number): number {
  if (isNullish(value) || value === '') {
    return defaultValue;
  }
  const num = Number(value);
  return Number.isNaN(num) ? defaultValue : num;
}

/**
 * Parses a value to an integer with a default fallback.
 * Returns the default if the value cannot be converted to a valid integer.
 * @param value - The value to parse
 * @param defaultValue - The default value to return if parsing fails
 * @returns The parsed integer or the default value
 * @example parseInteger('42', 0) // 42
 * @example parseInteger('3.7', 0) // 3
 * @example parseInteger('abc', 0) // 0
 */
export function parseInteger(value: unknown, defaultValue: number): number {
  if (isNullish(value) || value === '') {
    return defaultValue;
  }
  if (isNumber(value)) {
    return Math.trunc(value);
  }
  if (isString(value)) {
    const num = Number.parseInt(value, 10);
    return Number.isNaN(num) ? defaultValue : num;
  }
  return defaultValue;
}

/**
 * Parses a value to a string with a default fallback.
 * Returns the default if the value is null or undefined.
 * @param value - The value to parse
 * @param defaultValue - The default value to return if parsing fails
 * @returns The parsed string or the default value
 * @example parseString('hello', '') // 'hello'
 * @example parseString(null, 'default') // 'default'
 * @example parseString(42, '') // '42'
 */
export function parseString(value: unknown, defaultValue: string): string {
  if (isNullish(value)) {
    return defaultValue;
  }
  if (isString(value)) {
    return value;
  }
  if (isNumber(value) || isBoolean(value)) {
    return String(value);
  }
  return defaultValue;
}

/**
 * Parses a value to a boolean with a default fallback.
 * Recognizes 'true', '1', 'yes', 'on' as truthy (case-insensitive).
 * Recognizes 'false', '0', 'no', 'off' as falsy (case-insensitive).
 * @param value - The value to parse
 * @param defaultValue - The default value to return if parsing fails
 * @returns The parsed boolean or the default value
 * @example parseBoolean('true', false) // true
 * @example parseBoolean('1', false) // true
 * @example parseBoolean('no', true) // false
 * @example parseBoolean('maybe', false) // false
 */
export function parseBoolean(value: unknown, defaultValue: boolean): boolean {
  if (isNullish(value)) {
    return defaultValue;
  }
  if (isBoolean(value)) {
    return value;
  }
  if (isNumber(value)) {
    return value !== 0;
  }
  if (!isString(value)) {
    return defaultValue;
  }
  const str = value.toLowerCase().trim();
  if (['true', '1', 'yes', 'on'].includes(str)) {
    return true;
  }
  if (['false', '0', 'no', 'off'].includes(str)) {
    return false;
  }
  return defaultValue;
}

/**
 * Parses a JSON string with a default fallback.
 * Returns the default if the value is not valid JSON.
 * @param value - The JSON string to parse
 * @param defaultValue - The default value to return if parsing fails
 * @returns The parsed object or the default value
 * @example parseJSON('{"a":1}', {}) // { a: 1 }
 * @example parseJSON('invalid', {}) // {}
 * @example parseJSON(null, []) // []
 */
export function parseJSON<T>(value: unknown, defaultValue: T): T {
  if (isNullish(value) || value === '') {
    return defaultValue;
  }
  if (!isString(value)) {
    return defaultValue;
  }
  try {
    return JSON.parse(value) as T;
  } catch {
    return defaultValue;
  }
}

/**
 * Parses a comma-separated string into an array with trimmed values.
 * @param value - The string to parse
 * @param separator - The separator (default: ',')
 * @param defaultValue - The default value to return if parsing fails
 * @returns The parsed array or the default value
 * @example parseArray('a,b,c', ',', []) // ['a', 'b', 'c']
 * @example parseArray('a | b | c', '|', []) // ['a', 'b', 'c']
 * @example parseArray(null, ',', ['default']) // ['default']
 */
export function parseArray(
  value: unknown,
  separator: string = ',',
  defaultValue: string[] = []
): string[] {
  if (isNullish(value) || value === '') {
    return defaultValue;
  }
  if (typeof value !== 'string') {
    return defaultValue;
  }
  return value
    .split(separator)
    .map((item) => item.trim())
    .filter((item) => item !== '');
}
