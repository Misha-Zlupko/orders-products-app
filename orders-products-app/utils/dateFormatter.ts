/**
 * @param dateString - ISO date string
 * @param format - "short" (DD.MM.YYYY) or "long" (day month year)
 * @param locale - BCP 47 locale, e.g. "uk-UA" or "en-GB" (from i18n)
 */
export function formatDate(
  dateString: string,
  format: "short" | "long" = "short",
  locale: string = "uk-UA"
) {
  const date = new Date(dateString);
  return format === "short"
    ? date.toLocaleDateString(locale, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : date.toLocaleDateString(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
}
