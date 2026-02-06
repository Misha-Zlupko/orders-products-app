"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "@/contexts/LocaleContext";
import type { Locale } from "@/config/constants";

const LOCALE_LABELS: Record<Locale, string> = {
  uk: "UA",
  en: "EN",
};

export default function LanguageSwitcherComponent() {
  const { locale, setLocale, t } = useLocale();

  const handleSelect = (newLocale: Locale) => {
    setLocale(newLocale);
  };

  return (
    <div className="dropdown">
      <button
        type="button"
        className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center gap-2"
        id="dropdownMenuButton2"
        aria-haspopup="listbox"
        aria-label={t("header.language")}
        style={{
          borderRadius: "8px",
          padding: "0.5rem 0.75rem",
          borderColor: "#d1d5db",
        }}
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span className="d-none d-sm-inline" style={{ fontSize: "0.875rem" }}>
          {t(`locale.${locale}`)}
        </span>
        <span className="d-inline d-sm-none">{LOCALE_LABELS[locale]}</span>
      </button>
      <ul
        className="dropdown-menu dropdown-menu-end shadow border-0"
        role="listbox"
        style={{ minWidth: "140px", borderRadius: "8px" }}
        id="dropdownMenuButton2"
      >
        {(["uk", "en"] as const).map((loc) => (
          <li key={loc}>
            <button
              type="button"
              role="option"
              aria-selected={locale === loc}
              className={`dropdown-item d-flex align-items-center gap-2 ${
                locale === loc ? "active" : ""
              }`}
              onClick={() => handleSelect(loc)}
            >
              <span>{t(`locale.${loc}`)}</span>
              {locale === loc && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="ms-auto"
                >
                  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                </svg>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
