"use client";

import { useLocale } from "@/contexts/LocaleContext";

interface SectionLoaderProps {
  labelKey: string;
}

export default function SectionLoader({ labelKey }: SectionLoaderProps) {
  const { t } = useLocale();

  return (
    <div className="card h-100 d-flex align-items-center justify-content-center bg-light border-0 animate__animated animate__fadeIn">
      <div className="text-center py-4">
        <div className="spinner-border text-success mb-3" role="status" />
        <div className="text-muted small fw-medium">{t(labelKey)}</div>
      </div>
    </div>
  );
}
