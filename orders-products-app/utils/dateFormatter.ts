export function formatDate(
  dateString: string,
  format: "short" | "long" = "short"
) {
  const date = new Date(dateString);
  return format === "short"
    ? date.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
}
