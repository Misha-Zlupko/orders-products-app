import type { RootState } from "./index";

export const selectOrders = (state: RootState) => state.orders;
export const selectOrdersByUserId = (state: RootState, userId: string | null) =>
  userId ? state.orders.filter((o) => o.userId === userId) : [];

export const selectCart = (state: RootState) => state.cart;

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartTotalItems = (state: RootState) => state.cart.totalItems;

export const selectCartTotalPrice = (state: RootState) => state.cart.totalPrice;
