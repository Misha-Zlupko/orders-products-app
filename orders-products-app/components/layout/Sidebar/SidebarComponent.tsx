"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useAppSelector } from "@/store/hooks";
import { initialCartState } from "@/types/cart";
import { DesktopSidebar } from "@/components/layout/Sidebar/DesktopSidebarComponent";
import { MobileMenuButton } from "@/components/layout/Sidebar/MobileMenuButtonComponent";
import { MobileSidebar } from "@/components/layout/Sidebar/MobileSidebarComponent";
import { useSidebarData } from "@/components/layout/Sidebar/useSidebarData";
import { statsItems } from "@/components/layout/Sidebar/sidebarData";

export default function Sidebar() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const cartState = useAppSelector((state) => state.cart) ?? initialCartState;
  const cartItemCount = cartState.totalItems;
  const cartTotalPrice = cartState.totalPrice;

  const { navigationItems, cartStats } = useSidebarData({
    cartItemCount,
    cartTotalPrice,
  });

  return (
    <>
      <DesktopSidebar
        navigationItems={navigationItems}
        pathname={pathname}
        statsItems={statsItems}
        user={user}
        isAuthenticated={isAuthenticated}
        logout={logout}
        cartStats={cartStats}
      />

      <MobileMenuButton />

      <MobileSidebar
        navigationItems={navigationItems}
        pathname={pathname}
        user={user}
        statsItems={statsItems}
        isAuthenticated={isAuthenticated}
        logout={logout}
        cartStats={cartStats}
      />
    </>
  );
}
