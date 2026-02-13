/**
 * Represents the result of a validation check.
 */
export interface ValidationResult {
  /** Whether the validation passed */
  valid: boolean;
  /** Error message if validation failed */
  error?: string;
}

/**
 * A validation rule function that takes a value and returns a ValidationResult.
 */
export type ValidationRule = (value: unknown) => ValidationResult;
