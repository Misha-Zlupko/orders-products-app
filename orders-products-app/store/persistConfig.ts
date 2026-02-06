import storage from "redux-persist/lib/storage";
import { PERSIST_STORAGE_KEY } from "@/config/constants";

function createNoopStorage() {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: unknown) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
}

const persistStorage =
  typeof window !== "undefined" ? storage : createNoopStorage();

export const persistConfig: any = {
  key: PERSIST_STORAGE_KEY,
  version: 1,
  storage: persistStorage,
  whitelist: ["cart", "orders"],
  migrate: (state: any) => {
    const s = state as { cart?: unknown; orders?: unknown } | undefined;
    const cart = s?.cart;
    const cartNormalized =
      cart &&
      typeof cart === "object" &&
      "items" in cart &&
      Array.isArray((cart as { items: unknown[] }).items)
        ? cart
        : {
            items: Array.isArray(cart) ? cart : [],
            totalItems: 0,
            totalPrice: 0,
            lastUpdated: new Date().toISOString(),
          };
    const orders = s?.orders;
    const isEmpty = !orders || (Array.isArray(orders) && orders.length === 0);
    const nextState: any = {
      ...s,
      cart: cartNormalized,
      ...(isEmpty ? { orders: [] } : {}),
    };
    return Promise.resolve(nextState);
  },
};
