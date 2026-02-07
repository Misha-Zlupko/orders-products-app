"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useAuth } from "@/contexts/AuthContext";
import { useLocale } from "@/contexts/LocaleContext";
import { useAppSelector } from "@/store/hooks";
import { selectOrdersByUserId } from "@/store";
import { useSocket } from "@/contexts/SocketContext";
import SectionLoader from "@/components/common/SectionLoaderComponent";
import { db } from "@/data/databaseProducts";

const GoogleMapComponent = dynamic(
  () => import("@/components/home/GoogleMapComponent"),
  {
    ssr: false,
    loading: () => <SectionLoader labelKey="home.mapLoading" />,
  }
);

const OrdersChartComponent = dynamic(
  () => import("@/components/home/OrdersChartComponent"),
  {
    ssr: false,
    loading: () => <SectionLoader labelKey="home.chartLoading" />,
  }
);

const SECTION_ICONS = {
  orders: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      viewBox="0 0 16 16"
      className="me-2"
      aria-hidden
    >
      <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5z" />
    </svg>
  ),
  products: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      viewBox="0 0 16 16"
      className="me-2"
      aria-hidden
    >
      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
    </svg>
  ),
} as const;

export default function Home() {
  const { user } = useAuth();
  const { t } = useLocale();
  const orders = useAppSelector((state) =>
    selectOrdersByUserId(state, user?.id ?? null)
  );
  const ordersCount = orders.length;
  const { sessionsCount } = useSocket();
  const [productsCount, setProductsCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    db.products.toArray().then((list) => {
      if (!cancelled) setProductsCount(list.length);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const sectionLinks = [
    { href: "/orders", labelKey: "nav.orders" as const, iconKey: "orders" as const, count: ordersCount },
    { href: "/products", labelKey: "nav.products" as const, iconKey: "products" as const, count: productsCount !== null ? productsCount : "…" },
  ];

  const indicators = [
    { labelKey: "home.ordersLabel" as const, valueKey: "home.ordersCount" as const, count: ordersCount, max: 20, widthFactor: 5, barClass: "" },
    { labelKey: "home.productsLabel" as const, valueKey: "home.productsCount" as const, count: productsCount ?? 0, max: 50, widthFactor: 3, barClass: "bg-info" },
    { labelKey: "home.sessionsLabel" as const, valueKey: "home.sessionsActiveCount" as const, count: sessionsCount, max: 10, widthFactor: 20, barClass: "bg-primary" },
  ];

  return (
    <div className="container-fluid py-4 px-3">
      <div
        className="alert alert-light border border-secondary-subtle d-flex align-items-center gap-3 mb-4 shadow-sm animate__animated animate__fadeInDown"
        role="alert"
      >
        <div
          className="rounded-circle bg-opacity-10 p-3 text-success"
          style={{ backgroundColor: "rgb(16, 185, 129)" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
          </svg>
        </div>
        <div className="flex-grow-1">
          <h5 className="alert-heading mb-1">{t("home.panelTitle")}</h5>
          <p className="mb-0 small text-muted">{t("home.panelDesc")}</p>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card shadow-sm h-100 animate__animated animate__fadeInUp">
            <div className="card-header bg-white border-bottom fw-semibold">
              {t("home.sectionsTitle")}
            </div>
            <nav aria-label={t("home.sectionsTitle")}>
              <ul className="list-group list-group-flush list-unstyled mb-0">
                {sectionLinks.map(({ href, labelKey, iconKey, count }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-3 text-decoration-none text-body"
                    >
                      <span className="d-flex align-items-center">
                        {SECTION_ICONS[iconKey]()}
                        {t(labelKey)}
                      </span>
                      <span
                        className="badge rounded-pill"
                        style={{ backgroundColor: "rgb(16, 185, 129)" }}
                      >
                        {count}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card shadow-sm h-100 animate__animated animate__fadeInUp animate__delay-1s">
            <div className="card-header bg-white border-bottom d-flex justify-content-between align-items-center">
              <span className="fw-semibold">{t("home.summaryTitle")}</span>
              <span className="badge bg-info text-dark">{t("home.live")}</span>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-4">{t("home.metric")}</th>
                      <th>{t("home.value")}</th>
                      <th className="pe-4 text-end">{t("home.status")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        label: t("home.ordersTotal"),
                        value: String(ordersCount),
                        status: t("home.statusActive"),
                        badgeClass: "bg-success",
                      },
                      {
                        label: t("home.productsTotal"),
                        value:
                          productsCount !== null ? String(productsCount) : "…",
                        status: t("home.statusInCatalog"),
                        badgeClass: "bg-success",
                      },
                      {
                        label: t("home.sessionsActive"),
                        value: String(sessionsCount),
                        status: t("home.statusOnline"),
                        badgeClass: "bg-primary",
                      },
                    ].map((row, index) => (
                      <tr key={index}>
                        <td className="ps-4">{row.label}</td>
                        <td>
                          <strong>{row.value}</strong>
                        </td>
                        <td className="pe-4 text-end">
                          <span className={`badge ${row.badgeClass}`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mt-2">
        <div className="col-lg-5">
          <GoogleMapComponent />
        </div>
        <div className="col-lg-7">
          <OrdersChartComponent orders={orders} />
        </div>
      </div>

      <section aria-labelledby="home-indicators-title" className="card shadow-sm mt-4 animate__animated animate__fadeInUp animate__delay-2s">
        <h2 id="home-indicators-title" className="card-header bg-white border-bottom fw-semibold mb-0">
          {t("home.indicatorsTitle")}
        </h2>
        <div className="card-body">
          <ul className="list-unstyled mb-0">
            {indicators.map(({ labelKey, valueKey, count, max, widthFactor, barClass }) => (
              <li key={labelKey} className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span className="small text-muted">{t(labelKey)}</span>
                  <span className="small fw-medium">
                    {typeof count === "number" ? t(valueKey, { count }) : "…"}
                  </span>
                </div>
                <div className="progress" style={{ height: "8px" }} role="progressbar" aria-valuenow={count} aria-valuemin={0} aria-valuemax={max}>
                  <div
                    className={`progress-bar ${barClass || ""}`.trim()}
                    style={{
                      width: typeof count === "number" ? `${Math.min(count * widthFactor, 100)}%` : "0%",
                      ...(barClass ? {} : { backgroundColor: "rgb(16, 185, 129)" }),
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
