/**
 * Checks if an object has its own property (not inherited).
 * @param obj - The object to check
 * @param key - The property key to look for
 * @returns `true` if the object has the own property, `false` otherwise
 */
export function hasOwn<T extends object>(obj: T, key: PropertyKey): key is keyof T {
  if (obj === null || obj === undefined) {
    return false;
  }
  return Object.hasOwn(obj, key);
}

/**
 * Checks if an object has a nested key path.
 * @param obj - The object to check
 * @param path - The dot-separated path (e.g., 'user.address.city')
 * @returns `true` if the path exists, `false` otherwise
 */
export function hasKey(obj: unknown, path: string): boolean {
  if (obj === null || obj === undefined || typeof obj !== 'object') {
    return false;
  }

  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return false;
    }
    if (!Object.hasOwn(current, key)) {
      return false;
    }
    current = (current as Record<string, unknown>)[key];
  }

  return true;
}
