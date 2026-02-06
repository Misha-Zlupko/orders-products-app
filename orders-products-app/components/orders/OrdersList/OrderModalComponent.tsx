"use client";

import { Order, OrderItem } from "@/types/order";
import { useLocale } from "@/contexts/LocaleContext";

interface OrderModalProps {
  order: Order;
  onDelete?: (order: Order) => void;
}

export default function OrderModal({ order, onDelete }: OrderModalProps) {
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

  const formatWarrantyDate = (dateString?: string) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString(localeTag, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
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

  const getTypeLabel = (type: string) => t(`products.type.${type}`);

  const dates = formatOrderDate(order.date);
  const totals = calculateTotal(order.products);

  const handleDeleteClick = () => {
    onDelete?.(order);
  };

  return (
    <div
      className="modal fade"
      id={`orderModal${order.id}`}
      tabIndex={-1}
      aria-labelledby={`orderModalLabel${order.id}`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`orderModalLabel${order.id}`}>
              {t("orders.detailsTitle")}: {getLocalizedTitle()}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label={t("common.close")}
            ></button>
          </div>
          <div className="modal-body">
            <div className="card border-0">
              <div className="card-body">
                <div className="mb-3">
                  <small className="text-muted d-block">
                    {t("orders.createdDate")}
                  </small>
                  <div className="d-flex flex-column">
                    <span className="fw-semibold">{dates.short}</span>
                    <small className="text-muted">{dates.long}</small>
                  </div>
                </div>

                {order.description && (
                  <p className="card-text mb-4">{order.description}</p>
                )}

                <h6 className="mb-3">{t("orders.productsInOrder")}</h6>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>{t("orders.tableName")}</th>
                        <th>{t("orders.tableType")}</th>
                        <th>{t("orders.tableWarranty")}</th>
                        <th>{t("orders.tablePrice")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.products.map((product) => (
                        <tr key={product.id}>
                          <td>{product.name}</td>
                          <td>
                            <span className="badge bg-secondary">
                              {getTypeLabel(product.type)}
                            </span>
                          </td>
                          <td>{formatWarrantyDate(product.warrantyDate)}</td>
                          <td>
                            <span className="fw-semibold">
                              {product.price} {product.currency}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 pt-3 border-top">
                  <div className="row">
                    <div className="col-6">
                      <h6>{t("orders.detailsTitle")}</h6>
                      <p className="mb-1">
                        <small className="text-muted">
                          {t("orders.productsCount")}
                        </small>{" "}
                        {order.products.length}
                      </p>
                      <p className="mb-0">
                        <small className="text-muted">
                          {t("orders.createdDate")}
                        </small>{" "}
                        {dates.short}
                      </p>
                    </div>
                    <div className="col-6 text-end">
                      <h5>{t("orders.totalSum")}</h5>
                      {totals.totalUSD > 0 && (
                        <div
                          className="fw-bold fs-4"
                          style={{ color: "#10b981" }}
                        >
                          {totals.totalUSD.toFixed(2)} USD
                        </div>
                      )}
                      {totals.totalUAH > 0 && (
                        <div
                          className="fw-bold fs-4"
                          style={{ color: "#10b981" }}
                        >
                          {totals.totalUAH.toFixed(2)} UAH
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              {t("common.close")}
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDeleteClick}
              data-bs-dismiss="modal"
              aria-label={t("orders.deleteOrder")}
            >
              {t("orders.deleteOrder")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
