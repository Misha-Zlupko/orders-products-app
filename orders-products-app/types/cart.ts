export interface CartItem {
  id: number;
  title: string;
  price: number;
  currency: "USD" | "UAH";
  priceUSD?: number;
  priceUAH?: number;
  type: string;
  quantity: number;
  maxQuantity: number;
  image?: string;
  description?: string;
  guarantee?: {
    start: string;
    end: string;
  };
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  lastUpdated: string;
}

export const initialCartState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  lastUpdated: new Date().toISOString(),
};
