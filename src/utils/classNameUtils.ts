/**
 * Conditionally joins class names together. A lightweight alternative to `clsx`/`classnames`.
 * Accepts strings, booleans, undefined, null, and objects with boolean values.
 *
 * @param args - Class name arguments
 * @returns A single space-separated class string
 *
 * @example cx('btn', 'btn-primary') // 'btn btn-primary'
 * @example cx('btn', isActive && 'btn-active', className) // 'btn btn-active my-class'
 * @example cx('btn', { 'btn-active': true, 'btn-disabled': false }) // 'btn btn-active'
 * @example cx('text', undefined, null, false, '', 'bold') // 'text bold'
 */
export function cx(
  ...args: (string | boolean | undefined | null | Record<string, boolean | undefined | null>)[]
): string {
  const classes: string[] = [];

  for (const arg of args) {
    if (!arg) continue;

    if (typeof arg === 'string') {
      classes.push(arg);
    } else if (typeof arg === 'object') {
      for (const key of Object.keys(arg)) {
        if (arg[key]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
}
