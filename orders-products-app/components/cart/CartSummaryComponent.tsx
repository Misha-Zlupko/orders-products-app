"use client";

import { CartItem } from "@/types/cart";
import Link from "next/link";
import { useLocale } from "@/contexts/LocaleContext";

interface CartSummaryProps {
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
  onCreateOrder: () => void;
  isCreatingOrder?: boolean;
}

export default function CartSummary({
  items,
  totalPrice,
  totalItems,
  onCreateOrder,
  isCreatingOrder = false,
}: CartSummaryProps) {
  const { t } = useLocale();
  const hasItems = items.length > 0;

  return (
    <div className="cart-summary card border-0 shadow-lg animate__animated animate__fadeInUp">
      <div
        className="card-header text-white"
        style={{ backgroundColor: "rgb(16, 185, 129)" }}
      >
        <h4 className="mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="me-2"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
          {t("cart.summaryTotal")}
        </h4>
      </div>

      <div className="card-body">
        <div className="mb-4">
          <div className="d-flex justify-content-between mb-2">
            <span>{t("cart.summaryItems", { count: totalItems })}</span>
            <span className="fw-medium">{totalPrice} USD</span>
          </div>

          <div className="d-flex justify-content-between mb-2">
            <span>{t("cart.summaryDelivery")}</span>
            <span className="text-success fw-medium">
              {t("cart.summaryFree")}
            </span>
          </div>

          <hr />

          <div className="d-flex justify-content-between mb-3">
            <span className="h5">{t("cart.summaryTotalSum")}</span>
            <span className="h3 fw-bold text-success">{totalPrice} USD</span>
          </div>

          <div className="small text-muted text-center mb-3">
            {t("cart.summaryPricesNote")}
          </div>
        </div>

        <button
          onClick={onCreateOrder}
          disabled={!hasItems || isCreatingOrder}
          className={`btn btn-lg w-100 mb-3 ${
            hasItems ? "btn-success" : "btn-secondary"
          }`}
        >
          {isCreatingOrder ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              {t("cart.summaryCreating")}
            </>
          ) : hasItems ? (
            t("cart.summaryCreateOrder")
          ) : (
            t("cart.summaryEmpty")
          )}
        </button>

        <div className="border-top pt-3">
          <div className="d-flex align-items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="text-success me-2"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
            </svg>
            <span className="small">{t("cart.summaryWarranty")}</span>
          </div>

          <div className="d-flex align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="text-success me-2"
              viewBox="0 0 16 16"
            >
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z" />
            </svg>
            <span className="small">{t("cart.summarySupport")}</span>
          </div>
        </div>
      </div>

      <div className="card-footer bg-light">
        <Link href="/products" className="btn btn-outline-success w-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="me-2"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"
            />
            <path
              fillRule="evenodd"
              d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"
            />
          </svg>
          {t("cart.continueShopping")}
        </Link>
      </div>
    </div>
  );
}
