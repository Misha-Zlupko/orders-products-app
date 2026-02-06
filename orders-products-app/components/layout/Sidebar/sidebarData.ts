import { OrdersIcon, ProductsIcon } from "./SidebarIconsComponent";
import { NavItem, StatItem } from "@/types/sidebar";

export const navItems: NavItem[] = [
  { href: "/orders", labelKey: "nav.orders", icon: OrdersIcon() },
  { href: "/products", labelKey: "nav.products", icon: ProductsIcon() },
];

export const statsItems: StatItem[] = [
  { labelKey: "sidebar.stats.ordersTotal", value: 24 },
  { labelKey: "sidebar.stats.productsTotal", value: 156 },
];
