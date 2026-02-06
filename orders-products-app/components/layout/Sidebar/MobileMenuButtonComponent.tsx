"use client";

import { MenuIcon } from "./SidebarIconsComponent";
import { useLocale } from "@/contexts/LocaleContext";

export function MobileMenuButton() {
  const { t } = useLocale();
  return (
    <button
      className="navbar-toggler mt-3 ms-3 d-md-none btn rounded-circle p-3 shadow border-0"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#sidebarOffcanvas"
      aria-label={t("header.toggleNav")}
      style={{
        width: "56px",
        height: "56px",
        backgroundColor: "#10b981",
      }}
    >
      <MenuIcon />
    </button>
  );
}
