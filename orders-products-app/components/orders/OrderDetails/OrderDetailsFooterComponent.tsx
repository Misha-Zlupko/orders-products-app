"use client";

import { useLocale } from "@/contexts/LocaleContext";

interface OrderDetailsFooterProps {
  onDelete: () => void;
}

export default function OrderDetailsFooter({
  onDelete,
}: OrderDetailsFooterProps) {
  const { t } = useLocale();
  return (
    <div className="card-footer bg-light">
      <div className="d-flex justify-content-end">
        <button className="btn btn-danger" onClick={onDelete}>
          {t("orders.deleteOrder")}
        </button>
      </div>
    </div>
  );
}
