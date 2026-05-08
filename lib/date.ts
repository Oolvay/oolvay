import { format, formatDistanceToNow } from "date-fns"

/**
 * Standard Full Date: "April 24, 2026"
 */
export function formatDate(date: Date | string | number) {
  return format(new Date(date), "MMMM d, yyyy")
}

/**
 * Relative Time: "3 days ago"
 */
export function formatRelativeTime(date: Date | string | number) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  })
}

/**
 * Full Date + Time: "April 24, 2026, 1:41 PM"
 */
export function formatDateTime(date: Date | string | number) {
  return format(new Date(date), "MMMM d, yyyy, h:mm a zzz")
}

/**
 * Filename-safe timestamp: "2026-05-08T14-32-01"
 */
export function formatFilenameTimestamp(date: Date | string | number) {
  return format(new Date(date), "yyyy-MM-dd'T'HH-mm-ss")
}
