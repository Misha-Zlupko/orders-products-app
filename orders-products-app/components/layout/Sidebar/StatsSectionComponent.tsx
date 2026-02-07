"use client";

import { StatItem } from "@/types/sidebar";
import { StatCard } from "@/components/layout/Sidebar/StatCardComponent";
import { useLocale } from "@/contexts/LocaleContext";

interface StatsSectionProps {
  items: StatItem[];
  cartStats: StatItem | null;
}

export function StatsSection({ items, cartStats }: StatsSectionProps) {
  const { t } = useLocale();
  return (
    <section aria-labelledby="sidebar-stats-title">
      <h2 id="sidebar-stats-title" className="text-uppercase text-muted small fw-semibold mb-3 ps-1">
        {t("sidebar.statsTitle")}
      </h2>
      <ul className="d-flex flex-column gap-1 list-unstyled mb-0">
        {items.map((stat) => (
          <li key={stat.labelKey}>
            <StatCard stat={stat} />
          </li>
        ))}
        {cartStats && (
          <li>
            <StatCard stat={cartStats} highlight />
          </li>
        )}
      </ul>
    </section>
  );
}
