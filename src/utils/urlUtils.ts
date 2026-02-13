import { isString } from '../is/isString.js';

/**
 * Parses search/query parameters from a URL string or query string.
 * @param input - A full URL or query string (with or without leading '?')
 * @returns A record of key-value pairs
 * @example parseSearchParams('https://example.com?page=1&sort=name') // { page: '1', sort: 'name' }
 * @example parseSearchParams('?page=1&sort=name') // { page: '1', sort: 'name' }
 */
export function parseSearchParams(input: string): Record<string, string> {
  if (!isString(input)) {
    return {};
  }

  try {
    let searchString = input;

    // If it looks like a full URL, extract the search part
    if (input.includes('://') || input.startsWith('//')) {
      const url = new URL(input, 'http://localhost');
      searchString = url.search;
    }

    // Strip leading '?' if present
    if (searchString.startsWith('?')) {
      searchString = searchString.slice(1);
    }

    const params = new URLSearchParams(searchString);
    const result: Record<string, string> = {};

    for (const [key, value] of params.entries()) {
      result[key] = value;
    }

    return result;
  } catch {
    return {};
  }
}

/**
 * Builds a query string from a record of key-value pairs.
 * Filters out undefined and null values.
 * @param params - An object of query parameters
 * @returns A query string without leading '?'
 * @example buildQueryString({ page: 1, sort: 'name', filter: undefined }) // 'page=1&sort=name'
 */
export function buildQueryString(
  params: Record<string, string | number | boolean | undefined | null>,
): string {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      searchParams.set(key, String(value));
    }
  }

  return searchParams.toString();
}

/**
 * Merges search parameters into a base URL string.
 * Set a param value to undefined to remove it.
 * @param base - The base URL string
 * @param overrides - Parameters to merge/override (undefined removes a param)
 * @returns The URL string with merged parameters
 * @example mergeSearchParams('https://example.com?page=1', { sort: 'name', page: undefined })
 * // 'https://example.com/?sort=name'
 */
export function mergeSearchParams(
  base: string,
  overrides: Record<string, string | number | boolean | undefined | null>,
): string {
  try {
    const url = new URL(base);

    for (const [key, value] of Object.entries(overrides)) {
      if (value === undefined || value === null) {
        url.searchParams.delete(key);
      } else {
        url.searchParams.set(key, String(value));
      }
    }

    return url.toString();
  } catch {
    return base;
  }
}

/**
 * Checks if a value is an absolute URL (starts with a protocol).
 * @param value - The value to check
 * @returns `true` if the value is an absolute URL
 * @example isAbsoluteURL('https://example.com') // true
 * @example isAbsoluteURL('/about') // false
 */
export function isAbsoluteURL(value: unknown): boolean {
  if (!isString(value)) {
    return false;
  }
  return /^[a-z][a-z\d+\-.]*:\/\//i.test(value);
}

/**
 * Checks if a value is a relative URL (does not start with a protocol).
 * @param value - The value to check
 * @returns `true` if the value is a relative URL
 * @example isRelativeURL('/about') // true
 * @example isRelativeURL('https://example.com') // false
 */
export function isRelativeURL(value: unknown): boolean {
  if (!isString(value)) {
    return false;
  }
  return !isAbsoluteURL(value);
}
