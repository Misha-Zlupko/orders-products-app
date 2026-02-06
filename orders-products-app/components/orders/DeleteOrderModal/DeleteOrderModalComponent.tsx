"use client";

import { Order } from "@/types/order";
import { useLocale } from "@/contexts/LocaleContext";

interface DeleteOrderModalProps {
  isOpen: boolean;
  order: Order | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteOrderModal({
  isOpen,
  order,
  onConfirm,
  onCancel,
}: DeleteOrderModalProps) {
  const { t } = useLocale();
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header bg-danger bg-opacity-10 border-bottom">
            <h5 className="modal-title text-danger fw-semibold">
              {t("orders.deleteModalTitle")}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onCancel}
              aria-label={t("orders.deleteModalClose")}
            ></button>
          </div>

          <div className="modal-body text-center py-4">
            <div className="mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="42"
                height="42"
                fill="currentColor"
                className="bi bi-clock text-warning"
                viewBox="0 0 16 16"
              >
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
              </svg>
            </div>

            <p className="mb-2 fs-5">
              {t("orders.deleteModalConfirm")}{" "}
              <strong className="text-dark">{`"${order?.title}"`}</strong>?
            </p>

            <p className="text-muted mb-0">
              {t("orders.deleteModalIrreversible")}
            </p>
          </div>

          <div className="modal-footer border-top">
            <button
              type="button"
              className="btn btn-outline-secondary px-4"
              onClick={onCancel}
            >
              {t("orders.deleteModalCancel")}
            </button>
            <button
              type="button"
              className="btn btn-danger px-4"
              onClick={onConfirm}
            >
              {t("orders.deleteModalDelete")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
