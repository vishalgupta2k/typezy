import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce } from '../src/utils/debounce';
import { throttle } from '../src/utils/throttle';
import { deepClone } from '../src/utils/deepClone';
import { sleep, delay } from '../src/utils/sleep';

describe('Frontend & Async Utilities', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('debounce', () => {
    it('should debounce function calls', () => {
      const func = vi.fn();
      const debounced = debounce(func, 100);

      debounced();
      debounced();
      debounced();

      expect(func).not.toHaveBeenCalled();

      vi.advanceTimersByTime(50);
      expect(func).not.toHaveBeenCalled();

      vi.advanceTimersByTime(50);
      expect(func).toHaveBeenCalledTimes(1);
    });

    it('should pass arguments to the debounced function', () => {
      const func = vi.fn();
      const debounced = debounce(func, 100);

      debounced('hello', 42);
      vi.advanceTimersByTime(100);

      expect(func).toHaveBeenCalledWith('hello', 42);
    });
  });

  describe('throttle', () => {
    it('should throttle function calls', () => {
      const func = vi.fn();
      const throttled = throttle(func, 100);

      throttled();
      expect(func).toHaveBeenCalledTimes(1);

      throttled();
      throttled();
      expect(func).toHaveBeenCalledTimes(1); // Still 1

      vi.advanceTimersByTime(100);
      throttled();
      expect(func).toHaveBeenCalledTimes(2);
    });

    it('should pass arguments to the throttled function', () => {
      const func = vi.fn();
      const throttled = throttle(func, 100);

      throttled('hello', 42);
      expect(func).toHaveBeenCalledWith('hello', 42);
    });
  });

  describe('deepClone', () => {
    it('should deep clone simple objects', () => {
      const obj = { a: 1, b: 'two' };
      const clone = deepClone(obj);
      expect(clone).toEqual(obj);
      expect(clone).not.toBe(obj);
    });

    it('should deep clone nested objects', () => {
      const obj = { a: { b: { c: 3 } } };
      const clone = deepClone(obj);
      expect(clone).toEqual(obj);
      expect(clone.a).not.toBe(obj.a);
      expect(clone.a.b).not.toBe(obj.a.b);
    });

    it('should deep clone arrays', () => {
      const arr = [1, [2, 3], { a: 4 }];
      const clone = deepClone(arr);
      expect(clone).toEqual(arr);
      expect(clone).not.toBe(arr);
      expect(clone[1]).not.toBe(arr[1]);
      expect(clone[2]).not.toBe(arr[2]);
    });

    it('should handle undefined', () => {
      expect(deepClone(undefined)).toBeUndefined();
    });
  });

  describe('sleep / delay', () => {
    it('should pause execution for the specified time', async () => {
      let resolved = false;
      const promise = sleep(100).then(() => {
        resolved = true;
      });

      expect(resolved).toBe(false);

      vi.advanceTimersByTime(50);
      await Promise.resolve(); // flush microtasks
      expect(resolved).toBe(false);

      vi.advanceTimersByTime(50);
      await promise;
      expect(resolved).toBe(true);
    });

    it('delay should be an alias for sleep', () => {
      expect(delay).toBe(sleep);
    });
  });
});
