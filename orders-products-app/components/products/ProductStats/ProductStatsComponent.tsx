"use client";

import { Product } from "@/types/product";
import { useLocale } from "@/contexts/LocaleContext";

interface ProductStatsProps {
  products: Product[];
}

export default function ProductStats({ products }: ProductStatsProps) {
  const { t } = useLocale();
  const totalProducts = products.length;
  const newProducts = products.filter((p) => p.isNew === 1).length;
  const usedProducts = products.filter((p) => p.isNew === 0).length;

  const today = new Date();
  const activeGuarantee = products.filter(
    (p) => new Date(p.guarantee.end) > today
  ).length;
  const expiredGuarantee = products.filter(
    (p) => new Date(p.guarantee.end) <= today
  ).length;

  const totalPriceUAH = products.reduce((sum, product) => {
    const uahPrice = product.price.find((p) => p.symbol === "UAH");
    return sum + (uahPrice?.value || 0);
  }, 0);

  const totalPriceUSD = products.reduce((sum, product) => {
    const usdPrice = product.price.find((p) => p.symbol === "USD");
    return sum + (usdPrice?.value || 0);
  }, 0);

  const stats = [
    {
      titleKey: "products.statsTotal",
      value: totalProducts,
      icon: "bi-box-seam",
      color: "#10b981",
    },
    {
      titleKey: "products.statsNew",
      value: newProducts,
      icon: "bi-star",
      color: "#3b82f6",
    },
    {
      titleKey: "products.statsUsed",
      value: usedProducts,
      icon: "bi-arrow-clockwise",
      color: "#f59e0b",
    },
    {
      titleKey: "products.statsWarrantyActive",
      value: activeGuarantee,
      icon: "bi-shield-check",
      color: "#10b981",
    },
    {
      titleKey: "products.statsWarrantyExpired",
      value: expiredGuarantee,
      icon: "bi-shield-exclamation",
      color: "#ef4444",
    },
  ];

  return (
    <div
      className="rounded-3 p-4"
      style={{
        background: "white",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      }}
    >
      <h5 className="fw-semibold mb-4">
        <i className="bi bi-graph-up me-2" style={{ color: "#10b981" }}></i>
        {t("products.statsTitle")}
      </h5>

      {stats.map((stat, index) => (
        <div
          key={index}
          className="d-flex flex-wrap justify-content-between align-items-center mb-3 pb-3"
          style={
            index !== stats.length - 1
              ? { borderBottom: "1px solid #f1f5f9" }
              : {}
          }
        >
          <div className="d-flex align-items-center">
            <div
              className="rounded-circle p-2 me-3"
              style={{
                background: `${stat.color}15`,
                color: stat.color,
                minWidth: "40px",
                minHeight: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i className={`bi ${stat.icon}`}></i>
            </div>
            <div>
              <div className="fw-semibold" style={{ color: "#1e293b" }}>
                {t(stat.titleKey)}
              </div>
            </div>
          </div>
          <div className="fw-bold fs-5" style={{ color: stat.color }}>
            {stat.value}
          </div>
        </div>
      ))}

      <div className="mt-4 pt-3 border-top">
        <h6 className="fw-semibold mb-3">{t("products.totalValue")}</h6>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-muted">USD:</span>
          <span className="fw-bold" style={{ color: "#10b981" }}>
            {totalPriceUSD.toLocaleString()} USD
          </span>
        </div>
        <div className="d-flex justify-content-between">
          <span className="text-muted">UAH:</span>
          <span className="fw-bold" style={{ color: "#10b981" }}>
            {totalPriceUAH.toLocaleString()} UAH
          </span>
        </div>
      </div>
    </div>
  );
}
