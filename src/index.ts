// Type check functions
export {
  isString,
  isNumber,
  isBoolean,
  isNull,
  isUndefined,
  isNullish,
  isDefined,
  isArray,
  isNonEmptyArray,
  isPlainObject,
  isDate,
  isValidDate,
  isURL,
  isEmail,
  isFunction,
  isPromise,
  isIterable,
  isEmpty,
  isNonEmptyString,
  isInteger,
  isSafeInteger,
  isSymbol,
  isBigInt,
  isRegExp,
  isError,
  isMap,
  isSet,
  isFiniteNumber,
  isNaNValue,
  // Additional type checks
  isObject,
  isPrimitive,
  isArrayLike,
  isTypedArray,
  isWeakMap,
  isWeakSet,
  isAsyncFunction,
  isGeneratorFunction,
  // Number checks
  isPositive,
  isNegative,
  isEven,
  isOdd,
  isInRange,
  // String format checks
  isJSON,
  isUUID,
  isHexColor,
  isIPv4,
  isIPv6,
  isBlank,
  isAlpha,
  isAlphanumeric,
  isNumericString,
  isDateString,
  isLowerCase,
  isUpperCase,
  isBase64,
  isJWT,
  isSlug,
  isSemVer,
  // Truthy/Falsy checks
  isTruthy,
  isFalsy,
  // Form validation
  isPhoneNumber,
  isCreditCard,
  isStrongPassword,
  // Length checks
  hasMinLength,
  hasMaxLength,
  hasLength,
  hasLengthBetween,
  // Object checks
  hasOwn,
  hasKey,
  isNonEmptyObject,
  isEmptyObject,
  // Array checks
  isArrayOf,
  hasMinItems,
  hasMaxItems,
  includes,
  // Environment checks
  isBrowser,
  isNode,
  isWebWorker,
  isServer,
  // File checks
  hasFileExtension,
  isImageFile,
  isDocumentFile,
  isMimeType,
  isImageMimeType,
  // Comparison checks
  isEqual,
  isArrayEqual,
  isObjectEqual,
  hasChanged,
  getChangedKeys,
  hasKeysChanged,
  isShallowEqual,
  // String pattern checks
  matches,
  startsWith,
  endsWith,
  contains,
  isOneOf,
  isNoneOf,
  // Date checks
  isInFuture,
  isInPast,
  isToday,
  isBetweenDates,
  isSameDay,
  // Additional validators
  isDataURI,
  isCSSColor,
} from './is/index.js';

// Re-export types
export type { PasswordOptions } from './is/index.js';

// Assertion functions
export {
  assertString,
  assertNumber,
  assertBoolean,
  assertArray,
  assertPlainObject,
  assertFunction,
  assertDate,
  assertNonEmptyString,
  assertNonEmptyArray,
  assertInteger,
  assertDefined,
  assertEmail,
  assertURL,
  // Extended assertions
  assertNonEmptyObject,
  assertUUID,
  assertJSON,
  assertPhoneNumber,
  assertCreditCard,
  assertStrongPassword,
  assertInRange,
  assertPostalCode,
  assertHexColor,
  assertIPv4,
  assertIPv6,
  assertSemVer,
  assertSlug,
  AssertionError,
} from './assert/index.js';

// String utilities
export {
  capitalize,
  uncapitalize,
  toTitleCase,
  toCamelCase,
  toPascalCase,
  toSnakeCase,
  toKebabCase,
} from './utils/index.js';

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
} from './utils/index.js';

// Parsing utilities
export {
  parseNumber,
  parseInteger,
  parseString,
  parseBoolean,
  parseJSON,
  parseArray,
} from './utils/index.js';

// Coercion utilities
export {
  toNumber,
  toInteger,
  toString,
  toBoolean,
  coalesce,
  coalesceTruthy,
} from './utils/index.js';

// URL utilities
export {
  parseSearchParams,
  buildQueryString,
  mergeSearchParams,
  isAbsoluteURL,
  isRelativeURL,
} from './utils/index.js';

// Environment variable utilities
export {
  requireEnv,
  requireEnvNumber,
  requireEnvBoolean,
  isEnvDefined,
} from './utils/index.js';

// Date utilities
export { timeAgo, formatRelativeDate } from './utils/index.js';

// Number utilities
export {
  clamp,
  roundTo,
  formatCurrency,
  formatCompact,
  formatPercentage,
} from './utils/index.js';

// Async & error utilities
export {
  tryCatch,
  isHttpError,
  isNetworkError,
  timeout,
  retry,
  TimeoutError,
} from './utils/index.js';
export type { RetryOptions } from './utils/index.js';

// HTTP utilities
export {
  parseCookieString,
  parseContentType,
  isValidHeaderValue,
} from './utils/index.js';
export type { ContentTypeInfo } from './utils/index.js';

// Object utilities
export {
  pick,
  omit,
  deepMerge,
  flattenObject,
  mapKeys,
  mapValues,
} from './utils/index.js';

// Display utilities
export { maskString, pluralize } from './utils/index.js';

// Class name utility
export { cx } from './utils/index.js';

// Validation
export {
  validateRequired,
  validateEmail,
  validateURL,
  validateUUID,
  validateMinLength,
  validateMaxLength,
  validateInRange,
  validateStrongPassword,
  validatePhoneNumber,
  validatePattern,
  createValidator,
  collectErrors,
} from './validate/index.js';
export type { ValidationResult, ValidationRule } from './validate/index.js';

// TypeScript utility types
export type {
  Nullable,
  NonEmptyArray,
  DeepPartial,
  DeepReadonly,
  DeepRequired,
  StrictOmit,
  StrictExtract,
  Prettify,
  Brand,
  MaybePromise,
  Awaitable,
  UnwrapPromise,
  PartialBy,
  RequiredBy,
  Dictionary,
} from './types/index.js';
