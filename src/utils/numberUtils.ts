/**
 * Clamps a number between a minimum and maximum value.
 * @param value - The number to clamp
 * @param min - The minimum value
 * @param max - The maximum value
 * @returns The clamped value
 * @example clamp(15, 0, 10) // 10
 * @example clamp(-5, 0, 10) // 0
 * @example clamp(5, 0, 10) // 5
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Rounds a number to a specified number of decimal places.
 * @param value - The number to round
 * @param decimals - Number of decimal places (default: 0)
 * @returns The rounded number
 * @example roundTo(3.14159, 2) // 3.14
 * @example roundTo(1.005, 2) // 1.01
 */
export function roundTo(value: number, decimals: number = 0): number {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

/**
 * Formats a number as a currency string using Intl.NumberFormat.
 * @param value - The number to format
 * @param locale - The locale to use (default: 'en-US')
 * @param currency - The currency code (default: 'USD')
 * @returns Formatted currency string
 * @example formatCurrency(1234.56) // '$1,234.56'
 * @example formatCurrency(1234.56, 'de-DE', 'EUR') // '1.234,56 €'
 */
export function formatCurrency(
  value: number,
  locale: string = 'en-US',
  currency: string = 'USD',
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
}

/**
 * Formats a number in compact notation (e.g. 1.2K, 3.4M).
 * @param value - The number to format
 * @param locale - The locale to use (default: 'en-US')
 * @returns Compact formatted string
 * @example formatCompact(1234) // '1.2K'
 * @example formatCompact(1234567) // '1.2M'
 */
export function formatCompact(value: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

/**
 * Formats a number as a percentage string.
 * @param value - The number to format (0.5 = 50%)
 * @param decimals - Number of decimal places (default: 0)
 * @returns Formatted percentage string
 * @example formatPercentage(0.856, 1) // '85.6%'
 * @example formatPercentage(0.5) // '50%'
 */
export function formatPercentage(value: number, decimals: number = 0): string {
  return `${roundTo(value * 100, decimals)}%`;
}
