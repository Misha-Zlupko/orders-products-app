"use client";

import { Order } from "@/types/order";
import OrderListItem from "./OrderListItemComponent";

interface OrdersListProps {
  orders: Order[];
  selectedOrder: Order | null;
  onOrderSelect: (order: Order) => void;
  onOrderDelete: (order: Order) => void;
}

export default function OrdersList({
  orders,
  selectedOrder,
  onOrderSelect,
  onOrderDelete,
}: OrdersListProps) {
  return (
    <div className="d-flex flex-column gap-2">
      {orders.map((order) => (
        <OrderListItem
          key={order.id}
          order={order}
          isSelected={selectedOrder?.id === order.id}
          onClick={onOrderSelect}
          onDelete={onOrderDelete}
        />
      ))}
    </div>
  );
}
