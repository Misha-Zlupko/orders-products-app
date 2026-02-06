"use client";

import { CartItem as CartItemType } from "@/types/cart";
import { formatDate } from "@/utils/dateFormatter";
import { useLocale } from "@/contexts/LocaleContext";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export default function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  const { t } = useLocale();
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= item.maxQuantity) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="cart-item card border border-gray-200">
      <div className="card-body overflow-auto">
        <div className="row align-items-center flex-nowrap">
          <div className="w-auto">
            <div className="d-flex">
              {item.image && (
                <div className="me-3">
                  <div
                    className="rounded bg-light border"
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: "cover",
                    }}
                  />
                </div>
              )}

              <div className="flex-grow-1">
                <h5 className="card-title mb-1">{item.title}</h5>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="badge bg-info text-dark">{item.type}</span>
                  {item.guarantee && (
                    <span className="badge bg-warning text-dark">
                      {t("cart.itemGuaranteeUntil", {
                        date: formatDate(item.guarantee.end, "short"),
                      })}
                    </span>
                  )}
                </div>
                <p className="text-muted small mb-0">
                  {item.description || t("cart.itemNoDescription")}
                </p>
              </div>
            </div>
          </div>

          <div className="w-auto">
            <div className="d-flex align-items-center">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => handleQuantityChange(item.quantity - 1)}
                disabled={item.quantity <= 1}
                aria-label={t("cart.itemDecreaseQty")}
              >
                -
              </button>

              <input
                type="number"
                min="1"
                max={item.maxQuantity}
                value={item.quantity}
                onChange={(e) => handleQuantityChange(Number(e.target.value))}
                className="form-control text-center mx-2"
                style={{ width: "60px" }}
                aria-label={t("cart.itemQuantityLabel")}
              />

              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => handleQuantityChange(item.quantity + 1)}
                disabled={item.quantity >= item.maxQuantity}
                aria-label={t("cart.itemIncreaseQty")}
              >
                +
              </button>
            </div>
            <div className="text-center mt-1">
              <small className="text-muted">
                {t("cart.itemMax")} {item.maxQuantity}
              </small>
            </div>
          </div>

          <div className="text-end w-auto">
            <div className="mb-2">
              <span className="h5 fw-bold text-success">
                {item.price * item.quantity} {item.currency}
              </span>
            </div>
            <div className="text-muted small">
              {item.price} {item.currency} × {item.quantity}{" "}
              {t("nav.cartBadge")}
            </div>
          </div>

          <div className="text-end w-auto ms-auto">
            <button
              onClick={() => onRemove(item.id)}
              className="btn btn-sm btn-outline-danger"
              aria-label={t("cart.itemRemove")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3h11V2h-11v1z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
