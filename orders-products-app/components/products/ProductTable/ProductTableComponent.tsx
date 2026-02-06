"use client";

import { Product } from "@/types/product";
import { useState } from "react";
import AddToCartButton from "@/components/products/AddToCartButtonComponent";
import { useLocale } from "@/contexts/LocaleContext";

interface ProductTableProps {
  products: Product[];
}

export default function ProductTable({ products }: ProductTableProps) {
  const { t, locale } = useLocale();
  const localeTag = locale === "uk" ? "uk-UA" : "en-GB";
  const [sortBy, setSortBy] = useState<
    "title" | "type" | "guarantee" | "price"
  >("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("uk-UA", {
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

  const handleSort = (column: "title" | "type" | "guarantee" | "price") => {
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

  const SortArrow = ({ column }: { column: typeof sortBy }) => {
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
        className={`${sortOrder === "asc" ? "text-primary" : "text-primary"}`}
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
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="text-muted mb-3">
          <i className="bi bi-search display-1"></i>
        </div>
        <h4>{t("products.noProducts")}</h4>
        <p className="text-muted">{t("products.tryFilter")}</p>
      </div>
    );
  }

  return (
    <div
      className="table-responsive rounded-3 shadow-sm"
      style={{ maxHeight: "min(70vh, 600px)", overflow: "auto" }}
    >
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th
              className="border-0 py-3 cursor-pointer hover-text-primary"
              onClick={() => handleSort("title")}
              style={{ textAlign: "center" }}
            >
              <div className="d-flex align-items-center justify-content-center">
                <span className="text-nowrap text-secondary text-uppercase small fw-semibold">
                  {t("products.tableProductName")}
                </span>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <SortArrow column="title" />
                </div>
              </div>
            </th>

            <th
              className="border-0 py-3 cursor-pointer hover-text-primary"
              onClick={() => handleSort("type")}
              style={{ textAlign: "center" }}
            >
              <div className="d-flex align-items-center justify-content-center">
                <span className="text-nowrap text-secondary text-uppercase small fw-semibold">
                  Тип продукту
                </span>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <SortArrow column="type" />
                </div>
              </div>
            </th>

            <th
              className="border-0 py-3 cursor-pointer hover-text-primary"
              onClick={() => handleSort("guarantee")}
              style={{ textAlign: "center" }}
            >
              <div className="d-flex align-items-center justify-content-center">
                <span className="text-nowrap text-secondary text-uppercase small fw-semibold">
                  {t("products.tableWarranty")}
                </span>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <SortArrow column="guarantee" />
                </div>
              </div>
            </th>

            <th
              className="border-0 py-3 cursor-pointer hover-text-primary"
              onClick={() => handleSort("price")}
              style={{ textAlign: "center" }}
            >
              <div className="d-flex align-items-center justify-content-center">
                <span className="text-nowrap text-secondary text-uppercase small fw-semibold">
                  {t("products.tablePrice")}
                </span>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <SortArrow column="price" />
                </div>
              </div>
            </th>

            <th className="border-0 py-3" style={{ textAlign: "center" }}>
              <div className="d-flex align-items-center justify-content-center">
                <span className="text-secondary text-uppercase small fw-semibold">
                  Назва приходу
                </span>
              </div>
            </th>

            <th
              className="border-0 py-3"
              style={{ textAlign: "center", width: "150px" }}
            >
              <div className="d-flex align-items-center justify-content-center">
                <span className="text-secondary text-uppercase small fw-semibold">
                  {t("products.tableCart")}
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product) => {
            const guaranteeEnd = new Date(product.guarantee.end);
            const today = new Date();
            const isGuaranteeActive = guaranteeEnd > today;
            const daysLeft = Math.ceil(
              (guaranteeEnd.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
            );

            const usdPrice = getPrice(product, "USD");
            const uahPrice = getPrice(product, "UAH");

            return (
              <tr key={product.id} className="border-bottom">
                <td className="py-3">
                  <div className="d-flex align-items-center">
                    <div
                      style={{
                        backgroundColor: "#10b981",
                        minWidth: "40px",
                        minHeight: "40px",
                      }}
                      className="d-flex align-items-center justify-content-center me-3 rounded text-white p-2"
                    >
                      <i className="bi bi-cpu fs-5"></i>
                    </div>
                    <div>
                      <div className="fw-semibold text-dark">
                        {product.title}
                      </div>
                      <div className="small text-muted">
                        Серійний: {product.serialNumber}
                      </div>
                      <div>
                        {product.isNew === 1 ? (
                          <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-1 mt-1">
                            Новий
                          </span>
                        ) : (
                          <span className="badge bg-warning bg-opacity-10 text-warning rounded-pill px-3 py-1 mt-1">
                            Б/В
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="py-3">
                  <span
                    className="badge bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill px-3 py-2"
                    style={{ backgroundColor: "rgb(16, 185, 129)" }}
                  >
                    {getTypeLabel(product.type)}
                  </span>
                </td>

                <td className="py-3">
                  <div className="d-flex flex-column">
                    <div className="small text-muted mb-1">
                      {t("products.warrantyEnd")}
                    </div>
                    <div
                      className={`fw-semibold ${
                        isGuaranteeActive ? "text-success" : "text-danger"
                      }`}
                    >
                      {formatDate(product.guarantee.end)}
                    </div>
                    {isGuaranteeActive ? (
                      <div className="d-inline-flex align-items-center mt-1 bg-success bg-opacity-10 text-success rounded-pill px-3 py-1">
                        <i className="bi bi-shield-check me-1"></i>
                        {t("products.warrantyDaysLeft", { count: daysLeft })}
                      </div>
                    ) : (
                      <div className="d-inline-flex align-items-center mt-1 bg-danger bg-opacity-10 text-danger rounded-pill px-3 py-1">
                        <i className="bi bi-shield-exclamation me-1"></i>
                        {t("products.warrantyExpired")}
                      </div>
                    )}
                  </div>
                </td>

                <td className="py-3">
                  <div className="d-flex flex-column">
                    <div className="fw-semibold text-nowrap text-success">
                      {usdPrice.toLocaleString()} USD
                    </div>
                    <div className="fw-semibold text-nowrap text-success">
                      {uahPrice.toLocaleString()} UAH
                    </div>
                  </div>
                </td>

                <td className="py-3">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-receipt me-3 text-primary fs-5"></i>
                    <div>
                      <div className="fw-semibold text-dark">
                        {product.orderTitle}
                      </div>
                      <div className="small text-muted">
                        {formatDate(product.date)}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3" style={{ textAlign: "center" }}>
                  <AddToCartButton
                    product={{
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      type: product.type,
                      stock: 100,
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
