import { describe, it, expect } from "vitest";
import ordersReducer, {
  addOrder,
  deleteOrder,
} from "@/store/slices/ordersSlice";
import type { Order } from "@/types/order";

const createOrderPayload = (
  overrides: Partial<Omit<Order, "id">> = {}
): Omit<Order, "id"> => ({
  title: "Test Order",
  date: "2024-01-15",
  products: [],
  ...overrides,
});

describe("ordersSlice", () => {
  const getInitialState = () =>
    ordersReducer(undefined, { type: "unknown" } as never);

  describe("addOrder", () => {
    it("adds order with generated id", () => {
      const state = getInitialState();
      const maxId =
        state.length === 0 ? 0 : Math.max(...state.map((o) => o.id));
      const nextState = ordersReducer(state, addOrder(createOrderPayload()));
      expect(nextState.length).toBe(state.length + 1);
      const added = nextState.find((o) => o.title === "Test Order");
      expect(added).toBeDefined();
      expect(added!.id).toBe(maxId + 1);
    });

    it("includes payload fields and userId", () => {
      const state = getInitialState();
      const payload = createOrderPayload({
        title: "User Order",
        userId: "user-123",
        total: 500,
      });
      const nextState = ordersReducer(state, addOrder(payload));
      const added = nextState.find((o) => o.title === "User Order");
      expect(added).toMatchObject({
        title: "User Order",
        userId: "user-123",
        total: 500,
      });
    });
  });

  describe("deleteOrder", () => {
    it("removes order by id", () => {
      let state = getInitialState();
      state = ordersReducer(
        state,
        addOrder(createOrderPayload({ title: "A" }))
      );
      state = ordersReducer(
        state,
        addOrder(createOrderPayload({ title: "B" }))
      );
      const idToRemove = state[1]!.id;
      const nextState = ordersReducer(state, deleteOrder(idToRemove));
      expect(nextState).toHaveLength(1);
      expect(nextState.some((o) => o.id === idToRemove)).toBe(false);
    });

    it("keeps all orders when id not found (filter returns new array)", () => {
      const state = getInitialState();
      const nextState = ordersReducer(state, deleteOrder(999999));
      expect(nextState.length).toBe(state.length);
      expect(nextState).toStrictEqual(state);
    });
  });
});
