"use client";

import { useLocale } from "@/contexts/LocaleContext";

interface OrderDetailsHeaderProps {
  onClose: () => void;
}

export default function OrderDetailsHeader({
  onClose,
}: OrderDetailsHeaderProps) {
  const { t } = useLocale();
  return (
    <div className="card-header bg-light d-flex justify-content-between align-items-center">
      <h5 className="card-title mb-0 fw-bold">{t("orders.detailsTitle")}</h5>
      <button
        className="btn-close"
        onClick={onClose}
        aria-label={t("orders.closeDetails")}
      />
    </div>
  );
}
