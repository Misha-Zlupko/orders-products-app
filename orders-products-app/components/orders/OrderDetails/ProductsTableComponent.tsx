"use client";

import type { OrderItem } from "@/types/order";
import { useLocale } from "@/contexts/LocaleContext";

interface ProductsTableProps {
  products: OrderItem[];
}

export default function ProductsTable({ products }: ProductsTableProps) {
  const { t, locale } = useLocale();
  const localeTag = locale === "uk" ? "uk-UA" : "en-GB";

  const getTypeLabel = (type: string) => t(`products.type.${type}`);

  const formatWarrantyDate = (dateString: string) => {
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

  return (
    <div className="p-4 h-100">
      <h5 className="h5 fw-bold mb-3">{t("orders.productsInOrder")}</h5>

      <div className="table-responsive rounded-3 border">
        <table className="table table-hover table-striped mb-0">
          <thead className="table-light">
            <tr>
              <th className="py-3 px-4 border-bottom-0">
                {t("orders.tableName")}
              </th>
              <th className="py-3 px-4 border-bottom-0">
                {t("orders.tableType")}
              </th>
              <th className="py-3 px-4 border-bottom-0">
                {t("orders.tableWarranty")}
              </th>
              <th className="py-3 px-4 border-bottom-0 text-end">
                {t("orders.tablePrice")}
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const warranty = product.warrantyDate
                ? formatWarrantyDate(product.warrantyDate)
                : null;
              const qty = product.quantity ?? 1;
              const lineTotal = product.price * qty;

              return (
                <tr key={`${product.id}-${product.name}`}>
                  <td className="py-3 px-4 align-middle">
                    {product.name}
                    {qty > 1 && (
                      <span className="text-muted ms-1">× {qty}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 align-middle">
                    <span className="badge bg-primary bg-opacity-50 rounded-pill px-3 py-1">
                      {getTypeLabel(product.type)}
                    </span>
                  </td>
                  <td className="py-3 px-4 align-middle">
                    {warranty ? (
                      <div className="d-flex flex-column">
                        <span className="fw-semibold">{warranty.short}</span>
                        <small className="text-muted">{warranty.long}</small>
                      </div>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4 align-middle text-end fw-bold text-success">
                    {lineTotal} {product.currency}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
