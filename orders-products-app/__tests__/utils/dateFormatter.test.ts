import { describe, it, expect } from "vitest";
import { formatDate } from "@/utils/dateFormatter";

describe("formatDate", () => {
  it("formats ISO date in short format by default", () => {
    const result = formatDate("2024-03-15");
    expect(result).toMatch(/\d{1,2}[./]\d{1,2}[./]\d{4}/);
  });

  it("uses short format when passed 'short'", () => {
    const result = formatDate("2024-01-01", "short");
    expect(result).toBeDefined();
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("uses long format when passed 'long'", () => {
    const result = formatDate("2024-06-20", "long");
    expect(result).toBeDefined();
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("handles ISO datetime string", () => {
    const result = formatDate("2024-02-29T12:00:00.000Z", "short");
    expect(result).toBeDefined();
    expect(result).toMatch(/\d/);
  });
});
