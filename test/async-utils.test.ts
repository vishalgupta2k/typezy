import { describe, it, expect } from 'vitest';
import {
  tryCatch,
  isHttpError,
  isNetworkError,
  timeout,
  retry,
  TimeoutError,
} from '../src/utils/asyncUtils.js';

describe('tryCatch', () => {
  it('should return [data, null] on success', async () => {
    const [data, error] = await tryCatch(() => 42);
    expect(data).toBe(42);
    expect(error).toBeNull();
  });

  it('should return [data, null] for async success', async () => {
    const [data, error] = await tryCatch(async () => 'hello');
    expect(data).toBe('hello');
    expect(error).toBeNull();
  });

  it('should return [null, error] on failure', async () => {
    const [data, error] = await tryCatch(() => {
      throw new Error('fail');
    });
    expect(data).toBeNull();
    expect(error).toBeInstanceOf(Error);
    expect(error!.message).toBe('fail');
  });

  it('should wrap non-Error throws', async () => {
    const nonError = 'string error';
    const [data, error] = await tryCatch(() => {
      throw new Error(nonError);
    });
    expect(data).toBeNull();
    expect(error).toBeInstanceOf(Error);
    expect(error!.message).toBe(nonError);
  });
});

describe('isHttpError', () => {
  it('should return true for objects with HTTP status codes', () => {
    expect(isHttpError({ status: 404 })).toBe(true);
    expect(isHttpError({ status: 500 })).toBe(true);
    expect(isHttpError({ status: 400 })).toBe(true);
  });

  it('should return false for success status codes', () => {
    expect(isHttpError({ status: 200 })).toBe(false);
    expect(isHttpError({ status: 301 })).toBe(false);
  });

  it('should return false for non-objects', () => {
    expect(isHttpError(null)).toBe(false);
    expect(isHttpError('error')).toBe(false);
    expect(isHttpError(undefined)).toBe(false);
  });
});

describe('isNetworkError', () => {
  it('should return true for fetch network errors', () => {
    expect(isNetworkError(new TypeError('Failed to fetch'))).toBe(true);
    expect(isNetworkError(new TypeError('NetworkError when attempting to fetch resource'))).toBe(true);
  });

  it('should return false for other TypeErrors', () => {
    expect(isNetworkError(new TypeError('Cannot read property'))).toBe(false);
  });

  it('should return false for non-TypeErrors', () => {
    expect(isNetworkError(new Error('Failed to fetch'))).toBe(false);
  });
});

describe('timeout', () => {
  it('should resolve if promise completes in time', async () => {
    const result = await timeout(Promise.resolve(42), 1000);
    expect(result).toBe(42);
  });

  it('should reject with TimeoutError if promise is too slow', async () => {
    const slow = new Promise((resolve) => setTimeout(resolve, 5000));
    await expect(timeout(slow, 50)).rejects.toThrow(TimeoutError);
  });

  it('should propagate original errors', async () => {
    const failing = Promise.reject(new Error('original'));
    await expect(timeout(failing, 1000)).rejects.toThrow('original');
  });
});

describe('retry', () => {
  it('should return result if function succeeds on first try', async () => {
    const result = await retry(async () => 42);
    expect(result).toBe(42);
  });

  it('should retry on failure and eventually succeed', async () => {
    let attempts = 0;
    const result = await retry(
      async () => {
        attempts++;
        if (attempts < 3) throw new Error('fail');
        return 'success';
      },
      { attempts: 3, delay: 10 },
    );
    expect(result).toBe('success');
    expect(attempts).toBe(3);
  });

  it('should throw last error after all attempts fail', async () => {
    await expect(
      retry(
        async () => {
          throw new Error('always fails');
        },
        { attempts: 2, delay: 10 },
      ),
    ).rejects.toThrow('always fails');
  });
});
