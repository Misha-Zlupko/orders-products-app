"use client";

import { StatItem } from "@/types/sidebar";
import { useLocale } from "@/contexts/LocaleContext";

interface StatCardProps {
  stat: StatItem;
  highlight?: boolean;
}

export function StatCard({ stat, highlight = false }: StatCardProps) {
  const { t } = useLocale();
  const className = highlight
    ? "bg-success bg-opacity-10 border border-success border-opacity-25 rounded p-3"
    : "border border-gray-200 rounded p-3";

  const badgeDisplay =
    stat.badge !== undefined
      ? typeof stat.badge === "number"
        ? `${stat.badge} ${t("nav.cartBadge")}`
        : stat.badge
      : null;

  return (
    <div className={className}>
      <div className="d-flex justify-content-between align-items-center mb-1">
        <div className="text-muted small fw-medium">{t(stat.labelKey)}</div>
        {badgeDisplay && (
          <span
            className="badge rounded-pill"
            style={{ backgroundColor: "rgb(16, 185, 129)" }}
          >
            {badgeDisplay}
          </span>
        )}
      </div>
      <div
        className={`fw-bold fs-5 ${highlight ? "text-success" : "text-dark"}`}
      >
        {stat.value}
      </div>
    </div>
  );
}
