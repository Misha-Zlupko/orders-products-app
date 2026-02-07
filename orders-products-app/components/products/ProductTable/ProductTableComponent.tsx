"use client";

import { Product } from "@/types/product";
import { useState } from "react";
import AddToCartButton from "@/components/products/AddToCartButtonComponent";
import { useLocale } from "@/contexts/LocaleContext";
import styles from "./ProductTable.module.css";

type SortColumn = "title" | "type" | "guarantee" | "price";

function SortArrow({
  column,
  sortBy,
  sortOrder,
}: {
  column: SortColumn;
  sortBy: SortColumn;
  sortOrder: "asc" | "desc";
}) {
  if (sortBy !== column) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        fill="currentColor"
        className="bi bi-arrow-down-up ms-2 text-muted opacity-50"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4 4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"
        />
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill="currentColor"
      className="text-primary"
      style={{ minWidth: 20, minHeight: 20 }}
      viewBox="0 0 16 16"
    >
      {sortOrder === "asc" ? (
        <path
          fillRule="evenodd"
          d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4"
        />
      ) : (
        <path
          fillRule="evenodd"
          d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"
        />
      )}
    </svg>
  );
}

interface ProductTableProps {
  products: Product[];
}

export default function ProductTable({ products }: ProductTableProps) {
  const { t, locale } = useLocale();
  const localeTag = locale === "uk" ? "uk-UA" : "en-GB";
  const [sortBy, setSortBy] = useState<SortColumn>("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(localeTag, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getTypeLabel = (type: string) => t(`products.type.${type}`);

  const getPrice = (product: Product, currency: string) => {
    const priceObj = product.price.find((p) => p.symbol === currency);
    return priceObj ? priceObj.value : 0;
  };

  const handleSort = (column: SortColumn) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case "title":
        aValue = a.title;
        bValue = b.title;
        break;
      case "type":
        aValue = getTypeLabel(a.type);
        bValue = getTypeLabel(b.type);
        break;
      case "guarantee":
        aValue = new Date(a.guarantee.end).getTime();
        bValue = new Date(b.guarantee.end).getTime();
        break;
      case "price":
        aValue = getPrice(a, "USD");
        bValue = getPrice(b, "USD");
        break;
      default:
        aValue = a.title;
        bValue = b.title;
    }

    return sortOrder === "asc"
      ? aValue > bValue
        ? 1
        : -1
      : aValue < bValue
        ? 1
        : -1;
  });

  if (products.length === 0) {
    return (
      <div className={styles["product-table__empty"]}>
        <div className={styles["product-table__empty-icon"]}>
          <i className="bi bi-search" aria-hidden />
        </div>
        <h4 className={styles["product-table__empty-title"]}>
          {t("products.noProducts")}
        </h4>
        <p className={styles["product-table__empty-text"]}>
          {t("products.tryFilter")}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`${styles["product-table__wrapper"]} table-responsive rounded-3`}
    >
      <table className={`${styles["product-table__table"]} table-hover`}>
        <thead className={styles["product-table__thead"]}>
          <tr>
            <th
              className={styles["product-table__th"]}
              onClick={() => handleSort("title")}
              style={{ textAlign: "center" }}
            >
              <div className={styles["product-table__th-content"]}>
                <span className="text-nowrap text-secondary text-uppercase small fw-semibold">
                  {t("products.tableProductName")}
                </span>
                <span className={styles["product-table__th-sort-icon"]}>
                  <SortArrow
                    column="title"
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                  />
                </span>
              </div>
            </th>
            <th
              className={styles["product-table__th"]}
              onClick={() => handleSort("type")}
              style={{ textAlign: "center" }}
            >
              <div className={styles["product-table__th-content"]}>
                <span className="text-nowrap text-secondary text-uppercase small fw-semibold">
                  {t("products.tableType")}
                </span>
                <span className={styles["product-table__th-sort-icon"]}>
                  <SortArrow
                    column="type"
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                  />
                </span>
              </div>
            </th>
            <th
              className={styles["product-table__th"]}
              onClick={() => handleSort("guarantee")}
              style={{ textAlign: "center" }}
            >
              <div className={styles["product-table__th-content"]}>
                <span className="text-nowrap text-secondary text-uppercase small fw-semibold">
                  {t("products.tableWarranty")}
                </span>
                <span className={styles["product-table__th-sort-icon"]}>
                  <SortArrow
                    column="guarantee"
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                  />
                </span>
              </div>
            </th>
            <th
              className={styles["product-table__th"]}
              onClick={() => handleSort("price")}
              style={{ textAlign: "center" }}
            >
              <div className={styles["product-table__th-content"]}>
                <span className="text-nowrap text-secondary text-uppercase small fw-semibold">
                  {t("products.tablePrice")}
                </span>
                <span className={styles["product-table__th-sort-icon"]}>
                  <SortArrow
                    column="price"
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                  />
                </span>
              </div>
            </th>
            <th
              className={styles["product-table__th"]}
              style={{ textAlign: "center" }}
            >
              <div className={styles["product-table__th-content"]}>
                <span className="text-secondary text-uppercase small fw-semibold">
                  {t("products.tableOrderTitle")}
                </span>
              </div>
            </th>
            <th
              className={styles["product-table__th"]}
              style={{ textAlign: "center", width: "150px" }}
            >
              <div className={styles["product-table__th-content"]}>
                <span className="text-secondary text-uppercase small fw-semibold">
                  {t("products.tableCart")}
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className={styles["product-table__tbody"]}>
          {sortedProducts.map((product) => {
            const guaranteeEnd = new Date(product.guarantee.end);
            const today = new Date();
            const isGuaranteeActive = guaranteeEnd > today;
            const daysLeft = Math.ceil(
              (guaranteeEnd.getTime() - today.getTime()) /
                (1000 * 60 * 60 * 24),
            );

            const usdPrice = getPrice(product, "USD");
            const uahPrice = getPrice(product, "UAH");

            return (
              <tr key={product.id} className={styles["product-table__tr"]}>
                <td
                  className={`${styles["product-table__td"]} ${styles["product-table__td--product"]}`}
                  data-label={t("products.tableProductName")}
                >
                  <div className={styles["product-table__cell-product"]}>
                    <div className={styles["product-table__cell-product-icon"]}>
                      <i className="bi bi-cpu" aria-hidden />
                    </div>
                    <div className={styles["product-table__cell-product-body"]}>
                      <div
                        className={styles["product-table__cell-product-title"]}
                      >
                        {product.title}
                      </div>
                      <div
                        className={styles["product-table__cell-product-serial"]}
                      >
                        {t("products.serial")} {product.serialNumber}
                      </div>
                      <div>
                        {product.isNew === 1 ? (
                          <span
                            className={`${styles["product-table__cell-product-badge"]} ${styles["product-table__cell-product-badge--new"]}`}
                          >
                            {t("products.badgeNew")}
                          </span>
                        ) : (
                          <span
                            className={`${styles["product-table__cell-product-badge"]} ${styles["product-table__cell-product-badge--used"]}`}
                          >
                            {t("products.badgeUsed")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td
                  className={styles["product-table__td"]}
                  data-label={t("products.tableType")}
                >
                  <span className={styles["product-table__cell-type-badge"]}>
                    {getTypeLabel(product.type)}
                  </span>
                </td>
                <td
                  className={styles["product-table__td"]}
                  data-label={t("products.tableWarranty")}
                >
                  <div className={styles["product-table__cell-warranty"]}>
                    <div
                      className={styles["product-table__cell-warranty-label"]}
                    >
                      {t("products.warrantyEnd")}
                    </div>
                    <div
                      className={`${styles["product-table__cell-warranty-date"]} ${
                        isGuaranteeActive
                          ? styles["product-table__cell-warranty-date--active"]
                          : styles["product-table__cell-warranty-date--expired"]
                      }`}
                    >
                      {formatDate(product.guarantee.end)}
                    </div>
                    {isGuaranteeActive ? (
                      <div
                        className={`${styles["product-table__cell-warranty-status"]} ${styles["product-table__cell-warranty-status--active"]}`}
                      >
                        <i className="bi bi-shield-check me-1" aria-hidden />
                        {t("products.warrantyDaysLeft", { count: daysLeft })}
                      </div>
                    ) : (
                      <div
                        className={`${styles["product-table__cell-warranty-status"]} ${styles["product-table__cell-warranty-status--expired"]}`}
                      >
                        <i
                          className="bi bi-shield-exclamation me-1"
                          aria-hidden
                        />
                        {t("products.warrantyExpired")}
                      </div>
                    )}
                  </div>
                </td>
                <td
                  className={styles["product-table__td"]}
                  data-label={t("products.tablePrice")}
                >
                  <div className={styles["product-table__cell-price"]}>
                    <div className={styles["product-table__cell-price-line"]}>
                      {usdPrice.toLocaleString()} USD
                    </div>
                    <div className={styles["product-table__cell-price-line"]}>
                      {uahPrice.toLocaleString()} UAH
                    </div>
                  </div>
                </td>
                <td
                  className={styles["product-table__td"]}
                  data-label={t("products.tableOrderTitle")}
                >
                  <div className={styles["product-table__cell-order"]}>
                    <i
                      className={`bi bi-receipt ${styles["product-table__cell-order-icon"]}`}
                      aria-hidden
                    />
                    <div>
                      <div
                        className={styles["product-table__cell-order-title"]}
                      >
                        {product.orderTitle}
                      </div>
                      <div className={styles["product-table__cell-order-date"]}>
                        {formatDate(product.date)}
                      </div>
                    </div>
                  </div>
                </td>
                <td
                  className={`${styles["product-table__td"]} ${styles["product-table__td--cart"]}`}
                  data-label={t("products.tableCart")}
                  style={{ textAlign: "center" }}
                >
                  <div className={styles["product-table__cell-cart-wrap"]}>
                    <AddToCartButton
                      product={{
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        type: product.type,
                        stock: 100,
                        guarantee: product.guarantee,
                      }}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
