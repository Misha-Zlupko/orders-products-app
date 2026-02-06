"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummaryComponent";
import EmptyCart from "@/components/cart/EmptyCartComponent";
import AlertModal from "@/components/common/AlertModalComponent";
import { useAuth } from "@/contexts/AuthContext";
import { useLocale } from "@/contexts/LocaleContext";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { initialCartState } from "@/types/cart";
import {
  updateQuantity,
  removeItem,
  clearCart,
} from "@/store/slices/cartSlice";
import { addOrder } from "@/store/slices/ordersSlice";

export default function CartPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { t, locale } = useLocale();
  const dateLocale = locale === "uk" ? "uk-UA" : "en-GB";
  const cart = useAppSelector((state) => state.cart) ?? initialCartState;
  const dispatch = useAppDispatch();
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{
    title: string;
    body: string;
    primaryLabel?: string;
    onPrimary?: () => void;
  } | null>(null);

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCreateOrder = () => {
    if (!cart || cart.items.length === 0) return;
    if (!user) {
      setAlertConfig({
        title: t("cart.title"),
        body: t("cart.loginToCheckout"),
        primaryLabel: t("auth.login.submit"),
        onPrimary: () => {
          setAlertConfig(null);
          router.push("/auth/login");
        },
      });
      return;
    }

    setIsCreatingOrder(true);

    try {
      const orderDate = new Date().toISOString();
      const orderDateForTitle = new Date(orderDate).toLocaleDateString(
        dateLocale,
      );

      dispatch(
        addOrder({
          title: t("cart.orderTitleFromCart", {
            date: orderDateForTitle,
          }),
          titleKey: "cart.orderTitleFromCart",
          titleParams: { date: orderDateForTitle },
          date: orderDate,
          description: t("cart.orderDescFromCart"),
          products: cart.items.map((item) => ({
            id: item.id,
            name: item.title,
            type: item.type,
            price: item.price,
            currency: item.currency,
            priceUSD:
              item.priceUSD ??
              (item.currency === "USD" ? item.price : undefined),
            priceUAH:
              item.priceUAH ??
              (item.currency === "UAH" ? item.price : undefined),
            quantity: item.quantity,
          })),
          total: cart.totalPrice,
          currency: "USD",
          userId: user.id,
        }),
      );
      dispatch(clearCart());
      setAlertConfig({
        title: t("cart.title"),
        body: t("cart.orderCreated"),
      });
      router.push("/orders");
    } catch (error) {
      console.error("Order creation error", error);
      setAlertConfig({
        title: t("cart.title"),
        body: t("cart.orderError"),
      });
    } finally {
      setIsCreatingOrder(false);
    }
  };

  if (!cart || cart.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <>
      <div className="container-fluid py-4 px-3">
        <div className="row mb-4">
          <div className="col">
            <h1 className="h2 fw-bold text-gray-800">{t("cart.title")}</h1>
            <p className="text-muted">{t("cart.subtitle")}</p>
          </div>
          <div className="col-auto">
            <button
              onClick={handleClearCart}
              className="btn btn-outline-danger"
            >
              {t("cart.clear")}
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8">
            <div className="card mb-4 border-0 shadow-sm">
              <div className="card-header bg-white border-bottom">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    {t("cart.itemsInCart", { count: cart.totalItems })}
                  </h5>
                  <span className="text-muted small">
                    {t("cart.lastUpdate")}{" "}
                    {new Date(cart.lastUpdated).toLocaleTimeString(dateLocale, {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              <div className="card-body gap-2 d-flex flex-column">
                {cart.items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>

              <div className="card-footer bg-white border-top">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <small className="text-muted">{t("cart.inStock")}</small>
                  </div>
                  <div className="text-end">
                    <div className="h5 mb-0 text-success">
                      {cart.totalPrice} USD
                    </div>
                    <small className="text-muted">{t("cart.subtotal")}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <CartSummary
              items={cart.items}
              totalPrice={cart.totalPrice}
              totalItems={cart.totalItems}
              onCreateOrder={handleCreateOrder}
              isCreatingOrder={isCreatingOrder}
            />

            <div className="card mt-4 border-0 shadow-sm">
              <div className="card-header bg-light">
                <h6 className="mb-0">{t("cart.deliveryInfo")}</h6>
              </div>
              <div className="card-body">
                <div className="small">
                  <p className="mb-2">
                    <strong>{t("cart.deliveryTerms")}</strong>
                  </p>
                  <p className="mb-2">
                    <strong>{t("cart.deliveryCost")}</strong>
                  </p>
                  <p className="mb-0">
                    <strong>{t("cart.deliveryMethod")}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {alertConfig && (
        <AlertModal
          isOpen={!!alertConfig}
          title={alertConfig.title}
          body={alertConfig.body}
          onClose={() => setAlertConfig(null)}
          primaryActionLabel={alertConfig.primaryLabel}
          onPrimaryAction={alertConfig.onPrimary}
        />
      )}
    </>
  );
}
