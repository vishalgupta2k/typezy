import { isString } from './isString.js';

/**
 * Pattern for numeric identifier (no leading zeros except for 0).
 */
const NUMERIC_ID = /^(0|[1-9]\d*)$/;

/**
 * Pattern for alphanumeric identifier.
 */
const ALPHANUM_ID = /^[\da-zA-Z-]+$/;

/**
 * Validates a prerelease or build identifier.
 */
function isValidIdentifier(id: string, allowLeadingZero: boolean): boolean {
  if (id.length === 0) {
    return false;
  }
  if (allowLeadingZero) {
    return ALPHANUM_ID.test(id);
  }
  // Numeric identifiers must not have leading zeros
  if (/^\d+$/.test(id)) {
    return NUMERIC_ID.test(id);
  }
  return ALPHANUM_ID.test(id);
}

/**
 * Checks if a value is a valid semantic version string.
 * @param value - The value to check
 * @returns `true` if the value is a valid semver, `false` otherwise
 */
export function isSemVer(value: unknown): value is string {
  if (!isString(value)) {
    return false;
  }

  // Split off build metadata
  const [versionAndPre, ...buildParts] = value.split('+');
  if (buildParts.length > 1) {
    return false;
  }

  const buildMeta = buildParts[0];
  if (buildMeta !== undefined) {
    const buildIds = buildMeta.split('.');
    if (!buildIds.every((id) => isValidIdentifier(id, true))) {
      return false;
    }
  }

  // Split off prerelease
  const [version, ...preParts] = (versionAndPre ?? '').split('-');
  const prerelease = preParts.join('-');

  if (prerelease) {
    const preIds = prerelease.split('.');
    if (!preIds.every((id) => isValidIdentifier(id, false))) {
      return false;
    }
  }

  // Validate version numbers
  const versionParts = (version ?? '').split('.');
  if (versionParts.length !== 3) {
    return false;
  }

  return versionParts.every((part) => NUMERIC_ID.test(part));
}
