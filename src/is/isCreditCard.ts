import { isString } from './isString.js';

/**
 * Validates a credit card number using the Luhn algorithm.
 */
function luhnCheck(cardNumber: string): boolean {
  const digits = cardNumber.replaceAll(/\D/g, '');
  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = Number.parseInt(digits[i] ?? '0', 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * Checks if a value is a valid credit card number (using Luhn algorithm).
 * @param value - The value to check
 * @returns `true` if the value is a valid credit card number, `false` otherwise
 */
export function isCreditCard(value: unknown): value is string {
  if (!isString(value)) {
    return false;
  }

  const digits = value.replaceAll(/\D/g, '');

  // Most cards are 13-19 digits
  if (digits.length < 13 || digits.length > 19) {
    return false;
  }

  return luhnCheck(digits);
}
