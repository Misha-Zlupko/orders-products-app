"use client";

import { Order } from "@/types/order";
import OrderDetailsHeader from "./OrderDetailsHeaderComponent";
import OrderInfoSection from "./OrderInfoSectionComponent";
import ProductsTable from "./ProductsTableComponent";
import OrderDetailsFooter from "./OrderDetailsFooterComponent";
import styles from "./OrderDetails.module.css";

interface OrderDetailsProps {
  order: Order;
  onClose: () => void;
  onDelete: () => void;
}

export default function OrderDetails({
  order,
  onClose,
  onDelete,
}: OrderDetailsProps) {
  return (
    <div className={`card d-flex flex-column ${styles.responsive_overflow}`}>
      <OrderDetailsHeader onClose={onClose} />
      <div className="card-body p-0 d-flex flex-column">
        <OrderInfoSection order={order} />
        <div className="flex-grow-1 overflow-auto">
          <ProductsTable products={order.products} />
        </div>
      </div>
      <OrderDetailsFooter onDelete={onDelete} />
    </div>
  );
}
