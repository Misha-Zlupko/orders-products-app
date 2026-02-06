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
