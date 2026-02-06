export interface Product {
  id: number;
  serialNumber: string;
  isNew: number;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee: {
    start: string;
    end: string;
  };
  price: Array<{
    value: number;
    symbol: string;
    isDefault: number;
  }>;
  order: number;
  date: string;
  orderTitle?: string;
}
