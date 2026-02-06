"use client";

import Link from "next/link";
import TopMenuComponent from "./TopMenuComponent";
import LanguageSwitcherComponent from "./LanguageSwitcherComponent";
import { useLocale } from "@/contexts/LocaleContext";

export default function HeaderComponent() {
  const { t } = useLocale();
  return (
    <header
      className="navbar navbar-expand-lg border-bottom py-3"
      style={{
        background: "#ffffff",
        borderColor: "#e5e7eb",
        boxShadow:
          "0 2px 10px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)",
        minHeight: "80px",
      }}
    >
      <div className="container-fluid">
        <Link href="/" className="navbar-brand m-0 p-0">
          <div>
            <h1
              className="m-0 fw-bold"
              style={{
                fontSize: "24px",
                color: "#111827",
                lineHeight: "1.2",
              }}
            >
              {t("header.title")}
            </h1>
            <div
              className="mt-1"
              style={{
                fontSize: "14px",
                color: "#6b7280",
                fontWeight: "500",
              }}
            >
              {t("header.subtitle")}
            </div>
          </div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label={t("header.toggleNav")}
          style={{
            border: "1px solid #d1d5db",
            padding: "6px 10px",
            borderRadius: "6px",
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="ms-lg-auto mt-3 mt-lg-0 d-flex flex-column flex-lg-row align-items-center gap-3">
            <LanguageSwitcherComponent />
            <TopMenuComponent />
          </div>
        </div>
      </div>
    </header>
  );
}
