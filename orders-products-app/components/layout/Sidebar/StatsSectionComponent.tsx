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
    <section>
      <h2 className="text-uppercase text-muted small fw-semibold mb-3 ps-1">
        {t("sidebar.statsTitle")}
      </h2>
      <div className="d-flex flex-column gap-1">
        {items.map((stat) => (
          <StatCard key={stat.labelKey} stat={stat} />
        ))}
        {cartStats && <StatCard stat={cartStats} highlight />}
      </div>
    </section>
  );
}
