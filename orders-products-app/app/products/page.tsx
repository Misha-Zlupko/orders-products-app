"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import ProductFilters from "@/components/products/ProductFilters/ProductFiltersComponent";
import SectionLoader from "@/components/common/SectionLoaderComponent";
import { Product } from "@/types/product";
import { db } from "@/data/databaseProducts";
import { useLocale } from "@/contexts/LocaleContext";

const ProductTable = dynamic(
  () => import("@/components/products/ProductTable/ProductTableComponent"),
  {
    loading: () => <SectionLoader labelKey="products.tableLoading" />,
  }
);

const ProductStats = dynamic(
  () => import("@/components/products/ProductStats/ProductStatsComponent"),
  {
    loading: () => <SectionLoader labelKey="products.statsLoading" />,
  }
);

export default function ProductsPage() {
  const { t } = useLocale();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>("all");

  useEffect(() => {
    let cancelled = false;
    db.products.toArray().then((list) => {
      if (!cancelled) {
        setAllProducts(list);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredProducts = useMemo(
    () =>
      filterType === "all"
        ? allProducts
        : allProducts.filter((product) => product.type === filterType),
    [filterType, allProducts]
  );

  const handleFilterChange = (type: string) => setFilterType(type);

  const stats = {
    totalProducts: allProducts.length,
    filteredProducts: filteredProducts.length,
    filterType,
  };

  if (loading) {
    return (
      <div className="container-fluid px-4 py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">{t("products.loading")}</span>
        </div>
        <p className="mt-2 text-muted">{t("products.loadingProducts")}</p>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4 py-5">
      <div className="mb-5 p-4 bg-white rounded-3 shadow-sm animate__animated animate__fadeInDown">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h1 className="display-5 fw-bold text-dark mb-2">
              <i className="bi bi-box-seam me-3 text-primary"></i>
              {t("products.title")}
            </h1>
            <p className="lead text-muted mb-0">
              {t("products.lead", { count: stats.totalProducts })}
            </p>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-3 animate__animated animate__fadeInUp">
          <div className="sticky-top" style={{ top: "2rem" }}>
            <ProductFilters
              onFilterChange={handleFilterChange}
              selectedType={filterType}
              products={allProducts}
            />
            <div className="mt-4">
              <ProductStats products={filteredProducts} />
            </div>
          </div>
        </div>

        <div className="col-lg-9 animate__animated animate__fadeInUp animate__delay-1s">
          <div className="mb-4 rounded-3 overflow-hidden bg-white shadow-sm">
            <div
              className="p-4 text-white"
              style={{ backgroundColor: "#10b981" }}
            >
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h2 className="h4 mb-0">
                    <i className="bi bi-filter-circle me-2"></i>
                    {t("products.listTitle")}
                  </h2>
                </div>
                <div className="col-md-6 text-end">
                  <div className="d-flex align-items-center justify-content-end gap-3">
                    <div>
                      <span className="opacity-75">
                        {t("products.filtered")}
                      </span>
                      <span className="fw-bold ms-2 fs-5">
                        {stats.filteredProducts}
                      </span>
                    </div>
                    {filterType !== "all" && (
                      <span className="badge bg-white text-primary rounded-pill px-3 py-2">
                        <i className="bi bi-tag me-1"></i>
                        {filterType}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white">
              <ProductTable products={filteredProducts} />
            </div>
          </div>

          <InfoFooter />
        </div>
      </div>
    </div>
  );
}

function InfoFooter() {
  const { t } = useLocale();
  const items = [
    {
      icon: "bi-info-circle",
      title: t("products.helpTitle"),
      text: t("products.helpText"),
    },
    {
      icon: "bi-shield-check",
      title: t("products.warrantyTitle"),
      text: t("products.warrantyText"),
    },
    {
      icon: "bi-cash-coin",
      title: t("products.pricesTitle"),
      text: t("products.pricesText"),
    },
  ];

  return (
    <div className="rounded-3 p-4 bg-white shadow-sm">
      <div className="row">
        {items.map((item) => (
          <div key={item.title} className="col-md-4">
            <div className="d-flex align-items-center">
              <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                <i className={`${item.icon} fs-4 text-primary`}></i>
              </div>
              <div>
                <h6 className="fw-semibold mb-1">{item.title}</h6>
                <p className="text-muted mb-0 small">{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
