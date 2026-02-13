import { isString } from '../is/isString.js';

/**
 * Masks a string, showing only specified characters at the start and end.
 * Useful for displaying sensitive data like credit cards, emails, etc.
 * @param value - The string to mask
 * @param visibleStart - Number of characters to show at the start (default: 0)
 * @param visibleEnd - Number of characters to show at the end (default: 4)
 * @param maskChar - The masking character (default: '•')
 * @returns The masked string
 * @example maskString('4242424242424242', 0, 4) // '••••••••••••4242'
 * @example maskString('john@example.com', 1, 0, '*') // 'j***************'
 */
export function maskString(
  value: string,
  visibleStart: number = 0,
  visibleEnd: number = 4,
  maskChar: string = '•',
): string {
  if (!isString(value) || value.length === 0) {
    return '';
  }

  const len = value.length;

  if (visibleStart + visibleEnd >= len) {
    return value;
  }

  const start = value.slice(0, visibleStart);
  const end = visibleEnd > 0 ? value.slice(-visibleEnd) : '';
  const maskedLen = len - visibleStart - visibleEnd;

  return start + maskChar.repeat(maskedLen) + end;
}

/**
 * Returns a string with proper singular/plural form based on count.
 * @param count - The number to use for pluralization
 * @param singular - The singular form
 * @param plural - The plural form (defaults to singular + 's')
 * @returns The formatted string with count
 * @example pluralize(1, 'item') // '1 item'
 * @example pluralize(5, 'item') // '5 items'
 * @example pluralize(3, 'child', 'children') // '3 children'
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  const form = count === 1 ? singular : (plural ?? `${singular}s`);
  return `${count} ${form}`;
}
