import { describe, it, expect } from 'vitest';
import {
  capitalize,
  uncapitalize,
  toTitleCase,
  toCamelCase,
  toPascalCase,
  toSnakeCase,
  toKebabCase,
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
} from '../src/utils/index.js';

describe('capitalize', () => {
  it('should capitalize first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('world')).toBe('World');
  });

  it('should handle already capitalized strings', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });

  it('should handle single character', () => {
    expect(capitalize('a')).toBe('A');
  });

  it('should handle empty string', () => {
    expect(capitalize('')).toBe('');
  });

  it('should handle non-string values', () => {
    expect(capitalize(null as unknown as string)).toBe('');
    expect(capitalize(undefined as unknown as string)).toBe('');
  });
});

describe('uncapitalize', () => {
  it('should lowercase first letter', () => {
    expect(uncapitalize('Hello')).toBe('hello');
    expect(uncapitalize('World')).toBe('world');
  });

  it('should handle already lowercase strings', () => {
    expect(uncapitalize('hello')).toBe('hello');
  });

  it('should handle single character', () => {
    expect(uncapitalize('A')).toBe('a');
  });

  it('should handle empty string', () => {
    expect(uncapitalize('')).toBe('');
  });
});

describe('toTitleCase', () => {
  it('should capitalize first letter of each word', () => {
    expect(toTitleCase('hello world')).toBe('Hello World');
    expect(toTitleCase('the quick brown fox')).toBe('The Quick Brown Fox');
  });

  it('should handle single word', () => {
    expect(toTitleCase('hello')).toBe('Hello');
  });

  it('should handle empty string', () => {
    expect(toTitleCase('')).toBe('');
  });
});

describe('toCamelCase', () => {
  it('should convert to camelCase', () => {
    expect(toCamelCase('hello-world')).toBe('helloWorld');
    expect(toCamelCase('hello_world')).toBe('helloWorld');
    expect(toCamelCase('hello world')).toBe('helloWorld');
    expect(toCamelCase('Hello World')).toBe('helloWorld');
  });

  it('should handle already camelCase', () => {
    expect(toCamelCase('helloWorld')).toBe('helloWorld');
  });

  it('should handle empty string', () => {
    expect(toCamelCase('')).toBe('');
  });
});

describe('toPascalCase', () => {
  it('should convert to PascalCase', () => {
    expect(toPascalCase('hello-world')).toBe('HelloWorld');
    expect(toPascalCase('hello_world')).toBe('HelloWorld');
    expect(toPascalCase('hello world')).toBe('HelloWorld');
  });

  it('should handle already PascalCase', () => {
    expect(toPascalCase('HelloWorld')).toBe('HelloWorld');
  });

  it('should handle empty string', () => {
    expect(toPascalCase('')).toBe('');
  });
});

describe('toSnakeCase', () => {
  it('should convert to snake_case', () => {
    expect(toSnakeCase('helloWorld')).toBe('hello_world');
    expect(toSnakeCase('HelloWorld')).toBe('hello_world');
    expect(toSnakeCase('hello-world')).toBe('hello_world');
    expect(toSnakeCase('hello world')).toBe('hello_world');
  });

  it('should handle already snake_case', () => {
    expect(toSnakeCase('hello_world')).toBe('hello_world');
  });

  it('should handle empty string', () => {
    expect(toSnakeCase('')).toBe('');
  });
});

describe('toKebabCase', () => {
  it('should convert to kebab-case', () => {
    expect(toKebabCase('helloWorld')).toBe('hello-world');
    expect(toKebabCase('HelloWorld')).toBe('hello-world');
    expect(toKebabCase('hello_world')).toBe('hello-world');
    expect(toKebabCase('hello world')).toBe('hello-world');
  });

  it('should handle already kebab-case', () => {
    expect(toKebabCase('hello-world')).toBe('hello-world');
  });

  it('should handle empty string', () => {
    expect(toKebabCase('')).toBe('');
  });
});

// ============================================================================
// String Sanitization Tests
// ============================================================================

describe('escapeHtml', () => {
  it('should escape HTML special characters', () => {
    expect(escapeHtml('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
    );
    expect(escapeHtml("Tom & Jerry's")).toBe('Tom &amp; Jerry&#39;s');
  });

  it('should handle strings without special characters', () => {
    expect(escapeHtml('Hello World')).toBe('Hello World');
  });

  it('should handle all special characters', () => {
    expect(escapeHtml('&<>"\'')).toBe('&amp;&lt;&gt;&quot;&#39;');
  });

  it('should handle empty string', () => {
    expect(escapeHtml('')).toBe('');
  });

  it('should handle non-string values', () => {
    expect(escapeHtml(null as unknown as string)).toBe('');
    expect(escapeHtml(undefined as unknown as string)).toBe('');
  });
});

describe('unescapeHtml', () => {
  it('should unescape HTML entities', () => {
    expect(unescapeHtml('&lt;div&gt;Hello&lt;/div&gt;')).toBe('<div>Hello</div>');
    expect(unescapeHtml('Tom &amp; Jerry&#39;s')).toBe("Tom & Jerry's");
  });

  it('should handle multiple entity formats', () => {
    expect(unescapeHtml('&#39;&#x27;&apos;')).toBe("'''");
  });

  it('should handle strings without entities', () => {
    expect(unescapeHtml('Hello World')).toBe('Hello World');
  });

  it('should handle empty string', () => {
    expect(unescapeHtml('')).toBe('');
  });
});

describe('stripHtml', () => {
  it('should remove HTML tags', () => {
    expect(stripHtml('<p>Hello <strong>World</strong></p>')).toBe('Hello World');
    expect(stripHtml('<div class="test">Content</div>')).toBe('Content');
  });

  it('should handle self-closing tags', () => {
    expect(stripHtml('Hello<br/>World')).toBe('HelloWorld');
    expect(stripHtml('Image: <img src="test.jpg" />')).toBe('Image: ');
  });

  it('should handle nested tags', () => {
    expect(stripHtml('<div><p><span>Nested</span></p></div>')).toBe('Nested');
  });

  it('should handle strings without tags', () => {
    expect(stripHtml('Hello World')).toBe('Hello World');
  });

  it('should handle empty string', () => {
    expect(stripHtml('')).toBe('');
  });
});

describe('slugify', () => {
  it('should create URL-friendly slugs', () => {
    expect(slugify('Hello World!')).toBe('hello-world');
    expect(slugify('My Blog Post Title')).toBe('my-blog-post-title');
  });

  it('should handle special characters', () => {
    expect(slugify('What is this? (A test!)')).toBe('what-is-this-a-test');
    expect(slugify('Price: $100')).toBe('price-100');
  });

  it('should handle accented characters', () => {
    expect(slugify('Café résumé')).toBe('cafe-resume');
    expect(slugify('Ñoño')).toBe('nono');
  });

  it('should collapse multiple hyphens', () => {
    expect(slugify('hello---world')).toBe('hello-world');
    expect(slugify('  multiple   spaces  ')).toBe('multiple-spaces');
  });

  it('should handle empty string', () => {
    expect(slugify('')).toBe('');
  });
});

describe('sanitizeFilename', () => {
  it('should remove invalid filename characters', () => {
    expect(sanitizeFilename('file:name?.txt')).toBe('filename.txt');
    expect(sanitizeFilename('path/to\\file')).toBe('pathtofile');
    expect(sanitizeFilename('test<>file.doc')).toBe('testfile.doc');
  });

  it('should support replacement character', () => {
    expect(sanitizeFilename('file:name?.txt', '_')).toBe('file_name_.txt');
    expect(sanitizeFilename('test*file', '-')).toBe('test-file');
  });

  it('should remove leading/trailing dots', () => {
    expect(sanitizeFilename('.hidden')).toBe('hidden');
    expect(sanitizeFilename('file.')).toBe('file');
    expect(sanitizeFilename('...dots...')).toBe('dots');
  });

  it('should trim whitespace', () => {
    expect(sanitizeFilename('  file.txt  ')).toBe('file.txt');
  });

  it('should handle empty string', () => {
    expect(sanitizeFilename('')).toBe('');
  });
});

describe('normalizeWhitespace', () => {
  it('should collapse multiple spaces', () => {
    expect(normalizeWhitespace('hello   world')).toBe('hello world');
    expect(normalizeWhitespace('  multiple   spaces  ')).toBe('multiple spaces');
  });

  it('should handle newlines and tabs', () => {
    expect(normalizeWhitespace('hello\n\nworld')).toBe('hello world');
    expect(normalizeWhitespace('hello\t\tworld')).toBe('hello world');
    expect(normalizeWhitespace('mixed\n\t  whitespace')).toBe('mixed whitespace');
  });

  it('should trim leading/trailing whitespace', () => {
    expect(normalizeWhitespace('  hello  ')).toBe('hello');
  });

  it('should handle empty string', () => {
    expect(normalizeWhitespace('')).toBe('');
  });
});

describe('removeNonAlphanumeric', () => {
  it('should remove non-alphanumeric characters', () => {
    expect(removeNonAlphanumeric('Hello, World! 123')).toBe('HelloWorld123');
    expect(removeNonAlphanumeric('test@email.com')).toBe('testemailcom');
  });

  it('should preserve spaces when specified', () => {
    expect(removeNonAlphanumeric('Hello, World! 123', true)).toBe('Hello World 123');
    expect(removeNonAlphanumeric('test@email.com', true)).toBe('testemailcom');
  });

  it('should handle strings with only alphanumeric chars', () => {
    expect(removeNonAlphanumeric('HelloWorld123')).toBe('HelloWorld123');
  });

  it('should handle empty string', () => {
    expect(removeNonAlphanumeric('')).toBe('');
  });
});

describe('removeNonPrintable', () => {
  it('should remove control characters', () => {
    expect(removeNonPrintable('Hello\x00World')).toBe('HelloWorld');
    expect(removeNonPrintable('Test\x1FString')).toBe('TestString');
  });

  it('should preserve normal whitespace', () => {
    expect(removeNonPrintable('Hello World\nNew Line\tTab')).toBe(
      'Hello World\nNew Line\tTab'
    );
  });

  it('should handle strings without control chars', () => {
    expect(removeNonPrintable('Normal String')).toBe('Normal String');
  });

  it('should handle empty string', () => {
    expect(removeNonPrintable('')).toBe('');
  });
});

describe('truncate', () => {
  it('should truncate long strings', () => {
    expect(truncate('Hello World', 8)).toBe('Hello...');
    expect(truncate('Hello World', 10)).toBe('Hello W...');
  });

  it('should not truncate short strings', () => {
    expect(truncate('Hi', 10)).toBe('Hi');
    expect(truncate('Hello', 5)).toBe('Hello');
  });

  it('should support custom suffix', () => {
    expect(truncate('Hello World', 8, '…')).toBe('Hello W…');
    expect(truncate('Hello World', 10, ' [more]')).toBe('Hel [more]');
  });

  it('should handle edge cases', () => {
    expect(truncate('Hello', 3)).toBe('...');
    expect(truncate('Hello', 2)).toBe('..');
    expect(truncate('Hello', 0)).toBe('');
    expect(truncate('Hello', -1)).toBe('');
  });

  it('should handle empty string', () => {
    expect(truncate('', 10)).toBe('');
  });
});

describe('removeAccents', () => {
  it('should remove diacritical marks', () => {
    expect(removeAccents('café')).toBe('cafe');
    expect(removeAccents('résumé')).toBe('resume');
    expect(removeAccents('naïve')).toBe('naive');
  });

  it('should handle various accented characters', () => {
    expect(removeAccents('àáâãäå')).toBe('aaaaaa');
    expect(removeAccents('ÀÁÂÃÄÅ')).toBe('AAAAAA');
    expect(removeAccents('ñ')).toBe('n');
    expect(removeAccents('Ñ')).toBe('N');
    expect(removeAccents('çÇ')).toBe('cC');
  });

  it('should handle strings without accents', () => {
    expect(removeAccents('Hello World')).toBe('Hello World');
  });

  it('should handle empty string', () => {
    expect(removeAccents('')).toBe('');
  });
});

describe('escapeRegExp', () => {
  it('should escape regex special characters', () => {
    expect(escapeRegExp('Hello (World)?')).toBe('Hello \\(World\\)\\?');
    expect(escapeRegExp('[test]')).toBe('\\[test\\]');
    expect(escapeRegExp('$100.00')).toBe('\\$100\\.00');
  });

  it('should escape all special characters', () => {
    expect(escapeRegExp('.*+?^${}()|[]\\')).toBe(
      '\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\'
    );
  });

  it('should work in actual regex', () => {
    const text = 'Price is $100.00 (USD)';
    const search = '$100.00';
    const regex = new RegExp(escapeRegExp(search));
    expect(regex.test(text)).toBe(true);
  });

  it('should handle strings without special chars', () => {
    expect(escapeRegExp('Hello World')).toBe('Hello World');
  });

  it('should handle empty string', () => {
    expect(escapeRegExp('')).toBe('');
  });
});
