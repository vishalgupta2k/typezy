/**
 * Custom error class for assertion failures.
 */
export class AssertionError extends Error {
  override readonly name = 'AssertionError';

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, AssertionError.prototype);
  }
}
