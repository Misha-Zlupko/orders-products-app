"use client";

import { NavItem } from "@/types/sidebar";
import { NavLink } from "@/components/layout/Sidebar/NavLinkComponent";
import { useLocale } from "@/contexts/LocaleContext";

interface NavListProps {
  items: NavItem[];
  pathname: string;
}

export function NavList({ items, pathname }: NavListProps) {
  const { t } = useLocale();
  return (
    <section>
      <h2 className="text-uppercase text-muted small fw-semibold mb-3 ps-1">
        {t("nav.navigation")}
      </h2>
      <ul className="nav flex-column gap-2">
        {items.map((item) => (
          <li key={item.href} className="nav-item">
            <NavLink item={item} isActive={pathname === item.href} />
          </li>
        ))}
      </ul>
    </section>
  );
}
