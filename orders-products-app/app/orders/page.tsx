"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import OrdersList from "@/components/orders/OrdersList/OrdersListComponent";
import { useAuth } from "@/contexts/AuthContext";
import { useLocale } from "@/contexts/LocaleContext";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectOrdersByUserId } from "@/store";
import { deleteOrder as removeOrder } from "@/store/slices/ordersSlice";
import type { Order } from "@/types/order";
import styles from "./page.module.css";

const DeleteOrderModal = dynamic(
  () =>
    import("@/components/orders/DeleteOrderModal/DeleteOrderModalComponent"),
  {
    loading: () => null,
  }
);

export default function OrdersPage() {
  const { user } = useAuth();
  const { t } = useLocale();
  const orders = useAppSelector((state) =>
    selectOrdersByUserId(state, user?.id ?? null)
  );
  const dispatch = useAppDispatch();
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);

  const selectedOrder =
    orders.find((o) => o.id === selectedOrderId) ?? orders[0] ?? null;

  const handleOrderClick = (order: Order) => {
    setSelectedOrderId(order.id);
  };

  const handleDeleteOrder = (order: Order) => {
    setOrderToDelete(order);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (orderToDelete) {
      dispatch(removeOrder(orderToDelete.id));
      if (selectedOrderId === orderToDelete.id) {
        const rest = orders.filter((o) => o.id !== orderToDelete.id);
        setSelectedOrderId(rest[0]?.id ?? null);
      }
      setIsDeleteModalOpen(false);
      setOrderToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setOrderToDelete(null);
  };

  return (
    <div className="container-fluid p-4 p-md-5 h-100 d-flex flex-column">
      <h1 className="fs-2 fw-bold text-dark mb-4 pb-3 border-bottom border-success border-2">
        {t("orders.title")}
      </h1>

      {!user ? (
        <div className="alert alert-warning">
          <strong>{t("orders.loginRequired")}</strong>
          {t("orders.loginToSee")}{" "}
          <Link href="/auth/login" className="alert-link">
            {t("orders.loginLink")}
          </Link>
          {" · "}
          <Link href="/auth/register" className="alert-link">
            {t("orders.registerLink")}
          </Link>
        </div>
      ) : orders.length === 0 ? (
        <div className="alert alert-info">
          {t("orders.empty")}{" "}
          <Link href="/cart" className="alert-link">
            {t("orders.cartLink")}
          </Link>
          .
        </div>
      ) : (
        <div className={styles.ordersContainer}>
          <div className="flex-shrink-0 w-100 min-h-0 overflow-y-auto">
            <OrdersList
              orders={orders}
              selectedOrder={selectedOrder}
              onOrderSelect={handleOrderClick}
              onOrderDelete={handleDeleteOrder}
            />
          </div>
        </div>
      )}

      <DeleteOrderModal
        isOpen={isDeleteModalOpen}
        order={orderToDelete}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
