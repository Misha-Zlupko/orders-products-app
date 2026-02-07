"use client";

import { UserIcon } from "./SidebarIconsComponent";
import { AuthButton } from "@/components/layout/Sidebar/AuthButtonComponent";
import { useLocale } from "@/contexts/LocaleContext";

interface AccountSectionProps {
  user: unknown;
  isAuthenticated: boolean;
  logout: () => void;
}

export function AccountSection({
  user,
  isAuthenticated,
  logout,
}: AccountSectionProps) {
  const { t } = useLocale();
  const u = user as { name?: string; email?: string } | null;
  return (
    <section className="mt-auto pt-3 border-top">
      <h2 className="text-uppercase text-muted small fw-semibold mb-3 ps-1">
        {t("sidebar.account")}
      </h2>
      {isAuthenticated && u ? (
        <div className="d-flex flex-column gap-2">
          <div
            className="d-flex align-items-center gap-2 px-3 py-2 rounded text-white"
            style={{ backgroundColor: "rgb(16, 185, 129)" }}
          >
            <UserIcon />
            <span className="small fw-medium text-dark text-white">
              {u.name || u.email}
            </span>
          </div>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm w-100"
            onClick={logout}
          >
            {t("sidebar.logout")}
          </button>
        </div>
      ) : (
        <div className="d-flex flex-column gap-2">
          <AuthButton href="/auth/login" primary>
            {t("sidebar.login")}
          </AuthButton>
          <AuthButton href="/auth/register">{t("sidebar.register")}</AuthButton>
        </div>
      )}
    </section>
  );
}
