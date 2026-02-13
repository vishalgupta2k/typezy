# typezy

A lightweight, zero-dependency TypeScript utility library for type checking and validation.

[![npm version](https://img.shields.io/npm/v/typezy.svg)](https://www.npmjs.com/package/typezy)
[![npm downloads](https://img.shields.io/npm/dm/typezy.svg)](https://www.npmjs.com/package/typezy)
[![CI](https://github.com/vishalgupta2k/typezy/actions/workflows/ci.yml/badge.svg)](https://github.com/vishalgupta2k/typezy/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/typezy)](https://bundlephobia.com/package/typezy)
[![Docs](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://vishalgupta2k.github.io/typezy/)

## Features

- 🚀 **Zero dependencies** - No external runtime dependencies
- 📦 **Small bundle size** - Tree-shakeable ESM and CJS builds
- 🔒 **Type-safe** - Full TypeScript support with type guards
- 🛡️ **Assertion functions** - Runtime type assertions with TypeScript narrowing
- ✅ **Well-tested** - Comprehensive test coverage
- 🧩 **Validation pattern** - Composable validators with error messages for forms
- 🔧 **Utility types** - Reusable TypeScript utility types (`DeepPartial`, `Brand`, `Prettify`, etc.)
- ⚛️ **React/Next.js ready** - Env validation, URL utils, `tryCatch`, `cx`, and more

## Installation

```bash
npm install typezy
```

```bash
yarn add typezy
```

```bash
pnpm add typezy
```

## Usage

### Type Check Functions

All `is*` functions are type guards that can be used for type narrowing in TypeScript.

```typescript
import { isString, isNumber, isPlainObject, isEmail } from 'typezy';

// Type narrowing
function processValue(value: unknown) {
  if (isString(value)) {
    // TypeScript knows `value` is a string here
    console.log(value.toUpperCase());
  }
  
  if (isNumber(value)) {
    // TypeScript knows `value` is a number here
    console.log(value.toFixed(2));
  }
}

// Validation
const email = 'user@example.com';
if (isEmail(email)) {
  console.log('Valid email!');
}
```

### Assertion Functions

Assertion functions throw an `AssertionError` if the check fails, and narrow the type if it passes.

```typescript
import { assertString, assertDefined, assertEmail, AssertionError } from 'typezy';

function processConfig(config: unknown) {
  assertPlainObject(config);
  // TypeScript knows `config` is Record<string, unknown> here
  
  assertString(config.name);
  // TypeScript knows `config.name` is string here
  
  assertDefined(config.value);
  // TypeScript knows `config.value` is not null or undefined
}

// Custom error messages
try {
  assertEmail(userInput, 'Please provide a valid email address');
} catch (error) {
  if (error instanceof AssertionError) {
    console.error(error.message); // "Please provide a valid email address"
  }
}
```

### Import Submodules

You can also import from specific submodules for better tree-shaking:

```typescript
// Import only check functions
import { isString, isNumber } from 'typezy/is';

// Import only assertion functions
import { assertString, assertNumber } from 'typezy/assert';

// Import only validation functions
import { validateEmail, createValidator } from 'typezy/validate';

// Import only types
import type { DeepPartial, Brand, Prettify } from 'typezy/types';
```

## API Reference

### Type Check Functions (`is*`)

| Function | Description |
|----------|-------------|
| `isString(value)` | Checks if value is a string |
| `isNumber(value)` | Checks if value is a number (excludes NaN) |
| `isBoolean(value)` | Checks if value is a boolean |
| `isNull(value)` | Checks if value is null |
| `isUndefined(value)` | Checks if value is undefined |
| `isNullish(value)` | Checks if value is null or undefined |
| `isDefined(value)` | Checks if value is not null and not undefined |
| `isArray(value)` | Checks if value is an array |
| `isNonEmptyArray(value)` | Checks if value is a non-empty array |
| `isPlainObject(value)` | Checks if value is a plain object |
| `isDate(value)` | Checks if value is a Date object |
| `isValidDate(value)` | Checks if value is a valid Date (not Invalid Date) |
| `isURL(value)` | Checks if value is a valid URL string |
| `isEmail(value)` | Checks if value is a valid email string |
| `isFunction(value)` | Checks if value is a function |
| `isPromise(value)` | Checks if value is a Promise |
| `isIterable(value)` | Checks if value is iterable |
| `isEmpty(value)` | Checks if value is empty (empty string, array, object, null, undefined) |
| `isNonEmptyString(value)` | Checks if value is a non-empty string |
| `isInteger(value)` | Checks if value is an integer |
| `isSafeInteger(value)` | Checks if value is a safe integer |
| `isSymbol(value)` | Checks if value is a symbol |
| `isBigInt(value)` | Checks if value is a bigint |
| `isRegExp(value)` | Checks if value is a RegExp |
| `isError(value)` | Checks if value is an Error |
| `isMap(value)` | Checks if value is a Map |
| `isSet(value)` | Checks if value is a Set |
| `isFiniteNumber(value)` | Checks if value is a finite number |
| `isNaNValue(value)` | Checks if value is NaN |

#### Additional Type Checks

| Function | Description |
|----------|-------------|
| `isObject(value)` | Checks if value is any object (not null) |
| `isPrimitive(value)` | Checks if value is a primitive type |
| `isArrayLike(value)` | Checks if value is array-like (has length property) |
| `isTypedArray(value)` | Checks if value is a TypedArray |
| `isWeakMap(value)` | Checks if value is a WeakMap |
| `isWeakSet(value)` | Checks if value is a WeakSet |
| `isAsyncFunction(value)` | Checks if value is an async function |
| `isGeneratorFunction(value)` | Checks if value is a generator function |

#### Number Checks

| Function | Description |
|----------|-------------|
| `isPositive(value)` | Checks if value is a positive number |
| `isNegative(value)` | Checks if value is a negative number |
| `isEven(value)` | Checks if value is an even integer |
| `isOdd(value)` | Checks if value is an odd integer |
| `isInRange(value, min, max)` | Checks if value is within a range (inclusive) |

#### String Format Checks

| Function | Description |
|----------|-------------|
| `isJSON(value)` | Checks if value is a valid JSON string |
| `isUUID(value)` | Checks if value is a valid UUID |
| `isHexColor(value)` | Checks if value is a valid hex color |
| `isIPv4(value)` | Checks if value is a valid IPv4 address |
| `isIPv6(value)` | Checks if value is a valid IPv6 address |
| `isBlank(value)` | Checks if value is blank (empty or whitespace only) |
| `isAlpha(value)` | Checks if value contains only alphabetic characters |
| `isAlphanumeric(value)` | Checks if value contains only alphanumeric characters |
| `isNumericString(value)` | Checks if value is a numeric string |
| `isDateString(value)` | Checks if value is a valid date string |
| `isLowerCase(value)` | Checks if value is all lowercase |
| `isUpperCase(value)` | Checks if value is all uppercase |
| `isBase64(value)` | Checks if value is a valid Base64 string |
| `isJWT(value)` | Checks if value is a valid JWT format |
| `isSlug(value)` | Checks if value is a valid URL slug |
| `isSemVer(value)` | Checks if value is a valid semantic version |

#### Truthy/Falsy Checks

| Function | Description |
|----------|-------------|
| `isTruthy(value)` | Checks if value is truthy |
| `isFalsy(value)` | Checks if value is falsy |

#### Form Validation

| Function | Description |
|----------|-------------|
| `isPhoneNumber(value)` | Checks if value is a valid phone number |
| `isCreditCard(value)` | Checks if value is a valid credit card number (Luhn algorithm) |
| `isStrongPassword(value, options?)` | Checks if value is a strong password |
| `isPostalCode(value, country)` | Checks if value is a valid postal code (US, UK, CA, DE, FR, IN, AU, JP, BR) |

#### Date Checks

| Function | Description |
|----------|-------------|
| `isInFuture(value)` | Checks if a date value is in the future |
| `isInPast(value)` | Checks if a date value is in the past |
| `isToday(value)` | Checks if a date value represents today |
| `isBetweenDates(value, start, end)` | Checks if a date falls between two dates (inclusive) |
| `isSameDay(a, b)` | Checks if two dates are on the same calendar day |

#### Additional Validators

| Function | Description |
|----------|-------------|
| `isDataURI(value)` | Checks if value is a valid data URI string |
| `isCSSColor(value)` | Checks if value is a valid CSS color (hex, rgb, hsl, named) |

#### Length Checks

| Function | Description |
|----------|-------------|
| `hasMinLength(value, min)` | Checks if string/array has minimum length |
| `hasMaxLength(value, max)` | Checks if string/array has maximum length |
| `hasLength(value, length)` | Checks if string/array has exact length |
| `hasLengthBetween(value, min, max)` | Checks if string/array length is in range |

#### Object Checks

| Function | Description |
|----------|-------------|
| `hasOwn(obj, key)` | Checks if object has own property |
| `hasKey(obj, key)` | Checks if key exists in object |
| `isNonEmptyObject(value)` | Checks if value is a plain object with at least one property |
| `isEmptyObject(value)` | Checks if value is an empty plain object |

#### Array Checks

| Function | Description |
|----------|-------------|
| `isArrayOf(arr, predicate)` | Checks if all array items match predicate |
| `hasMinItems(arr, min)` | Checks if array has minimum items |
| `hasMaxItems(arr, max)` | Checks if array has maximum items |
| `includes(arr, value)` | Checks if array includes value |

#### Environment Detection

| Function | Description |
|----------|-------------|
| `isBrowser()` | Checks if running in browser |
| `isNode()` | Checks if running in Node.js |
| `isWebWorker()` | Checks if running in Web Worker |
| `isServer()` | Checks if running on server-side |
| `getBrowserDetails()` | Gets browser name, version, platform, and other details |

#### File Checks

| Function | Description |
|----------|-------------|
| `hasFileExtension(filename, extensions)` | Checks if filename has allowed extension |
| `isImageFile(filename)` | Checks if filename is an image |
| `isDocumentFile(filename)` | Checks if filename is a document |
| `isMimeType(mimeType, allowedTypes)` | Checks if MIME type matches |
| `isImageMimeType(mimeType)` | Checks if MIME type is an image type |

#### Comparison Functions

| Function | Description |
|----------|-------------|
| `isEqual(a, b)` | Deep equality check |
| `isArrayEqual(a, b)` | Array deep equality check |
| `isObjectEqual(a, b)` | Object deep equality check |
| `hasChanged(oldVal, newVal)` | Checks if value has changed |
| `getChangedKeys(oldObj, newObj)` | Gets keys that changed between objects |
| `hasKeysChanged(oldObj, newObj, keys)` | Checks if specific keys changed |
| `isShallowEqual(a, b)` | Shallow equality check |

#### String Pattern Checks

| Function | Description |
|----------|-------------|
| `matches(value, regex)` | Checks if string matches regex pattern |
| `startsWith(value, prefix)` | Checks if string starts with prefix |
| `endsWith(value, suffix)` | Checks if string ends with suffix |
| `contains(value, substring)` | Checks if string contains substring |
| `isOneOf(value, allowed)` | Checks if value is in allowed list |
| `isNoneOf(value, disallowed)` | Checks if value is not in disallowed list |

### Assertion Functions (`assert*`)

All assertion functions throw `AssertionError` on failure and accept an optional custom message.

| Function | Description |
|----------|-------------|
| `assertString(value, message?)` | Asserts value is a string |
| `assertNumber(value, message?)` | Asserts value is a number |
| `assertBoolean(value, message?)` | Asserts value is a boolean |
| `assertArray(value, message?)` | Asserts value is an array |
| `assertPlainObject(value, message?)` | Asserts value is a plain object |
| `assertFunction(value, message?)` | Asserts value is a function |
| `assertDate(value, message?)` | Asserts value is a Date |
| `assertNonEmptyString(value, message?)` | Asserts value is a non-empty string |
| `assertNonEmptyArray(value, message?)` | Asserts value is a non-empty array |
| `assertInteger(value, message?)` | Asserts value is an integer |
| `assertDefined(value, message?)` | Asserts value is not null or undefined |
| `assertEmail(value, message?)` | Asserts value is a valid email |
| `assertURL(value, message?)` | Asserts value is a valid URL |
| `assertNonEmptyObject(value, message?)` | Asserts value is a non-empty object |
| `assertUUID(value, message?)` | Asserts value is a valid UUID |
| `assertJSON(value, message?)` | Asserts value is a valid JSON string |
| `assertPhoneNumber(value, message?)` | Asserts value is a valid phone number |
| `assertCreditCard(value, message?)` | Asserts value is a valid credit card number |
| `assertStrongPassword(value, options?, message?)` | Asserts value is a strong password |
| `assertInRange(value, min, max, message?)` | Asserts value is a number in range |
| `assertPostalCode(value, country?, message?)` | Asserts value is a valid postal code |
| `assertHexColor(value, message?)` | Asserts value is a valid hex color |
| `assertIPv4(value, message?)` | Asserts value is a valid IPv4 address |
| `assertIPv6(value, message?)` | Asserts value is a valid IPv6 address |
| `assertSemVer(value, message?)` | Asserts value is a valid semantic version |
| `assertSlug(value, message?)` | Asserts value is a valid URL slug |

### String Utilities

| Function | Description |
|----------|-------------|
| `capitalize(value)` | Capitalizes the first letter of a string |
| `uncapitalize(value)` | Converts the first letter to lowercase |
| `toTitleCase(value)` | Capitalizes first letter of each word |
| `toCamelCase(value)` | Converts string to camelCase |
| `toPascalCase(value)` | Converts string to PascalCase |
| `toSnakeCase(value)` | Converts string to snake_case |
| `toKebabCase(value)` | Converts string to kebab-case |

### String Sanitization Utilities

| Function | Description |
|----------|-------------|
| `escapeHtml(value)` | Escapes HTML special characters (`<`, `>`, `&`, `"`, `'`) |
| `unescapeHtml(value)` | Unescapes HTML entities back to characters |
| `stripHtml(value)` | Removes all HTML tags from a string |
| `slugify(value)` | Converts string to URL-friendly slug |
| `sanitizeFilename(value, replacement?)` | Removes invalid filename characters |
| `normalizeWhitespace(value)` | Collapses multiple spaces to single space |
| `removeNonAlphanumeric(value, keepSpaces?)` | Removes non-alphanumeric characters |
| `removeNonPrintable(value)` | Removes control characters |
| `truncate(value, maxLength, suffix?)` | Truncates string with optional suffix |
| `removeAccents(value)` | Removes diacritical marks (accents) |
| `escapeRegExp(value)` | Escapes regex special characters |

```typescript
import { escapeHtml, slugify, truncate, sanitizeFilename } from 'typezy';

// Prevent XSS
escapeHtml('<script>alert("xss")</script>');
// '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'

// Create URL slugs
slugify('Hello World! How are you?');  // 'hello-world-how-are-you'
slugify('Café résumé');                // 'cafe-resume'

// Truncate long text
truncate('Hello World', 8);            // 'Hello...'
truncate('Hello World', 8, '…');       // 'Hello W…'

// Safe filenames
sanitizeFilename('file:name?.txt');    // 'filename.txt'
sanitizeFilename('file:name', '_');    // 'file_name'
```

### Array Utilities

| Function | Description |
|----------|-------------|
| `filterDefined(arr)` | Removes null and undefined values from array |
| `compact(arr)` | Removes all falsy values from array |
| `filterTruthy(arr)` | Type-safe filter to only truthy values |
| `unique(arr)` | Removes duplicate values from array |
| `uniqueBy(arr, keyFn)` | Removes duplicates based on a key function |
| `partition(arr, predicate)` | Splits array into [matching, non-matching] |
| `first(arr)` | Returns first element or undefined |
| `last(arr)` | Returns last element or undefined |

### Parsing Utilities

Parse values with a default fallback when parsing fails:

| Function | Description |
|----------|-------------|
| `parseNumber(value, default)` | Parses to number or returns default |
| `parseInteger(value, default)` | Parses to integer or returns default |
| `parseString(value, default)` | Converts to string or returns default |
| `parseBoolean(value, default)` | Parses to boolean or returns default |
| `parseJSON(value, default)` | Parses JSON or returns default |
| `parseArray(value, separator, default)` | Parses delimited string to array |

```typescript
import { parseNumber, parseBoolean, parseArray } from 'typezy';

// Perfect for environment variables and API responses
const port = parseNumber(process.env.PORT, 3000);
const debug = parseBoolean(process.env.DEBUG, false);
const origins = parseArray(process.env.ALLOWED_ORIGINS, ',', []);
```

### Coercion Utilities

Safe type coercion that returns `undefined` instead of invalid values:

| Function | Description |
|----------|-------------|
| `toNumber(value)` | Converts to number or returns undefined |
| `toInteger(value)` | Converts to integer or returns undefined |
| `toString(value)` | Converts to string or returns undefined |
| `toBoolean(value)` | Converts to boolean or returns undefined |
| `coalesce(...values)` | Returns first non-null/undefined value |
| `coalesceTruthy(...values)` | Returns first truthy value |

```typescript
import { toNumber, coalesce, coalesceTruthy } from 'typezy';

// Unlike Number(), returns undefined instead of NaN
toNumber('abc');  // undefined (not NaN)
toNumber('42');   // 42

// First defined value (like ?? but for multiple values)
coalesce(null, undefined, 'hello');  // 'hello'
coalesce(null, 0, 1);                // 0 (0 is defined)

// First truthy value
coalesceTruthy(0, '', 'hello');      // 'hello'
```

### URL Utilities

Utilities for working with URLs and search parameters — ideal for Next.js routing:

| Function | Description |
|----------|-------------|
| `parseSearchParams(url)` | Parses URL search params into a `Record<string, string>` |
| `buildQueryString(params)` | Builds a query string from a params object |
| `mergeSearchParams(url, params)` | Merges new params into an existing URL string |
| `isAbsoluteURL(value)` | Checks if a string is an absolute URL |
| `isRelativeURL(value)` | Checks if a string is a relative URL path |

```typescript
import { parseSearchParams, buildQueryString, mergeSearchParams } from 'typezy';

parseSearchParams('https://example.com?page=1&sort=name');
// { page: '1', sort: 'name' }

buildQueryString({ page: '2', sort: 'date', q: 'hello world' });
// 'page=2&sort=date&q=hello+world'

mergeSearchParams('https://example.com?page=1', { page: '2', limit: '10' });
// 'https://example.com/?page=2&limit=10'
```

### Environment Variable Utilities

Validate and parse environment variables at startup — great for Next.js config:

| Function | Description |
|----------|-------------|
| `requireEnv(key)` | Returns env var value or throws if missing |
| `requireEnvNumber(key)` | Returns env var as number or throws |
| `requireEnvBoolean(key)` | Returns env var as boolean or throws |
| `isEnvDefined(key)` | Checks if an env var is set and non-empty |

```typescript
import { requireEnv, requireEnvNumber, requireEnvBoolean } from 'typezy';

// Throws AssertionError with clear messages at startup
const apiUrl = requireEnv('API_URL');
const port = requireEnvNumber('PORT');        // parsed to number
const debug = requireEnvBoolean('DEBUG');      // parsed to boolean
```

### Date Utilities

Date formatting helpers for UI display:

| Function | Description |
|----------|-------------|
| `timeAgo(date)` | Returns human-readable relative time (e.g. "5 minutes ago") |
| `formatRelativeDate(date)` | Returns "Today", "Yesterday", day name, or formatted date |

```typescript
import { timeAgo, formatRelativeDate } from 'typezy';

timeAgo(new Date(Date.now() - 30000));        // '30 seconds ago'
timeAgo(new Date(Date.now() - 7200000));      // '2 hours ago'

formatRelativeDate(new Date());               // 'Today'
formatRelativeDate(yesterday);                // 'Yesterday'
```

### Number Utilities

Number formatting and math helpers:

| Function | Description |
|----------|-------------|
| `clamp(value, min, max)` | Clamps a number within a range |
| `roundTo(value, decimals)` | Rounds to specified decimal places |
| `formatCurrency(value, currency?, locale?)` | Formats number as currency string |
| `formatCompact(value, locale?)` | Formats large numbers compactly (e.g. "1.2K") |
| `formatPercentage(value, decimals?, locale?)` | Formats as percentage string |

```typescript
import { clamp, roundTo, formatCurrency, formatCompact } from 'typezy';

clamp(150, 0, 100);                // 100
roundTo(3.14159, 2);               // 3.14
formatCurrency(1234.5, 'USD');     // '$1,234.50'
formatCompact(1500000);            // '1.5M'
```

### Validation Pattern

Composable validation for form fields — returns `{ valid, error? }` objects:

| Function | Description |
|----------|-------------|
| `validateRequired(value)` | Validates value is present |
| `validateEmail(value)` | Validates email format |
| `validateURL(value)` | Validates URL format |
| `validateUUID(value)` | Validates UUID format |
| `validateMinLength(value, min)` | Validates minimum string length |
| `validateMaxLength(value, max)` | Validates maximum string length |
| `validateInRange(value, min, max)` | Validates number is in range |
| `validateStrongPassword(value)` | Validates password strength |
| `validatePhoneNumber(value)` | Validates phone number format |
| `validatePattern(value, regex, message?)` | Validates against a regex pattern |
| `createValidator(...rules)` | Composes rules, returns first error |
| `collectErrors(value, ...rules)` | Runs all rules, collects all errors |

```typescript
import { createValidator, validateRequired, validateEmail, validateMinLength, collectErrors } from 'typezy/validate';

// Compose validation rules
const validateUsername = createValidator(
  validateRequired,
  (v) => validateMinLength(v, 3),
);

validateUsername('ab');  // { valid: false, error: 'Must be at least 3 characters' }
validateUsername('alice'); // { valid: true }

// Collect all errors at once
const errors = collectErrors('x', validateRequired, (v) => validateMinLength(v, 3));
// ['Must be at least 3 characters']
```

### Object Utilities

Common object manipulation helpers (no lodash needed):

| Function | Description |
|----------|-------------|
| `pick(obj, keys)` | Creates object with only specified keys |
| `omit(obj, keys)` | Creates object without specified keys |
| `deepMerge(target, source)` | Deep merges two objects |
| `flattenObject(obj, prefix?)` | Flattens nested object to dot-notation keys |
| `mapKeys(obj, fn)` | Transforms object keys via a mapper function |
| `mapValues(obj, fn)` | Transforms object values via a mapper function |

```typescript
import { pick, omit, deepMerge, flattenObject } from 'typezy';

pick({ a: 1, b: 2, c: 3 }, ['a', 'c']);     // { a: 1, c: 3 }
omit({ a: 1, b: 2, c: 3 }, ['b']);           // { a: 1, c: 3 }

deepMerge({ a: { x: 1 } }, { a: { y: 2 } });
// { a: { x: 1, y: 2 } }

flattenObject({ a: { b: { c: 1 } } });       // { 'a.b.c': 1 }
```

### Async & Error Utilities

Safe async patterns for Next.js server actions and API routes:

| Function | Description |
|----------|-------------|
| `tryCatch(promise)` | Go-style error handling — returns `[data, null]` or `[null, error]` |
| `isHttpError(error)` | Checks if error has an HTTP status code |
| `isNetworkError(error)` | Checks if error is a network/fetch failure |
| `timeout(promise, ms)` | Wraps a promise with a timeout |
| `retry(fn, options?)` | Retries an async function with backoff |

```typescript
import { tryCatch, timeout, retry } from 'typezy';

// Go-style error handling — no try/catch blocks
const [user, error] = await tryCatch(fetchUser(id));
if (error) return handleError(error);

// Timeout a slow request
const data = await timeout(fetch('/api/data'), 5000);

// Retry with exponential backoff
const result = await retry(() => fetch('/api/flaky'), {
  attempts: 3,
  delay: 1000,
  backoff: true,
});
```

### HTTP Utilities

Helpers for parsing cookies and headers in middleware:

| Function | Description |
|----------|-------------|
| `parseCookieString(cookieHeader)` | Parses a `Cookie` header into a key-value record |
| `parseContentType(header)` | Parses a `Content-Type` header into type, subtype, and params |
| `isValidHeaderValue(value)` | Checks if a string is safe as an HTTP header value |

```typescript
import { parseCookieString, parseContentType } from 'typezy';

parseCookieString('session=abc123; theme=dark');
// { session: 'abc123', theme: 'dark' }

parseContentType('application/json; charset=utf-8');
// { type: 'application', subtype: 'json', parameters: { charset: 'utf-8' } }
```

### Display Utilities

Formatting helpers for UI rendering:

| Function | Description |
|----------|-------------|
| `maskString(value, visibleChars?, maskChar?)` | Masks a string (e.g. "••••4242") |
| `pluralize(count, singular, plural?)` | Returns count + pluralized noun |
| `cx(...args)` | Lightweight class name builder (like `clsx`) |

```typescript
import { maskString, pluralize, cx } from 'typezy';

maskString('4111111111111111', 4);    // '••••••••••••1111'
pluralize(1, 'item');                  // '1 item'
pluralize(5, 'item');                  // '5 items'
pluralize(3, 'child', 'children');     // '3 children'

// Conditional class names (React/JSX)
cx('btn', isActive && 'btn-active', size === 'lg' && 'btn-lg');
// 'btn btn-active btn-lg'
```

### TypeScript Utility Types

Reusable type helpers — import from `typezy/types`:

| Type | Description |
|------|-------------|
| `Nullable<T>` | `T \| null \| undefined` |
| `NonEmptyArray<T>` | Tuple type guaranteeing at least one element |
| `DeepPartial<T>` | Recursively makes all properties optional |
| `DeepReadonly<T>` | Recursively makes all properties readonly |
| `DeepRequired<T>` | Recursively makes all properties required |
| `StrictOmit<T, K>` | `Omit` that constrains `K` to keys of `T` |
| `StrictExtract<T, U>` | `Extract` that constrains `U` to members of `T` |
| `Prettify<T>` | Flattens intersections for readable tooltips |
| `Brand<T, B>` | Nominal/branded type for type-safe IDs |
| `MaybePromise<T>` | `T \| Promise<T>` |
| `Awaitable<T>` | `T \| PromiseLike<T>` |
| `UnwrapPromise<T>` | Extracts the resolved type from a Promise |
| `PartialBy<T, K>` | Makes only specified keys optional |
| `RequiredBy<T, K>` | Makes only specified keys required |
| `Dictionary<T>` | `Record<string, T>` shorthand |

```typescript
import type { Brand, DeepPartial, Prettify, NonEmptyArray } from 'typezy/types';

// Branded types for type-safe IDs
type UserId = Brand<string, 'UserId'>;
type OrderId = Brand<string, 'OrderId'>;

// Deep partial for patch/update payloads
type UserUpdate = DeepPartial<User>;

// Non-empty arrays that guarantee at least one element
const items: NonEmptyArray<string> = ['at-least-one'];
```

## TypeScript Support

All functions are fully typed and provide proper type narrowing:

```typescript
function example(value: string | number | null) {
  if (isString(value)) {
    // value: string
    value.toUpperCase();
  } else if (isNumber(value)) {
    // value: number
    value.toFixed(2);
  } else {
    // value: null
  }
}

function assertExample(value: unknown) {
  assertString(value);
  // value: string (type narrowed after assertion)
  console.log(value.length);
}
```

## License

MIT © [Vishal Gupta]
