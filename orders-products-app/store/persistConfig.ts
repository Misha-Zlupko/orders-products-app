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

// Loosely typed config to avoid over-constraining redux-persist generics
export const persistConfig: any = {
  key: PERSIST_STORAGE_KEY,
  version: 1,
  storage: persistStorage,
  whitelist: ["cart", "orders"],
  migrate: (state: any) => {
    const s = state as { cart?: unknown; orders?: unknown } | undefined;
    const orders = s?.orders;
    const isEmpty = !orders || (Array.isArray(orders) && orders.length === 0);
    if (isEmpty) {
      const nextState: any = {
        ...s,
        cart: s?.cart ?? [],
        orders: [],
      };
      return Promise.resolve(nextState);
    }
    return Promise.resolve(state ?? {});
  },
};
