"use client";

import { Order, OrderItem } from "@/types/order";
import OrderModal from "./OrderModalComponent";
import { useLocale } from "@/contexts/LocaleContext";

interface OrderListItemProps {
  order: Order;
  isSelected: boolean;
  onClick?: (order: Order) => void;
  onDelete?: (order: Order) => void;
}

export default function OrderListItem({
  order,
  isSelected,
  onClick,
  onDelete,
}: OrderListItemProps) {
  const { t, locale } = useLocale();
  const localeTag = locale === "uk" ? "uk-UA" : "en-GB";

  const getLocalizedTitle = () => {
    if (order.titleKey) {
      return t(order.titleKey, order.titleParams);
    }
    return order.title;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      short: date.toLocaleDateString(localeTag, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      long: date.toLocaleDateString(localeTag, {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };
  };

  const calculateTotal = (products: OrderItem[]) => {
    const qty = (p: OrderItem) => p.quantity ?? 1;

    const totals = products.reduce(
      (acc: { usd: number; uah: number }, p: OrderItem) => {
        const amountUSD =
          (p.priceUSD ?? (p.currency === "USD" ? p.price : 0)) * qty(p);
        const amountUAH =
          (p.priceUAH ?? (p.currency === "UAH" ? p.price : 0)) * qty(p);
        acc.usd += amountUSD;
        acc.uah += amountUAH;
        return acc;
      },
      { usd: 0, uah: 0 },
    );

    return { totalUSD: totals.usd, totalUAH: totals.uah };
  };

  const formattedDate = formatDate(order.date);
  const totals = calculateTotal(order.products);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(order);
  };

  const handleItemClick = () => {
    onClick?.(order);
  };

  return (
    <>
      <div className="position-relative mb-2">
        <div
          className={`card d-flex flex-column cursor-pointer ${
            isSelected ? "border-success bg-success bg-opacity-10 border-2" : ""
          }`}
          onClick={handleItemClick}
          data-bs-toggle="modal"
          data-bs-target={`#orderModal${order.id}`}
        >
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <h5 className="card-title mb-0" style={{ width: "85%" }}>
                {getLocalizedTitle()}
              </h5>
            </div>

            <div className="row">
              <div className="col-4">
                <small className="text-muted d-block">
                  {t("orders.listProducts")}
                </small>
                <span className="fw-semibold">{order.products.length}</span>
              </div>
              <div className="col-4">
                <small className="text-muted d-block">
                  {t("orders.listDate")}
                </small>
                <div className="d-flex flex-column">
                  <span className="fw-semibold">{formattedDate.short}</span>
                  <small className="text-muted">{formattedDate.long}</small>
                </div>
              </div>
              <div className="col-4">
                <small className="text-muted d-block">
                  {t("orders.listSum")}
                </small>
                <div>
                  {totals.totalUSD > 0 && (
                    <div className="text-success fw-semibold">
                      {totals.totalUSD.toFixed(2)} USD
                    </div>
                  )}
                  {totals.totalUAH > 0 && (
                    <div className="text-success fw-semibold">
                      {totals.totalUAH.toFixed(2)} UAH
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          className="btn btn-sm btn-outline-danger position-absolute"
          style={{ top: "8px", right: "8px" }}
          onClick={handleDeleteClick}
          aria-label={t("orders.listDelete")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
          </svg>
        </button>
      </div>

      <OrderModal order={order} onDelete={onDelete} />
    </>
  );
}
