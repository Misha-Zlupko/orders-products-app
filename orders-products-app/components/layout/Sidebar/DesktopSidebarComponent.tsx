import { NavList } from "@/components/layout/Sidebar/NavListComponent";
import { StatsSection } from "@/components/layout/Sidebar/StatsSectionComponent";
import { AccountSection } from "@/components/layout/Sidebar/AccountSectionComponent";
import { SidebarProps } from "@/types/sidebar";

export function DesktopSidebar({
  navigationItems,
  pathname,
  statsItems,
  cartStats,
  user,
  isAuthenticated,
  logout,
}: SidebarProps) {
  return (
    <aside className="d-none d-md-flex flex-column bg-white border-end sidebar-custom">
      <div className="container-fluid h-100 px-0">
        <div className="row h-100 g-0">
          <div className="col-12 d-flex flex-column h-100">
            <nav className="flex-grow-1 d-flex flex-column gap-4 p-4 overflow-auto">
              <NavList items={navigationItems} pathname={pathname} />
              <StatsSection items={statsItems} cartStats={cartStats} />
              <AccountSection
                user={user}
                isAuthenticated={isAuthenticated}
                logout={logout}
              />
            </nav>
          </div>
        </div>
      </div>
    </aside>
  );
}
