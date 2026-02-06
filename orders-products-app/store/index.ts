import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import cartReducer from "./slices/cartSlice";
import ordersReducer from "./slices/ordersSlice";
import { persistConfig } from "./persistConfig";

const rootReducer = combineReducers({
  cart: cartReducer,
  orders: ordersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {
  selectOrders,
  selectOrdersByUserId,
  selectCart,
  selectCartItems,
  selectCartTotalItems,
  selectCartTotalPrice,
} from "./selectors";
