import { useMemo } from "react";
import { navItems, buildStatsItems } from "./sidebarData";
import { CartIcon } from "./SidebarIconsComponent";

interface UseSidebarDataProps {
  cartItemCount: number;
  cartTotalPrice: number;
  ordersCount: number;
  productsCount: number;
}

export function useSidebarData({
  cartItemCount,
  cartTotalPrice,
  ordersCount,
  productsCount,
}: UseSidebarDataProps) {
  const navigationItems = useMemo(
    () => [
      ...navItems,
      {
        href: "/cart",
        labelKey: "nav.cart",
        badge: cartItemCount > 0 ? cartItemCount : null,
        icon: CartIcon(),
      },
    ],
    [cartItemCount]
  );

  const statsItems = useMemo(
    () => buildStatsItems(ordersCount, productsCount),
    [ordersCount, productsCount]
  );

  const cartStats = useMemo(() => {
    if (cartItemCount <= 0) return null;
    const price = Number(cartTotalPrice);
    return {
      labelKey: "nav.cart",
      value: `${(Number.isNaN(price) ? 0 : price).toLocaleString()} USD`,
      badge: cartItemCount,
      highlight: true,
    };
  }, [cartItemCount, cartTotalPrice]);

  return {
    navigationItems,
    statsItems,
    cartStats,
  };
}
