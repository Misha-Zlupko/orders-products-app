"use client";

import { NavList } from "@/components/layout/Sidebar/NavListComponent";
import { StatsSection } from "@/components/layout/Sidebar/StatsSectionComponent";
import { MobileAccountSection } from "@/components/layout/Sidebar/MobileAccountSectionComponent";
import { SidebarProps } from "@/types/sidebar";
import { useLocale } from "@/contexts/LocaleContext";

export function MobileSidebar({
  navigationItems,
  pathname,
  statsItems,
  cartStats,
  user,
  isAuthenticated,
  logout,
}: SidebarProps) {
  const { t } = useLocale();
  return (
    <div
      className="offcanvas offcanvas-start d-md-none"
      id="sidebarOffcanvas"
      style={{ width: "280px" }}
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">{t("sidebar.menu")}</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
        />
      </div>
      <div className="offcanvas-body p-0">
        <div className="d-flex flex-column bg-white h-100">
          <div className="container-fluid h-100 px-0">
            <div className="row h-100 g-0">
              <div className="col-12 d-flex flex-column h-100">
                <nav className="flex-grow-1 d-flex flex-column gap-4 p-4">
                  <NavList items={navigationItems} pathname={pathname} />
                  <StatsSection items={statsItems} cartStats={cartStats} />
                  <MobileAccountSection
                    user={user}
                    isAuthenticated={isAuthenticated}
                    logout={logout}
                  />
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
