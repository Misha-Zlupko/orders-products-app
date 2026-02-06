"use client";

import { Product } from "@/types/product";
import { useState, useRef, useEffect } from "react";
import { useLocale } from "@/contexts/LocaleContext";

interface ProductFiltersProps {
  onFilterChange: (type: string) => void;
  selectedType: string;
  products: Product[];
}

export default function ProductFilters({
  onFilterChange,
  selectedType,
  products,
}: ProductFiltersProps) {
  const { t } = useLocale();
  const productTypes = Array.from(new Set(products.map((p) => p.type)));
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (type: string) => {
    onFilterChange(type);
    setIsOpen(false);
  };

  const getTypeLabel = (type: string) => t(`products.type.${type}`);

  const getDisplayName = () =>
    selectedType === "all" ? t("products.allTypes") : getTypeLabel(selectedType);

  const showQuickFilters = productTypes.slice(0, 4);

  return (
    <div className="rounded-3 overflow-hidden shadow-sm">
      <div className="p-4 text-white" style={{ backgroundColor: "#10b981" }}>
        <h5 className="mb-0">
          <i className="bi bi-funnel me-2"></i>
          {t("products.filterByType")}
        </h5>
      </div>

      <div className="p-4 bg-white">
        <div className="mb-4" ref={dropdownRef}>
          <label className="form-label fw-semibold mb-3">
            {t("products.selectType")}
          </label>

          <div className="dropdown">
            <button
              className="btn btn-outline-primary dropdown-toggle w-100 d-flex justify-content-between align-items-center"
              onClick={() => setIsOpen(!isOpen)}
              style={{
                borderRadius: "10px",
                padding: "0.75rem 1rem",
              }}
            >
              <span>{getDisplayName()}</span>
              <i className={`bi bi-chevron-${isOpen ? "up" : "down"}`}></i>
            </button>

            {isOpen && (
              <div
                className="dropdown-menu show w-100 border-0 shadow rounded position-relative overflow-auto"
                style={{ maxHeight: "200px" }}
              >
                <button
                  className={`dropdown-item d-flex justify-content-between align-items-center ${
                    selectedType === "all" && "active bg-primary"
                  }`}
                  onClick={() => handleSelect("all")}
                >
                  <span>{t("products.allTypes")}</span>
                  {selectedType === "all" && (
                    <i className="bi bi-check text-white"></i>
                  )}
                </button>

                <div className="dropdown-divider my-2"></div>

                {productTypes.map((type) => (
                  <button
                    key={type}
                    className={`dropdown-item d-flex justify-content-between align-items-center ${
                      selectedType === type && "active bg-primary"
                    }`}
                    onClick={() => handleSelect(type)}
                  >
                    <span>{getTypeLabel(type)}</span>
                    {selectedType === type && (
                      <i className="bi bi-check text-white"></i>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold mb-3">
            {t("products.popularTypes")}
          </label>
          <div className="d-flex flex-wrap gap-2">
            <button
              type="button"
              className={`btn ${
                selectedType === "all" ? "btn-primary" : "btn-outline-primary"
              } btn-sm rounded-pill`}
              onClick={() => onFilterChange("all")}
            >
              {t("products.all")}
            </button>
            {showQuickFilters.map((type) => (
              <button
                key={type}
                type="button"
                className={`btn ${
                  selectedType === type ? "btn-primary" : "btn-outline-primary"
                } btn-sm rounded-pill`}
                onClick={() => onFilterChange(type)}
              >
                {getTypeLabel(type)}
              </button>
            ))}
            {productTypes.length > 4 && (
              <button
                type="button"
                className="btn btn-link btn-sm text-decoration-none text-primary"
                onClick={() => setIsOpen(true)}
              >
                +{productTypes.length - 4} {t("products.more")}
              </button>
            )}
          </div>
        </div>

        {selectedType !== "all" && (
          <div className="alert alert-primary d-flex align-items-center mb-4">
            <i className="bi bi-info-circle me-2"></i>
            <div>
              {t("products.selectedType")}{" "}
              <strong>{getTypeLabel(selectedType)}</strong>
              <br />
              <small>
                {t("products.foundCount")}{" "}
                {products.filter((p) => p.type === selectedType).length}
              </small>
            </div>
          </div>
        )}

        <button
          type="button"
          className="btn btn-outline-secondary w-100"
          onClick={() => onFilterChange("all")}
          disabled={selectedType === "all"}
        >
          <i className="bi bi-x-circle me-2"></i>
          {t("products.resetFilter")}
        </button>
      </div>
    </div>
  );
}
