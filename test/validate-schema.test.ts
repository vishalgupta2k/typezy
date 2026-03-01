import { describe, it, expect } from 'vitest';
import { validateSchema } from '../src/validate/index';
import { validateRequired, validateEmail, validateMinLength, validateInRange } from '../src/validate/validators';

describe('validateSchema', () => {
  it('should validate an object successfully against a schema', () => {
    const schema = {
      name: validateRequired,
      email: [validateRequired, validateEmail],
      age: validateInRange(18, 99)
    };

    const validData = { name: 'Alice', email: 'alice@example.com', age: 25 };
    const result = validateSchema(validData, schema);

    expect(result.valid).toBe(true);
    expect(result.data).toEqual(validData);
    expect(result.errors).toBeUndefined();
  });

  it('should return errors for invalid fields', () => {
    const schema = {
      name: validateRequired,
      email: [validateRequired, validateEmail],
      password: [validateRequired, validateMinLength(8)]
    };

    const invalidData = { name: '', email: 'not-an-email', password: '123' };
    const result = validateSchema(invalidData, schema);

    expect(result.valid).toBe(false);
    expect(result.data).toBeUndefined();
    expect(result.errors).toBeDefined();
    
    // Check specific field errors
    expect(result.errors?.name).toContain('This field is required');
    expect(result.errors?.email).toContain('Please enter a valid email address');
    expect(result.errors?.password).toContain('Must be at least 8 characters');
  });

  it('should handle non-object inputs safely', () => {
    const schema = { name: validateRequired };
    const result = validateSchema(null, schema);

    expect(result.valid).toBe(false);
    expect((result.errors as any)?._root).toContain('Expected an object');
  });
});
