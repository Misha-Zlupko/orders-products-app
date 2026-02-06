"use client";

import { useState, useEffect } from "react";
import { useSocket } from "@/contexts/SocketContext";
import { useLocale } from "@/contexts/LocaleContext";

function getSessionsLabel(count: number, t: (key: string) => string): string {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14)
    return t("topMenu.sessions.many");
  if (lastDigit === 1) return t("topMenu.sessions.one");
  if (lastDigit >= 2 && lastDigit <= 4) return t("topMenu.sessions.few");
  return t("topMenu.sessions.many");
}

export default function TopMenuComponent() {
  const { sessionsCount, isConnected } = useSocket();
  const { t, locale } = useLocale();
  const [currentTime, setCurrentTime] = useState("--:--:--");
  const [currentDate, setCurrentDate] = useState("--.--.----");

  const localeTag = locale === "uk" ? "uk-UA" : "en-GB";

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentDate(
        now.toLocaleDateString(localeTag, {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      );
      setCurrentTime(
        now.toLocaleTimeString(localeTag, {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [localeTag]);

  return (
    <div className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center gap-3">
      <div
        className="rounded-3 p-3"
        style={{
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          minWidth: "160px",
        }}
      >
        <div className="d-flex align-items-center gap-3">
          <div style={{ color: "#3b82f6" }}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              aria-hidden
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div>
            <div
              className="fw-bold font-monospace"
              style={{ color: "#1f2937", fontSize: "1rem" }}
            >
              {currentTime}
            </div>
            <div className="small" style={{ color: "#6b7280" }}>
              {currentDate}
            </div>
          </div>
        </div>
      </div>
      <div
        className="rounded-3 p-3 text-white d-flex align-items-center gap-3"
        style={{
          background: isConnected ? "#10b981" : "#6b7280",
          minWidth: "140px",
          boxShadow: isConnected ? "0 2px 8px rgba(16, 185, 129, 0.3)" : "none",
        }}
      >
        <div
          className="rounded-2 d-flex align-items-center justify-content-center"
          style={{
            background: "rgba(255, 255, 255, 0.2)",
            padding: "6px",
            width: "32px",
            height: "32px",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <div>
          <div className="fw-bold fs-5">{sessionsCount}</div>
          <div className="small opacity-90">
            {getSessionsLabel(sessionsCount, t)}
          </div>
        </div>
      </div>
    </div>
  );
}
