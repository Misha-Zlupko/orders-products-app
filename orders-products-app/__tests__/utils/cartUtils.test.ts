import { describe, it, expect } from "vitest";
import { calculateCartTotals } from "@/utils/cartUtils";
import type { CartItem } from "@/types/cart";

function makeItem(overrides: Partial<CartItem> = {}): CartItem {
  return {
    id: 1,
    title: "Product",
    price: 10,
    currency: "USD",
    type: "Test",
    quantity: 1,
    maxQuantity: 10,
    ...overrides,
  };
}

describe("calculateCartTotals", () => {
  it("returns zero totals for empty items", () => {
    const result = calculateCartTotals([]);
    expect(result).toEqual({ totalItems: 0, totalPrice: 0 });
  });

  it("sums quantity and price for a single item", () => {
    const items = [makeItem({ quantity: 2, price: 100 })];
    const result = calculateCartTotals(items);
    expect(result.totalItems).toBe(2);
    expect(result.totalPrice).toBe(200);
  });

  it("sums multiple items correctly", () => {
    const items = [
      makeItem({ id: 1, quantity: 1, price: 50 }),
      makeItem({ id: 2, quantity: 3, price: 10 }),
    ];
    const result = calculateCartTotals(items);
    expect(result.totalItems).toBe(4);
    expect(result.totalPrice).toBe(80);
  });

  it("handles fractional prices (no rounding)", () => {
    const items = [makeItem({ quantity: 2, price: 9.99 })];
    const result = calculateCartTotals(items);
    expect(result.totalPrice).toBe(19.98);
  });
});
