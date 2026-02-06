export interface OrderItem {
  id: number;
  name: string;
  type: string;
  warrantyDate?: string;
  price: number;
  currency: string;
   priceUSD?: number;
   priceUAH?: number;
  quantity?: number;
  orderId?: number;
}

export type Product = OrderItem;

export interface Order {
  id: number;
  title: string;
  titleKey?: string;
  titleParams?: Record<string, string>;
  date: string;
  description?: string;
  products: OrderItem[];
  total?: number;
  currency?: string;
  userId?: string | null;
}
