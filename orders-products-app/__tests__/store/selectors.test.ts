import { describe, it, expect } from "vitest";
import {
  selectOrders,
  selectOrdersByUserId,
  selectCart,
  selectCartItems,
  selectCartTotalItems,
  selectCartTotalPrice,
} from "@/store/selectors";
import type { RootState } from "@/store";

function createMockState(overrides: Partial<RootState> = {}): RootState {
  return {
    cart: {
      items: [],
      totalItems: 0,
      totalPrice: 0,
      lastUpdated: new Date().toISOString(),
    },
    orders: [
      {
        id: 1,
        title: "Order A",
        date: "2024-01-01",
        products: [],
        userId: "user-1",
      },
      {
        id: 2,
        title: "Order B",
        date: "2024-01-02",
        products: [],
        userId: "user-2",
      },
    ],
    ...overrides,
  } as RootState;
}

describe("selectors", () => {
  describe("selectOrders", () => {
    it("returns orders from state", () => {
      const state = createMockState();
      expect(selectOrders(state)).toHaveLength(2);
    });
  });

  describe("selectOrdersByUserId", () => {
    it("filters orders by userId", () => {
      const state = createMockState();
      expect(selectOrdersByUserId(state, "user-1")).toHaveLength(1);
      expect(selectOrdersByUserId(state, "user-1")[0].title).toBe("Order A");
    });

    it("returns empty array when userId is null", () => {
      const state = createMockState();
      expect(selectOrdersByUserId(state, null)).toEqual([]);
    });

    it("returns empty array when no matching userId", () => {
      const state = createMockState();
      expect(selectOrdersByUserId(state, "user-99")).toEqual([]);
    });
  });

  describe("selectCart", () => {
    it("returns cart state", () => {
      const state = createMockState();
      expect(selectCart(state)).toHaveProperty("items");
      expect(selectCart(state)).toHaveProperty("totalItems");
    });
  });

  describe("selectCartItems", () => {
    it("returns cart items array", () => {
      const state = createMockState();
      expect(selectCartItems(state)).toEqual([]);
    });
  });

  describe("selectCartTotalItems", () => {
    it("returns totalItems from cart", () => {
      const state = createMockState({
        cart: {
          items: [],
          totalItems: 5,
          totalPrice: 100,
          lastUpdated: "",
        },
      });
      expect(selectCartTotalItems(state)).toBe(5);
    });
  });

  describe("selectCartTotalPrice", () => {
    it("returns totalPrice from cart", () => {
      const state = createMockState({
        cart: {
          items: [],
          totalItems: 0,
          totalPrice: 199.99,
          lastUpdated: "",
        },
      });
      expect(selectCartTotalPrice(state)).toBe(199.99);
    });
  });
});
