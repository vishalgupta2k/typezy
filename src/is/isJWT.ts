import { isString } from './isString.js';

/**
 * JWT regex pattern (three base64url encoded parts separated by dots).
 */
const JWT_REGEX = /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]*$/;

/**
 * Checks if a value is a valid JWT (JSON Web Token) format.
 * Note: This only validates the format, not the token's signature or content.
 * @param value - The value to check
 * @returns `true` if the value looks like a JWT, `false` otherwise
 */
export function isJWT(value: unknown): value is string {
  if (!isString(value)) {
    return false;
  }

  return JWT_REGEX.test(value);
}
