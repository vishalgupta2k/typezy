import { isDate } from './isDate.js';
import { isValidDate } from './isValidDate.js';

/**
 * Normalizes a value to a valid Date, or returns null.
 */
function toValidDate(value: unknown): Date | null {
  if (isDate(value) && isValidDate(value)) {
    return value;
  }
  if (typeof value === 'string' || typeof value === 'number') {
    const d = new Date(value);
    return isValidDate(d) ? d : null;
  }
  return null;
}

/**
 * Checks if a date value is in the future.
 * @param value - A Date, date string, or timestamp
 * @returns `true` if the date is in the future
 * @example isInFuture(new Date('2030-01-01')) // true (assuming current date is before 2030)
 */
export function isInFuture(value: unknown): boolean {
  const date = toValidDate(value);
  return date !== null && date.getTime() > Date.now();
}

/**
 * Checks if a date value is in the past.
 * @param value - A Date, date string, or timestamp
 * @returns `true` if the date is in the past
 * @example isInPast(new Date('2020-01-01')) // true
 */
export function isInPast(value: unknown): boolean {
  const date = toValidDate(value);
  return date !== null && date.getTime() < Date.now();
}

/**
 * Checks if a date value represents today's date.
 * @param value - A Date, date string, or timestamp
 * @returns `true` if the date is today
 */
export function isToday(value: unknown): boolean {
  const date = toValidDate(value);
  if (date === null) return false;

  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

/**
 * Checks if a date value falls between two other dates (inclusive).
 * @param value - A Date, date string, or timestamp to check
 * @param start - Start of the date range
 * @param end - End of the date range
 * @returns `true` if the date is between start and end (inclusive)
 */
export function isBetweenDates(value: unknown, start: Date, end: Date): boolean {
  const date = toValidDate(value);
  if (date === null) return false;

  const t = date.getTime();
  return t >= start.getTime() && t <= end.getTime();
}

/**
 * Checks if two dates represent the same calendar day.
 * @param a - First date
 * @param b - Second date
 * @returns `true` if both dates are on the same day
 */
export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
