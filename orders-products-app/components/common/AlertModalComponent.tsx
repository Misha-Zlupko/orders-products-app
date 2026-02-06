"use client";

import { useLocale } from "@/contexts/LocaleContext";

interface AlertModalProps {
  isOpen: boolean;
  title: string;
  body: string;
  onClose: () => void;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
}

export default function AlertModal({
  isOpen,
  title,
  body,
  onClose,
  primaryActionLabel,
  onPrimaryAction,
}: AlertModalProps) {
  const { t } = useLocale();

  if (!isOpen) return null;

  const handlePrimary = () => {
    if (onPrimaryAction) {
      onPrimaryAction();
    } else {
      onClose();
    }
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      id="alertModal"
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby="alertModalLabel"
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered animate__animated animate__fadeInDown animate__faster"
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header bg-light border-bottom">
            <h5 className="modal-title fw-semibold" id="alertModalLabel">
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label={t("common.close")}
              onClick={onClose}
            />
          </div>
          <div className="modal-body">
            <p className="mb-0">{body}</p>
          </div>
          <div className="modal-footer border-top">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={onClose}
            >
              {t("common.close")}
            </button>
            {primaryActionLabel && (
              <button
                type="button"
                className="btn text-white"
                style={{ backgroundColor: "rgb(16, 185, 129)" }}
                data-bs-dismiss="modal"
                onClick={handlePrimary}
              >
                {primaryActionLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
