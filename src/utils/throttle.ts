/**
 * Creates a throttled function that only invokes the provided function at most once per
 * every `limit` milliseconds.
 * @param func - The function to throttle
 * @param limit - The number of milliseconds to throttle invocations to
 * @returns A new throttled function
 * @example
 * const throttledScroll = throttle(() => handleScroll(), 100);
 */
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle = false;

  return function (...args: Parameters<T>): void {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}
