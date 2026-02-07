import { OrdersIcon, ProductsIcon } from "./SidebarIconsComponent";
import { NavItem, StatItem } from "@/types/sidebar";

export const navItems: NavItem[] = [
  { href: "/orders", labelKey: "nav.orders", icon: OrdersIcon() },
  { href: "/products", labelKey: "nav.products", icon: ProductsIcon() },
];

/** Статистика формується динамічно в useSidebarData з ordersCount та productsCount */
export function buildStatsItems(
  ordersCount: number,
  productsCount: number
): StatItem[] {
  return [
    { labelKey: "sidebar.stats.ordersTotal", value: ordersCount },
    { labelKey: "sidebar.stats.productsTotal", value: productsCount },
  ];
}
