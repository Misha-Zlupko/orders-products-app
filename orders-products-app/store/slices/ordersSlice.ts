import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "@/types/order";

const ordersSlice = createSlice({
  name: "orders",
  initialState: [] as Order[],
  reducers: {
    addOrder: (state, action: PayloadAction<Omit<Order, "id">>) => {
      const id =
        state.length === 0 ? 1 : Math.max(...state.map((o) => o.id)) + 1;
      state.push({ ...action.payload, id });
    },

    deleteOrder: (state, action: PayloadAction<number>) => {
      return state.filter((o) => o.id !== action.payload);
    },
  },
});

export const { addOrder, deleteOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
