import { isString } from '../is/isString.js';
import { AssertionError } from './AssertionError.js';

/**
 * Gets an environment variable value, throwing if it's not defined or empty.
 * Useful for validating required env vars in Next.js config or server startup.
 * @param name - The environment variable name
 * @param message - Optional custom error message
 * @returns The environment variable value
 * @throws {AssertionError} If the environment variable is not set or empty
 * @example const dbUrl = requireEnv('DATABASE_URL');
 */
export function requireEnv(name: string, message?: string): string {
  const value = typeof process === 'undefined' ? undefined : process.env[name];

  if (!isString(value) || value.trim() === '') {
    throw new AssertionError(
      message ?? `Required environment variable "${name}" is not defined or is empty`,
    );
  }

  return value;
}

/**
 * Gets an environment variable and parses it as a number.
 * @param name - The environment variable name
 * @param message - Optional custom error message
 * @returns The parsed number
 * @throws {AssertionError} If the variable is not defined or not a valid number
 * @example const port = requireEnvNumber('PORT');
 */
export function requireEnvNumber(name: string, message?: string): number {
  const raw = requireEnv(name, message);
  const parsed = Number(raw);

  if (Number.isNaN(parsed)) {
    throw new AssertionError(
      message ?? `Environment variable "${name}" is not a valid number: "${raw}"`,
    );
  }

  return parsed;
}

/**
 * Gets an environment variable and parses it as a boolean.
 * Accepts 'true', '1', 'yes' as true and 'false', '0', 'no' as false.
 * @param name - The environment variable name
 * @param message - Optional custom error message
 * @returns The parsed boolean
 * @throws {AssertionError} If the variable is not defined or not a valid boolean representation
 * @example const isDebug = requireEnvBoolean('DEBUG');
 */
export function requireEnvBoolean(name: string, message?: string): boolean {
  const raw = requireEnv(name, message).toLowerCase().trim();
  const truthyValues = ['true', '1', 'yes'];
  const falsyValues = ['false', '0', 'no'];

  if (truthyValues.includes(raw)) {
    return true;
  }

  if (falsyValues.includes(raw)) {
    return false;
  }

  throw new AssertionError(
    message ?? `Environment variable "${name}" is not a valid boolean: "${raw}"`,
  );
}

/**
 * Checks if an environment variable is defined and non-empty.
 * @param name - The environment variable name
 * @returns `true` if the env var is defined and non-empty
 * @example if (isEnvDefined('ANALYTICS_KEY')) { initAnalytics(); }
 */
export function isEnvDefined(name: string): boolean {
  const value = typeof process === 'undefined' ? undefined : process.env[name];
  return isString(value) && value.trim() !== '';
}
