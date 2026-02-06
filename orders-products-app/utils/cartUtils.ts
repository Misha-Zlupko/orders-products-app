import type { CartItem, CartState } from "@/types/cart";

export function calculateCartTotals(
  items: CartItem[]
): Pick<CartState, "totalItems" | "totalPrice"> {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return { totalItems, totalPrice };
}
