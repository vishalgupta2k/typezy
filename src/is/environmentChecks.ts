/**
 * Checks if code is running in a browser environment.
 * @returns `true` if running in a browser, `false` otherwise
 */
export function isBrowser(): boolean {
  return globalThis.window !== undefined && globalThis.document !== undefined;
}

/**
 * Checks if code is running in a Node.js environment.
 * @returns `true` if running in Node.js, `false` otherwise
 */
export function isNode(): boolean {
  return typeof process !== 'undefined' && 
         process.versions?.node !== undefined;
}

/**
 * Checks if code is running in a Web Worker.
 * @returns `true` if running in a Web Worker, `false` otherwise
 */
export function isWebWorker(): boolean {
  return typeof globalThis.self === 'object' &&
         globalThis.self?.constructor?.name === 'DedicatedWorkerGlobalScope';
}

/**
 * Checks if code is running in a server-side environment (not browser).
 * @returns `true` if running on server side, `false` otherwise
 */
export function isServer(): boolean {
  return !isBrowser();
}

/**
 * Browser details interface.
 */
export interface BrowserDetails {
  name: string;
  version: string;
  platform: string;
  isMobile: boolean;
  language: string;
  userAgent: string;
}

/** Extracts version from user agent by splitting on a marker */
function extractVersion(ua: string, marker: string): string {
  return ua.split(marker)[1]?.split(' ')[0] ?? '';
}

/** Detects browser name and version from user agent */
function detectBrowser(ua: string): { name: string; version: string } {
  const browsers: Array<{ marker: string; name: string; versionMarker?: string }> = [
    { marker: 'Firefox/', name: 'Firefox' },
    { marker: 'Edg/', name: 'Edge' },
    { marker: 'OPR/', name: 'Opera' },
    { marker: 'Opera/', name: 'Opera' },
    { marker: 'Chrome/', name: 'Chrome' },
  ];

  for (const { marker, name, versionMarker } of browsers) {
    if (ua.includes(marker)) {
      return { name, version: extractVersion(ua, versionMarker ?? marker) };
    }
  }

  // Safari check (must not contain Chrome)
  if (ua.includes('Safari/') && !ua.includes('Chrome')) {
    return { name: 'Safari', version: extractVersion(ua, 'Version/') };
  }

  return { name: 'Unknown', version: '' };
}

/** Detects platform from userAgentData or user agent string */
function detectPlatform(nav: Navigator | undefined, ua: string): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userAgentData = (nav as any)?.userAgentData;
  if (userAgentData?.platform) {
    return userAgentData.platform;
  }

  const platforms: Array<{ pattern: string; name: string }> = [
    { pattern: 'Windows', name: 'Windows' },
    { pattern: 'Mac OS', name: 'macOS' },
    { pattern: 'Android', name: 'Android' },
    { pattern: 'iPhone', name: 'iOS' },
    { pattern: 'iPad', name: 'iOS' },
    { pattern: 'Linux', name: 'Linux' },
  ];

  for (const { pattern, name } of platforms) {
    if (ua.includes(pattern)) {
      return name;
    }
  }

  return '';
}

/**
 * Gets browser details including name, version, platform, and other info.
 * Returns null if not running in a browser environment.
 * @returns Browser details object or null if not in browser
 */
export function getBrowserDetails(): BrowserDetails | null {
  if (!isBrowser()) {
    return null;
  }

  const nav = globalThis.navigator;
  const ua = nav?.userAgent ?? '';
  const { name, version } = detectBrowser(ua);
  const platform = detectPlatform(nav, ua);
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

  return {
    name,
    version,
    platform,
    isMobile,
    language: nav?.language ?? '',
    userAgent: ua,
  };
}
