"use client";

import Link from "next/link";
import { useLocale } from "@/contexts/LocaleContext";

export default function EmptyCart() {
  const { t } = useLocale();
  return (
    <div className="empty-cart text-center py-5 animate__animated animate__fadeIn">
      <div className="mb-4">
        <div className="empty-cart-icon mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            fill="#e9ecef"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
        </div>
      </div>

      <h3 className="mb-3 text-gray-700">{t("cart.emptyTitle")}</h3>

      <p className="text-muted mb-4">{t("cart.emptyDesc")}</p>

      <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
        <Link
          href="/products"
          className="btn px-4 py-3 text-white"
          style={{
            backgroundColor: "rgb(16, 185, 129)",
            borderColor: "#10b981",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="me-2"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
          </svg>
          {t("cart.goToCatalog")}
        </Link>

        <Link
          href="/orders"
          className="px-4 py-3"
          style={{
            borderColor: "#10b981",
            color: "#10b981",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="me-2"
            viewBox="0 0 16 16"
          >
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
          </svg>
          {t("cart.viewOrders")}
        </Link>
      </div>

      <div className="mt-5 pt-4 border-top">
        <h5 className="mb-3">{t("cart.whyOrder")}</h5>
        <div className="row justify-content-center">
          <div className="col-md-4 mb-3">
            <div className="d-flex align-items-center justify-content-center">
              <div
                className="rounded-circle bg-opacity-10 p-2 me-3"
                style={{
                  backgroundColor: "rgb(16, 185, 129)",
                  minWidth: "40px",
                  minHeight: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#10b981"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                </svg>
              </div>
              <div>
                <div className="fw-medium">{t("cart.fastDelivery")}</div>
                <small className="text-muted">
                  {t("cart.fastDeliveryDays")}
                </small>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="d-flex align-items-center justify-content-center">
              <div
                className="rounded-circle bg-opacity-10 p-2 me-3"
                style={{
                  minWidth: "40px",
                  minHeight: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgb(16, 185, 129)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#10b981"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z" />
                </svg>
              </div>
              <div>
                <div className="fw-medium">{t("cart.support247")}</div>
                <small className="text-muted">{t("cart.supportAlways")}</small>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="d-flex align-items-center justify-content-center">
              <div
                className="rounded-circle bg-success bg-opacity-10 p-2 me-3"
                style={{
                  minWidth: "40px",
                  minHeight: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#10b981"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                </svg>
              </div>
              <div>
                <div className="fw-medium">{t("cart.qualityWarranty")}</div>
                <small className="text-muted">{t("cart.qualityDays")}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
