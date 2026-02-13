import { isString } from './isString.js';

/**
 * Common image file extensions.
 */
const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico'];

/**
 * Common document file extensions.
 */
const DOCUMENT_EXTENSIONS = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'csv'];

/**
 * Checks if a filename has one of the allowed extensions.
 * @param filename - The filename to check
 * @param allowedExtensions - Array of allowed extensions (without dots)
 * @returns `true` if the filename has an allowed extension, `false` otherwise
 */
export function hasFileExtension(filename: unknown, allowedExtensions: string[]): boolean {
  if (!isString(filename)) {
    return false;
  }

  const ext = filename.split('.').pop()?.toLowerCase();
  if (!ext) {
    return false;
  }

  return allowedExtensions.map((e) => e.toLowerCase()).includes(ext);
}

/**
 * Checks if a filename is an image file.
 * @param filename - The filename to check
 * @returns `true` if the filename has an image extension, `false` otherwise
 */
export function isImageFile(filename: unknown): boolean {
  return hasFileExtension(filename, IMAGE_EXTENSIONS);
}

/**
 * Checks if a filename is a document file.
 * @param filename - The filename to check
 * @returns `true` if the filename has a document extension, `false` otherwise
 */
export function isDocumentFile(filename: unknown): boolean {
  return hasFileExtension(filename, DOCUMENT_EXTENSIONS);
}

/**
 * Checks if a MIME type matches expected types.
 * @param mimeType - The MIME type to check
 * @param allowedTypes - Array of allowed MIME types or patterns (e.g., 'image/*')
 * @returns `true` if the MIME type is allowed, `false` otherwise
 */
export function isMimeType(mimeType: unknown, allowedTypes: string[]): boolean {
  if (!isString(mimeType)) {
    return false;
  }

  const normalizedMime = mimeType.toLowerCase();

  return allowedTypes.some((allowed) => {
    const normalizedAllowed = allowed.toLowerCase();
    if (normalizedAllowed.endsWith('/*')) {
      const prefix = normalizedAllowed.slice(0, -1);
      return normalizedMime.startsWith(prefix);
    }
    return normalizedMime === normalizedAllowed;
  });
}

/**
 * Checks if a MIME type is an image type.
 * @param mimeType - The MIME type to check
 * @returns `true` if it's an image MIME type, `false` otherwise
 */
export function isImageMimeType(mimeType: unknown): boolean {
  return isMimeType(mimeType, ['image/*']);
}
