"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useAppSelector } from "@/store/hooks";
import { selectOrdersByUserId } from "@/store";
import { initialCartState } from "@/types/cart";
import { db } from "@/data/databaseProducts";
import { DesktopSidebar } from "@/components/layout/Sidebar/DesktopSidebarComponent";
import { MobileMenuButton } from "@/components/layout/Sidebar/MobileMenuButtonComponent";
import { MobileSidebar } from "@/components/layout/Sidebar/MobileSidebarComponent";
import { useSidebarData } from "@/components/layout/Sidebar/useSidebarData";

export default function Sidebar() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const cartState = useAppSelector((state) => state.cart) ?? initialCartState;
  const cartItemCount = cartState?.totalItems ?? 0;
  const cartTotalPrice = cartState?.totalPrice ?? 0;

  const orders = useAppSelector((state) =>
    selectOrdersByUserId(state, user?.id ?? null)
  );
  const ordersCount = orders.length;

  const [productsCount, setProductsCount] = useState(0);
  useEffect(() => {
    let cancelled = false;
    db.products.toArray().then((list) => {
      if (!cancelled) setProductsCount(list.length);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const { navigationItems, statsItems, cartStats } = useSidebarData({
    cartItemCount,
    cartTotalPrice,
    ordersCount,
    productsCount,
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
