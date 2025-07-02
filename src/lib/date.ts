/**
 * Formats a date string or Date object into a human-readable format
 * @param date - The date to format (string or Date object)
 * @param locale - The locale to use for formatting (default: 'en-US')
 * @returns Formatted date string (e.g., "May 15, 2023") or empty string if the input is invalid
 */
export function formatDate(date: string | Date, locale: string = 'en-US'): string {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      return '';
    }
    
    return dateObj.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}
