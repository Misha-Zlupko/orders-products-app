"use client";

import { Order, OrderItem } from "@/types/order";
import { useLocale } from "@/contexts/LocaleContext";

interface OrderInfoSectionProps {
  order: Order;
}

export default function OrderInfoSection({ order }: OrderInfoSectionProps) {
  const { t, locale } = useLocale();
  const localeTag = locale === "uk" ? "uk-UA" : "en-GB";

  const getLocalizedTitle = () => {
    if (order.titleKey) {
      return t(order.titleKey, order.titleParams);
    }
    return order.title;
  };

  const formatOrderDate = (dateString: string) => {
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
      { usd: 0, uah: 0 }
    );

    return { totalUSD: totals.usd, totalUAH: totals.uah };
  };

  const dates = formatOrderDate(order.date);
  const totals = calculateTotal(order.products);

  return (
    <div className="p-4 border-bottom">
      <div className="mb-4">
        <h4 className="h5 fw-bold mb-2">{getLocalizedTitle()}</h4>
        {order.description && (
          <p className="text-muted mb-0">{order.description}</p>
        )}
      </div>

      <div className="row">
        <div className="col-md-4 mb-3 mb-md-0">
          <div className="d-flex flex-column">
            <small className="text-muted mb-1">
              {t("orders.productsCount")}
            </small>
            <span className="fw-semibold fs-5">{order.products.length}</span>
          </div>
        </div>

        <div className="col-md-4 mb-3 mb-md-0">
          <div className="d-flex flex-column">
            <small className="text-muted mb-1">{t("orders.createdDate")}</small>
            <span className="fw-semibold">{dates.short}</span>
            <small className="text-muted">{dates.long}</small>
          </div>
        </div>

        <div className="col-md-4">
          <div className="d-flex flex-column">
            <small className="text-muted mb-1">{t("orders.totalSum")}</small>
            <>
              {totals.totalUSD > 0 && (
                <span className="fw-bold text-success fs-5">
                  {totals.totalUSD.toFixed(2)} USD
                </span>
              )}
              {totals.totalUAH > 0 && (
                <span className="fw-bold text-success fs-5">
                  {totals.totalUAH.toFixed(2)} UAH
                </span>
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
