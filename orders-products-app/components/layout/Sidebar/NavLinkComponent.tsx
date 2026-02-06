"use client";

import Link from "next/link";
import { NavItem } from "@/types/sidebar";
import { useLocale } from "@/contexts/LocaleContext";

interface NavLinkProps {
  item: NavItem;
  isActive: boolean;
}

export function NavLink({ item, isActive }: NavLinkProps) {
  const { t } = useLocale();
  const activeStyles = isActive
    ? {
        backgroundColor: "#10b981",
        borderColor: "#10b981",
        boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)",
      }
    : {};

  return (
    <Link
      href={item.href}
      className={`nav-link d-flex align-items-center gap-3 text-decoration-none rounded px-4 py-3 ${
        isActive ? "text-white" : "text-body bg-hover-light"
      }`}
      style={activeStyles}
      aria-current={isActive ? "page" : undefined}
    >
      <div className="d-flex align-items-center justify-content-center sidebar-icon position-relative">
        {item.icon}
        {item.badge && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {item.badge > 9 ? "9+" : item.badge}
          </span>
        )}
      </div>
      <span className="flex-grow-1 sidebar-link-text">{t(item.labelKey)}</span>
    </Link>
  );
}
