import { isString } from '../is/isString.js';

/**
 * Parses a cookie string (like `document.cookie` or a `Cookie` header) into a record.
 * @param str - The cookie string to parse
 * @returns A record of cookie name-value pairs
 * @example parseCookieString('name=John; theme=dark') // { name: 'John', theme: 'dark' }
 */
export function parseCookieString(str: string): Record<string, string> {
  if (!isString(str) || str.trim() === '') {
    return {};
  }

  const result: Record<string, string> = {};

  for (const pair of str.split(';')) {
    const eqIndex = pair.indexOf('=');
    if (eqIndex === -1) continue;

    const key = pair.slice(0, eqIndex).trim();
    const value = pair.slice(eqIndex + 1).trim();

    if (key) {
      // Remove surrounding quotes if present
      result[key] = value.startsWith('"') && value.endsWith('"')
        ? value.slice(1, -1)
        : value;
    }
  }

  return result;
}

/**
 * Parsed content type result.
 */
export interface ContentTypeInfo {
  /** The main type (e.g. 'application') */
  type: string;
  /** The subtype (e.g. 'json') */
  subtype: string;
  /** Additional parameters (e.g. { charset: 'utf-8' }) */
  params: Record<string, string>;
}

/**
 * Parses a Content-Type header into its components.
 * @param header - The Content-Type header value
 * @returns Parsed content type information
 * @example parseContentType('application/json; charset=utf-8')
 * // { type: 'application', subtype: 'json', params: { charset: 'utf-8' } }
 */
export function parseContentType(header: string): ContentTypeInfo {
  const result: ContentTypeInfo = { type: '', subtype: '', params: {} };

  if (!isString(header) || header.trim() === '') {
    return result;
  }

  const parts = header.split(';').map((s) => s.trim());
  const [mediaType, ...paramParts] = parts;

  if (mediaType) {
    const [type, subtype] = mediaType.split('/');
    result.type = (type ?? '').toLowerCase();
    result.subtype = (subtype ?? '').toLowerCase();
  }

  for (const param of paramParts) {
    const eqIndex = param.indexOf('=');
    if (eqIndex === -1) continue;

    const key = param.slice(0, eqIndex).trim().toLowerCase();
    let value = param.slice(eqIndex + 1).trim();

    // Remove surrounding quotes
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    if (key) {
      result.params[key] = value;
    }
  }

  return result;
}

/**
 * Checks if a value is a valid HTTP header value (no forbidden characters).
 * @param value - The value to check
 * @returns `true` if the value can be safely used as an HTTP header value
 */
export function isValidHeaderValue(value: unknown): boolean {
  if (!isString(value)) {
    return false;
  }

  // Header values must not contain null bytes or newlines
  return !/[\0\r\n]/.test(value);
}
