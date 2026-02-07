"use client";

import Link from "next/link";
import { useLocale } from "@/contexts/LocaleContext";

const EMPTY_CART_ACTIONS = [
  { href: "/products", labelKey: "cart.goToCatalog" as const, primary: true },
  { href: "/orders", labelKey: "cart.viewOrders" as const, primary: false },
] as const;

const WHY_ORDER_ITEMS = [
  { titleKey: "cart.fastDelivery" as const, descKey: "cart.fastDeliveryDays" as const },
  { titleKey: "cart.support247" as const, descKey: "cart.supportAlways" as const },
  { titleKey: "cart.qualityWarranty" as const, descKey: "cart.qualityDays" as const },
] as const;

const IconCart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="me-2" viewBox="0 0 16 16" aria-hidden>
    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
  </svg>
);

const IconOrders = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="me-2" viewBox="0 0 16 16" aria-hidden>
    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5z" />
  </svg>
);

const ACTION_ICONS = [IconCart, IconOrders] as const;

export default function EmptyCart() {
  const { t } = useLocale();
  return (
    <section className="empty-cart text-center py-5 animate__animated animate__fadeIn" aria-labelledby="empty-cart-title">
      <div className="mb-4">
        <div className="empty-cart-icon mx-auto" aria-hidden>
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="#e9ecef" viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
        </div>
      </div>

      <h2 id="empty-cart-title" className="h3 mb-3 text-gray-700">{t("cart.emptyTitle")}</h2>
      <p className="text-muted mb-4">{t("cart.emptyDesc")}</p>

      <ul className="d-flex flex-column flex-sm-row gap-3 justify-content-center list-unstyled mb-0">
        {EMPTY_CART_ACTIONS.map(({ href, labelKey, primary }, index) => (
          <li key={href}>
            <Link
              href={href}
              className={`d-inline-flex align-items-center px-4 py-3 text-decoration-none ${primary ? "text-white" : ""}`}
              style={primary ? { backgroundColor: "rgb(16, 185, 129)", borderColor: "#10b981" } : { border: "1px solid #10b981", color: "#10b981" }}
            >
            {ACTION_ICONS[index]()}
              {t(labelKey)}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-5 pt-4 border-top">
        <h3 className="h5 mb-3">{t("cart.whyOrder")}</h3>
        <ul className="row justify-content-center list-unstyled mb-0">
          {WHY_ORDER_ITEMS.map(({ titleKey, descKey }) => (
            <li key={titleKey} className="col-md-4 mb-3">
              <div className="d-flex align-items-center justify-content-center">
                <div
                  className="rounded-circle bg-success bg-opacity-10 p-2 me-3 d-flex align-items-center justify-content-center"
                  style={{ minWidth: "40px", minHeight: "40px" }}
                  aria-hidden
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#10b981" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                  </svg>
                </div>
                <div>
                  <div className="fw-medium">{t(titleKey)}</div>
                  <small className="text-muted">{t(descKey)}</small>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
