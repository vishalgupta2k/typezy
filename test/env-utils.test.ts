import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  requireEnv,
  requireEnvNumber,
  requireEnvBoolean,
  isEnvDefined,
} from '../src/utils/envUtils.js';
import { AssertionError } from '../src/utils/AssertionError.js';

describe('requireEnv', () => {
  beforeEach(() => {
    process.env.TEST_VAR = 'hello';
    process.env.TEST_EMPTY = '';
    process.env.TEST_SPACES = '   ';
  });

  afterEach(() => {
    delete process.env.TEST_VAR;
    delete process.env.TEST_EMPTY;
    delete process.env.TEST_SPACES;
  });

  it('should return the value for defined env vars', () => {
    expect(requireEnv('TEST_VAR')).toBe('hello');
  });

  it('should throw for undefined env vars', () => {
    expect(() => requireEnv('NONEXISTENT_VAR')).toThrow(AssertionError);
  });

  it('should throw for empty env vars', () => {
    expect(() => requireEnv('TEST_EMPTY')).toThrow(AssertionError);
  });

  it('should throw for whitespace-only env vars', () => {
    expect(() => requireEnv('TEST_SPACES')).toThrow(AssertionError);
  });

  it('should use custom error message', () => {
    expect(() => requireEnv('NONEXISTENT', 'Custom msg')).toThrow('Custom msg');
  });
});

describe('requireEnvNumber', () => {
  beforeEach(() => {
    process.env.TEST_PORT = '3000';
    process.env.TEST_NAN = 'abc';
  });

  afterEach(() => {
    delete process.env.TEST_PORT;
    delete process.env.TEST_NAN;
  });

  it('should return a number for numeric env vars', () => {
    expect(requireEnvNumber('TEST_PORT')).toBe(3000);
  });

  it('should throw for non-numeric env vars', () => {
    expect(() => requireEnvNumber('TEST_NAN')).toThrow(AssertionError);
  });
});

describe('requireEnvBoolean', () => {
  afterEach(() => {
    delete process.env.TEST_BOOL;
  });

  it('should return true for truthy values', () => {
    for (const val of ['true', '1', 'yes']) {
      process.env.TEST_BOOL = val;
      expect(requireEnvBoolean('TEST_BOOL')).toBe(true);
    }
  });

  it('should return false for falsy values', () => {
    for (const val of ['false', '0', 'no']) {
      process.env.TEST_BOOL = val;
      expect(requireEnvBoolean('TEST_BOOL')).toBe(false);
    }
  });

  it('should throw for non-boolean values', () => {
    process.env.TEST_BOOL = 'maybe';
    expect(() => requireEnvBoolean('TEST_BOOL')).toThrow(AssertionError);
  });
});

describe('isEnvDefined', () => {
  beforeEach(() => {
    process.env.TEST_DEFINED = 'value';
    process.env.TEST_EMPTY_DEF = '';
  });

  afterEach(() => {
    delete process.env.TEST_DEFINED;
    delete process.env.TEST_EMPTY_DEF;
  });

  it('should return true for defined non-empty env vars', () => {
    expect(isEnvDefined('TEST_DEFINED')).toBe(true);
  });

  it('should return false for empty env vars', () => {
    expect(isEnvDefined('TEST_EMPTY_DEF')).toBe(false);
  });

  it('should return false for undefined env vars', () => {
    expect(isEnvDefined('NONEXISTENT_VAR_2')).toBe(false);
  });
});
