"use client";

import { useMemo } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import type { Order } from "@/types/order";
import { useLocale } from "@/contexts/LocaleContext";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function getOrdersByMonth(orders: Order[]): number[] {
  const counts = new Array(12).fill(0);
  for (const order of orders) {
    const month = new Date(order.date).getMonth();
    counts[month]++;
  }
  return counts;
}

interface OrdersChartComponentProps {
  orders: Order[];
}

export default function OrdersChartComponent({
  orders,
}: OrdersChartComponentProps) {
  const { t, locale } = useLocale();
  const localeTag = locale === "uk" ? "uk-UA" : "en-GB";

  const getMonthLabel = (index: number) =>
    t(`home.ordersChart.monthShort.${index}`);

  const { radarData, ordersByDate } = useMemo(() => {
    const byMonth = getOrdersByMonth(orders);
    const labels = Array.from({ length: 12 }, (_, i) => getMonthLabel(i));

    const radarData = {
      labels,
      datasets: [
        {
          label: t("home.ordersChart.datasetLabel"),
          data: byMonth,
          backgroundColor: "rgba(16, 185, 129, 0.2)",
          borderColor: "rgb(16, 185, 129)",
          borderWidth: 2,
          pointBackgroundColor: "rgb(16, 185, 129)",
        },
      ],
    };
    const ordersByDate = [...orders].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return { radarData, ordersByDate };
  }, [orders, t]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        r: {
          min: 0,
          ticks: { stepSize: 1 },
        },
      },
      plugins: {
        legend: { display: true },
        tooltip: {
          callbacks: {
            label: (ctx: { label?: string; raw?: unknown }) =>
              t("home.ordersChart.tooltip", {
                label: ctx.label ?? "",
                count: Number(ctx.raw ?? 0),
              }),
          },
        },
      },
    }),
    [t]
  );

  const formatOrderDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(localeTag, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getLocalizedTitle = (order: Order) => {
    if (order.titleKey) {
      return t(order.titleKey, order.titleParams);
    }
    return order.title;
  };

  return (
    <div className="card h-100">
      <div className="card-header bg-white border-bottom fw-semibold">
        {t("home.ordersChart.title")}
      </div>
      <div className="card-body">
        <div style={{ height: "320px", marginBottom: "1.5rem" }}>
          <Radar data={radarData} options={options} />
        </div>
        <h6 className="fw-semibold mb-2">
          {t("home.ordersChart.byDatesTitle")}
        </h6>
        <div
          className="table-responsive"
          style={{ maxHeight: "240px", overflowY: "auto" }}
        >
          <table className="table table-sm table-hover mb-0">
            <thead className="table-light sticky-top">
              <tr>
                <th>{t("home.ordersChart.dateHeader")}</th>
                <th>{t("home.ordersChart.nameHeader")}</th>
                <th className="text-end">{t("home.ordersChart.idHeader")}</th>
              </tr>
            </thead>
            <tbody>
              {ordersByDate.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-muted text-center py-3">
                    {t("home.ordersChart.empty")}
                  </td>
                </tr>
              ) : (
                ordersByDate.map((order) => (
                  <tr key={order.id}>
                    <td>{formatOrderDate(order.date)}</td>
                    <td>{getLocalizedTitle(order)}</td>
                    <td className="text-end">#{order.id}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
