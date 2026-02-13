/**
 * Returns a human-readable relative time string (e.g. "5 minutes ago", "in 3 days").
 * @param date - The date to format
 * @returns A relative time string
 * @example timeAgo(new Date(Date.now() - 60000)) // '1 minute ago'
 * @example timeAgo(new Date(Date.now() - 3600000)) // '1 hour ago'
 */
export function timeAgo(date: Date): string {
  const now = Date.now();
  const diffMs = now - date.getTime();
  const absDiff = Math.abs(diffMs);
  const isFuture = diffMs < 0;

  const seconds = Math.floor(absDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const format = (value: number, unit: string): string => {
    const plural = value === 1 ? '' : 's';
    return isFuture
      ? `in ${value} ${unit}${plural}`
      : `${value} ${unit}${plural} ago`;
  };

  if (seconds < 5) return 'just now';
  if (seconds < 60) return format(seconds, 'second');
  if (minutes < 60) return format(minutes, 'minute');
  if (hours < 24) return format(hours, 'hour');
  if (days < 7) return format(days, 'day');
  if (weeks < 5) return format(weeks, 'week');
  if (months < 12) return format(months, 'month');
  return format(years, 'year');
}

/**
 * Returns a friendly relative date label.
 * @param date - The date to format
 * @returns A label like "Today", "Yesterday", "Last Monday", or a formatted date
 * @example formatRelativeDate(new Date()) // 'Today'
 */
export function formatRelativeDate(date: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.round((today.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays === -1) return 'Tomorrow';

  if (diffDays > 1 && diffDays < 7) {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return `Last ${dayNames[date.getDay()]}`;
  }

  if (diffDays < -1 && diffDays > -7) {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return `Next ${dayNames[date.getDay()]}`;
  }

  // Fallback to formatted date
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
