/**
 * Custom error class for timeout failures.
 */
export class TimeoutError extends Error {
  override readonly name = 'TimeoutError';

  constructor(message: string = 'Operation timed out') {
    super(message);
    Object.setPrototypeOf(this, TimeoutError.prototype);
  }
}

/**
 * Wraps a function call in a try/catch, returning a tuple [data, error].
 * Works with both sync and async functions — always returns a Promise.
 * Popular "Go-style" error handling pattern for Next.js server actions and API calls.
 * @param fn - The function to execute
 * @returns A tuple of [data, null] on success or [null, error] on failure
 * @example
 * const [user, error] = await tryCatch(() => fetchUser(id));
 * if (error) { console.error(error); return; }
 * console.log(user);
 */
export async function tryCatch<T>(
  fn: () => T | Promise<T>,
): Promise<[T, null] | [null, Error]> {
  try {
    const result = await fn();
    return [result, null];
  } catch (err) {
    return [null, err instanceof Error ? err : new Error(String(err))];
  }
}

/**
 * Checks if an error looks like an HTTP error (has a numeric `status` property in 400-599 range).
 * @param error - The error to check
 * @returns `true` if the error has an HTTP status code
 * @example isHttpError(new Response('', { status: 404 })) // true
 */
export function isHttpError(error: unknown): boolean {
  if (error === null || error === undefined || typeof error !== 'object') {
    return false;
  }
  const status = (error as Record<string, unknown>).status;
  return typeof status === 'number' && status >= 400 && status < 600;
}

/**
 * Checks if an error looks like a network error (typically a TypeError from fetch).
 * @param error - The error to check
 * @returns `true` if the error appears to be a network error
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof TypeError) {
    const msg = error.message.toLowerCase();
    return (
      msg.includes('failed to fetch') ||
      msg.includes('networkerror') ||
      msg.includes('network request failed') ||
      msg.includes('load failed') ||
      msg.includes('econnrefused') ||
      msg.includes('enotfound')
    );
  }
  return false;
}

/**
 * Wraps a promise with a timeout. Rejects with TimeoutError if not settled in time.
 * @param promise - The promise to wrap
 * @param ms - Timeout in milliseconds
 * @returns The promise result or a TimeoutError rejection
 * @example const data = await timeout(fetch('/api'), 5000);
 */
export function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new TimeoutError(`Operation timed out after ${ms}ms`));
    }, ms);

    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

/**
 * Options for the retry function.
 */
export interface RetryOptions {
  /** Maximum number of attempts (default: 3) */
  attempts?: number;
  /** Delay between retries in milliseconds (default: 1000) */
  delay?: number;
  /** Multiplier for exponential backoff (default: 1, no backoff) */
  backoff?: number;
}

/**
 * Retries an async function up to a specified number of times.
 * @param fn - The async function to retry
 * @param options - Retry configuration
 * @returns The result of the function
 * @throws The last error if all attempts fail
 * @example const data = await retry(() => fetch('/api/flaky'), { attempts: 3, delay: 1000 });
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options?: RetryOptions,
): Promise<T> {
  const { attempts = 3, delay = 1000, backoff = 1 } = options ?? {};
  let lastError: Error | undefined;

  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (i < attempts - 1) {
        const waitTime = delay * backoff ** i;
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    }
  }

  throw lastError;
}
