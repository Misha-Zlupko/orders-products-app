import { useMemo } from "react";
import { navItems, statsItems } from "./sidebarData";
import { CartIcon } from "./SidebarIconsComponent";

interface UseSidebarDataProps {
  cartItemCount: number;
  cartTotalPrice: number;
}

export function useSidebarData({
  cartItemCount,
  cartTotalPrice,
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

  const cartStats = useMemo(() => {
    if (cartItemCount <= 0) return null;
    return {
      labelKey: "nav.cart",
      value: `${cartTotalPrice.toLocaleString()} USD`,
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
