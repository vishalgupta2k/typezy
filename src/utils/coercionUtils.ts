import { isNullish } from '../is/isNullish.js';
import { isBoolean } from '../is/isBoolean.js';
import { isNumber } from '../is/isNumber.js';
import { isString } from '../is/isString.js';
import { isDefined } from '../is/isDefined.js';

/**
 * Safely converts a value to a number.
 * Returns undefined if the value cannot be converted to a valid number.
 * Unlike Number(), this returns undefined instead of NaN for invalid inputs.
 * @param value - The value to convert
 * @returns The number or undefined
 * @example toNumber('42') // 42
 * @example toNumber('abc') // undefined
 * @example toNumber(null) // undefined
 * @example toNumber('3.14') // 3.14
 */
export function toNumber(value: unknown): number | undefined {
  if (isNullish(value) || value === '') {
    return undefined;
  }
  const num = Number(value);
  return Number.isNaN(num) ? undefined : num;
}

/**
 * Safely converts a value to an integer.
 * Returns undefined if the value cannot be converted to a valid integer.
 * @param value - The value to convert
 * @returns The integer or undefined
 * @example toInteger('42') // 42
 * @example toInteger('3.7') // 3
 * @example toInteger('abc') // undefined
 */
export function toInteger(value: unknown): number | undefined {
  if (isNullish(value) || value === '') {
    return undefined;
  }
  if (isNumber(value)) {
    return Math.trunc(value);
  }
  if (isString(value)) {
    const num = Number.parseInt(value, 10);
    return Number.isNaN(num) ? undefined : num;
  }
  return undefined;
}

/**
 * Safely converts a value to a string.
 * Returns undefined if the value is null or undefined.
 * Unlike String(), this returns undefined for null/undefined inputs.
 * @param value - The value to convert
 * @returns The string or undefined
 * @example toString(42) // '42'
 * @example toString(null) // undefined
 * @example toString(true) // 'true'
 */
export function toString(value: unknown): string | undefined {
  if (isNullish(value)) {
    return undefined;
  }
  if (isString(value)) {
    return value;
  }
  if (isNumber(value) || isBoolean(value)) {
    return String(value);
  }
  return undefined;
}

/**
 * Safely converts a value to a boolean.
 * Recognizes 'true', '1', 'yes', 'on' as true (case-insensitive).
 * Recognizes 'false', '0', 'no', 'off' as false (case-insensitive).
 * Returns undefined for ambiguous values.
 * @param value - The value to convert
 * @returns The boolean or undefined
 * @example toBoolean('true') // true
 * @example toBoolean(1) // true
 * @example toBoolean('no') // false
 * @example toBoolean('maybe') // undefined
 */
export function toBoolean(value: unknown): boolean | undefined {
  if (isNullish(value)) {
    return undefined;
  }
  if (isBoolean(value)) {
    return value;
  }
  if (isNumber(value)) {
    if (value === 1) return true;
    if (value === 0) return false;
    return undefined;
  }
  if (!isString(value)) {
    return undefined;
  }
  const str = value.toLowerCase().trim();
  if (['true', '1', 'yes', 'on'].includes(str)) {
    return true;
  }
  if (['false', '0', 'no', 'off'].includes(str)) {
    return false;
  }
  return undefined;
}

/**
 * Returns the first non-null, non-undefined value from the arguments.
 * Similar to the ?? operator but works with multiple values.
 * @param values - The values to check
 * @returns The first defined value or undefined
 * @example coalesce(null, undefined, 'hello', 'world') // 'hello'
 * @example coalesce(0, 1, 2) // 0 (0 is not null/undefined)
 * @example coalesce(null, undefined) // undefined
 */
export function coalesce<T>(...values: (T | null | undefined)[]): T | undefined {
  for (const value of values) {
    if (isDefined(value)) {
      return value;
    }
  }
  return undefined;
}

/**
 * Returns the first truthy value from the arguments.
 * @param values - The values to check
 * @returns The first truthy value or undefined
 * @example coalesceTruthy(0, '', null, 'hello') // 'hello'
 * @example coalesceTruthy(false, 0, 42) // 42
 */
export function coalesceTruthy<T extends unknown[]>(
  ...values: T
): T[number] | undefined {
  for (const value of values) {
    if (value) {
      return value;
    }
  }
  return undefined;
}
