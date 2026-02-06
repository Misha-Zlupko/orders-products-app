import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, initialCartState } from "@/types/cart";
import { calculateCartTotals } from "@/utils/cartUtils";

function ensureItems(state: { items?: unknown[] }) {
  if (!Array.isArray(state.items)) {
    state.items = [];
  }
}

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      ensureItems(state);
      const item = action.payload;
      const existing = state.items!.find((i) => i.id === item.id);
      if (existing) {
        const maxQty = existing.maxQuantity ?? 100;
        existing.quantity = Math.min(existing.quantity + item.quantity, maxQty);
      } else {
        state.items.push({
          ...item,
          maxQuantity: item.maxQuantity ?? 100,
        });
      }
      const { totalItems, totalPrice } = calculateCartTotals(state.items);
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
      state.lastUpdated = new Date().toISOString();
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      ensureItems(state);
      const { id, quantity } = action.payload;
      const item = state.items!.find((i) => i.id === id);
      if (item) {
        item.quantity = Math.max(
          1,
          Math.min(quantity, item.maxQuantity ?? 100)
        );
        const { totalItems, totalPrice } = calculateCartTotals(state.items);
        state.totalItems = totalItems;
        state.totalPrice = totalPrice;
        state.lastUpdated = new Date().toISOString();
      }
    },

    removeItem: (state, action: PayloadAction<number>) => {
      ensureItems(state);
      state.items = state.items!.filter((i) => i.id !== action.payload);
      const { totalItems, totalPrice } = calculateCartTotals(state.items);
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
      state.lastUpdated = new Date().toISOString();
    },

    clearCart: () => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      lastUpdated: new Date().toISOString(),
    }),
  },
});

export const { addItem, updateQuantity, removeItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
