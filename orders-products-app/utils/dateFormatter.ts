/**
 * @param dateString
 * @param format
 * @param locale
 */
export function formatDate(
  dateString: string,
  format: "short" | "long" = "short",
  locale: string = "uk-UA",
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
