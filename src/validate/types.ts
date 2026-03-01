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

/**
 * A schema definition for an object where each key has one or more validation rules.
 */
export type Schema<T> = {
  [K in keyof T]: ValidationRule | ValidationRule[];
};

/**
 * Result of a schema validation check.
 */
export interface SchemaValidationResult<T> {
  /** Whether the entire object is valid */
  valid: boolean;
  /** The validated data (typed) if valid */
  data?: T;
  /** Map of field names to arrays of error messages */
  errors?: Partial<Record<keyof T, string[]>>;
}
