export { AssertionError } from './AssertionError.js';

// String utilities
export {
  capitalize,
  uncapitalize,
  toTitleCase,
  toCamelCase,
  toPascalCase,
  toSnakeCase,
  toKebabCase,
  // Sanitization utilities
  escapeHtml,
  unescapeHtml,
  stripHtml,
  slugify,
  sanitizeFilename,
  normalizeWhitespace,
  removeNonAlphanumeric,
  removeNonPrintable,
  truncate,
  removeAccents,
  escapeRegExp,
  reverseString,
} from './stringUtils.js';

// Array utilities
export {
  filterDefined,
  compact,
  filterTruthy,
  unique,
  uniqueBy,
  partition,
  first,
  last,
} from './arrayUtils.js';

// Parsing utilities
export {
  parseNumber,
  parseInteger,
  parseString,
  parseBoolean,
  parseJSON,
  parseArray,
} from './parseUtils.js';

// Coercion utilities
export {
  toNumber,
  toInteger,
  toString,
  toBoolean,
  coalesce,
  coalesceTruthy,
} from './coercionUtils.js';

// URL utilities
export {
  parseSearchParams,
  buildQueryString,
  mergeSearchParams,
  isAbsoluteURL,
  isRelativeURL,
} from './urlUtils.js';

// Environment variable utilities
export {
  requireEnv,
  requireEnvNumber,
  requireEnvBoolean,
  isEnvDefined,
} from './envUtils.js';

// Date utilities
export { timeAgo, formatRelativeDate } from './dateUtils.js';

// Number utilities
export {
  clamp,
  roundTo,
  formatCurrency,
  formatCompact,
  formatPercentage,
} from './numberUtils.js';

// Async & error utilities
export {
  tryCatch,
  isHttpError,
  isNetworkError,
  timeout,
  retry,
  TimeoutError,
} from './asyncUtils.js';
export type { RetryOptions } from './asyncUtils.js';

// HTTP utilities
export {
  parseCookieString,
  parseContentType,
  isValidHeaderValue,
} from './httpUtils.js';
export type { ContentTypeInfo } from './httpUtils.js';

// Object utilities
export {
  pick,
  omit,
  deepMerge,
  flattenObject,
  mapKeys,
  mapValues,
} from './objectUtils.js';

// Display utilities
export { maskString, pluralize } from './displayUtils.js';

// Class name utility
export { cx } from './classNameUtils.js';
