import { isString } from '../is/isString.js';

/**
 * Capitalizes the first letter of a string.
 * @param value - The string to capitalize
 * @returns The string with the first letter capitalized
 * @example capitalize('hello') // 'Hello'
 */
export function capitalize(value: string): string {
  if (!value || !isString(value)) {
    return '';
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Converts the first letter of a string to lowercase.
 * @param value - The string to uncapitalize
 * @returns The string with the first letter in lowercase
 * @example uncapitalize('Hello') // 'hello'
 */
export function uncapitalize(value: string): string {
  if (!value || !isString(value)) {
    return '';
  }
  return value.charAt(0).toLowerCase() + value.slice(1);
}

/**
 * Capitalizes the first letter of each word in a string.
 * @param value - The string to convert to title case
 * @returns The string with each word capitalized
 * @example toTitleCase('hello world') // 'Hello World'
 */
export function toTitleCase(value: string): string {
  if (!value || !isString(value)) {
    return '';
  }
  return value.replaceAll(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Converts a string to camelCase.
 * @param value - The string to convert
 * @returns The string in camelCase
 * @example toCamelCase('hello-world') // 'helloWorld'
 */
export function toCamelCase(value: string): string {
  if (!value || !isString(value)) {
    return '';
  }
  return value
    .replaceAll(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
    .replaceAll(/^[A-Z]/g, (char) => char.toLowerCase());
}

/**
 * Converts a string to PascalCase.
 * @param value - The string to convert
 * @returns The string in PascalCase
 * @example toPascalCase('hello-world') // 'HelloWorld'
 */
export function toPascalCase(value: string): string {
  if (!value || !isString(value)) {
    return '';
  }
  const camel = toCamelCase(value);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

/**
 * Converts a string to snake_case.
 * @param value - The string to convert
 * @returns The string in snake_case
 * @example toSnakeCase('helloWorld') // 'hello_world'
 */
export function toSnakeCase(value: string): string {
  if (!value || !isString(value)) {
    return '';
  }
  return value
    .replaceAll(/([a-z])([A-Z])/g, '$1_$2')
    .replaceAll(/[-\s]+/g, '_')
    .toLowerCase();
}

/**
 * Converts a string to kebab-case.
 * @param value - The string to convert
 * @returns The string in kebab-case
 * @example toKebabCase('helloWorld') // 'hello-world'
 */
export function toKebabCase(value: string): string {
  if (!value || !isString(value)) {
    return '';
  }
  return value
    .replaceAll(/([a-z])([A-Z])/g, '$1-$2')
    .replaceAll(/[_\s]+/g, '-')
    .toLowerCase();
}

// ============================================================================
// String Sanitization Utilities
// ============================================================================

const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const HTML_ENTITIES_REVERSE: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&#x27;': "'",
  '&apos;': "'",
};

/**
 * Escapes HTML special characters to prevent XSS attacks.
 * @param value - The string to escape
 * @returns The escaped string with HTML entities
 * @example escapeHtml('<script>alert("xss")</script>') // '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
 */
export function escapeHtml(value: string): string {
  if (!value || !isString(value)) {
    return '';
  }
  return value.replaceAll(/[&<>"']/g, (char) => HTML_ENTITIES[char] ?? char);
}

/**
 * Unescapes HTML entities back to their original characters.
 * @param value - The string with HTML entities to unescape
 * @returns The unescaped string
 * @example unescapeHtml('&lt;div&gt;Hello&lt;/div&gt;') // '<div>Hello</div>'
 */
export function unescapeHtml(value: string): string {
  if (!value || !isString(value)) {
    return '';
  }
  return value.replaceAll(
    /&(?:amp|lt|gt|quot|#39|#x27|apos);/g,
    (entity) => HTML_ENTITIES_REVERSE[entity] ?? entity
  );
}

/**
 * Removes all HTML tags from a string.
 * @param value - The string containing HTML
 * @returns The string with all HTML tags removed
 * @example stripHtml('<p>Hello <strong>World</strong></p>') // 'Hello World'
 */
export function stripHtml(value: string): string {
  if (!value || !isString(value)) {
    return '';
  }
  return value.replaceAll(/<[^>]*>/g, '');
}

/**
 * Converts a string to a URL-friendly slug.
 * @param value - The string to slugify
 * @returns A lowercase, hyphen-separated slug
 * @example slugify('Hello World! How are you?') // 'hello-world-how-are-you'
 */
export function slugify(value: string): string {
  if (!value || !isString(value)) {
    return '';
  }
  return removeAccents(value)
    .toLowerCase()
    .trim()
    .replaceAll(/[^\w\s-]/g, '') // Remove non-word chars (except spaces and hyphens)
    .replaceAll(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
    .replaceAll(/-+/g, '-') // Collapse multiple hyphens
    .replaceAll(/(^-+)|(-+$)/g, ''); // Trim hyphens from start and end
}

/**
 * Removes or replaces characters that are invalid in filenames.
 * @param value - The filename to sanitize
 * @param replacement - The character to replace invalid chars with (default: '')
 * @returns A sanitized filename safe for most file systems
 * @example sanitizeFilename('file:name?.txt') // 'filename.txt'
 * @example sanitizeFilename('file:name?.txt', '_') // 'file_name_.txt'
 */
export function sanitizeFilename(value: string, replacement = ''): string {
  if (!value || !isString(value)) {
    return '';
  }
  // Characters invalid on Windows: \ / : * ? " < > |
  // Also remove control characters and leading/trailing dots/spaces
  return value
    .replaceAll(/[\\/:*?"<>|]/g, replacement)
    .replaceAll(/[\u0000-\u001f\u0080-\u009f]/g, '') // NOSONAR - intentionally matching control characters
    .replace(/^\.+/, '') // Remove leading dots
    .replace(/\.+$/, '') // Remove trailing dots
    .trim();
}

/**
 * Normalizes whitespace by collapsing multiple spaces/tabs/newlines to a single space.
 * @param value - The string to normalize
 * @returns The string with normalized whitespace
 * @example normalizeWhitespace('hello   world\n\nfoo') // 'hello world foo'
 */
export function normalizeWhitespace(value: string): string {
  if (!value || !isString(value)) {
    return '';
  }
  return value.replaceAll(/\s+/g, ' ').trim();
}

/**
 * Removes all non-alphanumeric characters from a string.
 * @param value - The string to clean
 * @param keepSpaces - Whether to preserve spaces (default: false)
 * @returns The string with only letters and numbers (and optionally spaces)
 * @example removeNonAlphanumeric('Hello, World! 123') // 'HelloWorld123'
 * @example removeNonAlphanumeric('Hello, World! 123', true) // 'Hello World 123'
 */
export function removeNonAlphanumeric(value: string, keepSpaces = false): string {
  if (!value || !isString(value)) {
    return '';
  }
  const pattern = keepSpaces ? /[^a-zA-Z0-9\s]/g : /[^a-zA-Z0-9]/g;
  return value.replaceAll(pattern, '');
}

/**
 * Removes non-printable and control characters from a string.
 * @param value - The string to clean
 * @returns The string with only printable characters
 * @example removeNonPrintable('Hello\x00World\x1F!') // 'HelloWorld!'
 */
export function removeNonPrintable(value: string): string {
  if (!value || !isString(value)) {
    return '';
  }
  // Remove control characters (0x00-0x1F and 0x7F-0x9F), except common whitespace (tab, newline, carriage return)
  return value.replaceAll(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, ''); // NOSONAR
}

/**
 * Truncates a string to a specified length with an optional suffix.
 * @param value - The string to truncate
 * @param maxLength - The maximum length of the result (including suffix)
 * @param suffix - The suffix to append when truncated (default: '...')
 * @returns The truncated string
 * @example truncate('Hello World', 8) // 'Hello...'
 * @example truncate('Hello World', 8, '…') // 'Hello W…'
 * @example truncate('Hi', 10) // 'Hi'
 */
export function truncate(value: string, maxLength: number, suffix = '...'): string {
  if (!value || !isString(value)) {
    return '';
  }
  if (maxLength < 0) {
    return '';
  }
  if (value.length <= maxLength) {
    return value;
  }
  const truncatedLength = maxLength - suffix.length;
  if (truncatedLength <= 0) {
    return suffix.slice(0, maxLength);
  }
  return value.slice(0, truncatedLength) + suffix;
}

/**
 * Removes diacritical marks (accents) from a string.
 * @param value - The string with accents
 * @returns The string with accents removed
 * @example removeAccents('café résumé naïve') // 'cafe resume naive'
 * @example removeAccents('Ñoño') // 'Nono'
 */
export function removeAccents(value: string): string {
  if (!value || !isString(value)) {
    return '';
  }
  return value.normalize('NFD').replaceAll(/[\u0300-\u036f]/g, '');
}

/**
 * Escapes special characters in a string for use in a regular expression.
 * @param value - The string to escape
 * @returns The string with regex special characters escaped
 * @example escapeRegExp('Hello (World)? [test]') // 'Hello \\(World\\)\\? \\[test\\]'
 * @example new RegExp(escapeRegExp('$100.00')) // matches literal '$100.00'
 */
export function escapeRegExp(value: string): string {
  if (!value || !isString(value)) {
    return '';
  }
  return value.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
}
/**
 * Reverses a string.
 * @param value - The string to reverse
 * @returns The reversed string
 * @example reverseString('hello') // 'olleh'
 */
export function reverseString(value: string): string {
  if (!value || !isString(value)) {
    return '';
  }
  return value.split('').reverse().join('');
}