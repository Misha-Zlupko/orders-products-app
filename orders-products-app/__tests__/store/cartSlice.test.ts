import { describe, it, expect } from "vitest";
import cartReducer, {
  addItem,
  updateQuantity,
  removeItem,
  clearCart,
} from "@/store/slices/cartSlice";
import { initialCartState } from "@/types/cart";
import type { CartItem } from "@/types/cart";

const baseItem: CartItem = {
  id: 1,
  title: "Test Product",
  price: 100,
  currency: "USD",
  type: "Test",
  quantity: 1,
  maxQuantity: 10,
};

describe("cartSlice", () => {
  describe("addItem", () => {
    it("adds new item to empty cart and updates totals", () => {
      const state = cartReducer(initialCartState, addItem(baseItem));
      expect(state.items).toHaveLength(1);
      expect(state.items[0]).toMatchObject({
        id: 1,
        title: "Test Product",
        quantity: 1,
        price: 100,
      });
      expect(state.totalItems).toBe(1);
      expect(state.totalPrice).toBe(100);
      expect(state.lastUpdated).toBeDefined();
    });

    it("merges quantity when adding same id", () => {
      let state = cartReducer(initialCartState, addItem(baseItem));
      state = cartReducer(state, addItem({ ...baseItem, quantity: 2 }));
      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(3);
      expect(state.totalItems).toBe(3);
      expect(state.totalPrice).toBe(300);
    });

    it("respects maxQuantity when merging", () => {
      let state = cartReducer(
        initialCartState,
        addItem({ ...baseItem, maxQuantity: 2 })
      );
      state = cartReducer(state, addItem({ ...baseItem, quantity: 5 }));
      expect(state.items[0].quantity).toBe(2);
    });
  });

  describe("updateQuantity", () => {
    it("updates quantity and recalculates totals", () => {
      let state = cartReducer(initialCartState, addItem(baseItem));
      state = cartReducer(state, updateQuantity({ id: 1, quantity: 3 }));
      expect(state.items[0].quantity).toBe(3);
      expect(state.totalItems).toBe(3);
      expect(state.totalPrice).toBe(300);
    });

    it("clamps to maxQuantity", () => {
      let state = cartReducer(
        initialCartState,
        addItem({ ...baseItem, maxQuantity: 5 })
      );
      state = cartReducer(state, updateQuantity({ id: 1, quantity: 10 }));
      expect(state.items[0].quantity).toBe(5);
    });

    it("does nothing for unknown id", () => {
      let state = cartReducer(initialCartState, addItem(baseItem));
      const before = state.totalItems;
      state = cartReducer(state, updateQuantity({ id: 999, quantity: 2 }));
      expect(state.totalItems).toBe(before);
    });
  });

  describe("removeItem", () => {
    it("removes item and recalculates totals", () => {
      let state = cartReducer(initialCartState, addItem(baseItem));
      state = cartReducer(state, addItem({ ...baseItem, id: 2, quantity: 1 }));
      state = cartReducer(state, removeItem(1));
      expect(state.items).toHaveLength(1);
      expect(state.items[0].id).toBe(2);
      expect(state.totalItems).toBe(1);
    });
  });

  describe("clearCart", () => {
    it("resets to initial empty state", () => {
      let state = cartReducer(initialCartState, addItem(baseItem));
      state = cartReducer(state, clearCart());
      expect(state.items).toHaveLength(0);
      expect(state.totalItems).toBe(0);
      expect(state.totalPrice).toBe(0);
      expect(state.lastUpdated).toBeDefined();
    });
  });
});
