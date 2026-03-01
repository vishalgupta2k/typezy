/**
 * Delays the execution of code for a specified number of milliseconds.
 * Promisified version of `setTimeout`.
 * @param ms - The number of milliseconds to sleep/delay
 * @returns A promise that resolves after the specified time
 * @example
 * await sleep(1000); // Pauses execution for 1 second
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Alias for `sleep`
 */
export const delay = sleep;
