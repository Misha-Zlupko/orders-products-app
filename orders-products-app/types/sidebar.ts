import type { User } from "@/types/auth";

export interface NavItem {
  href: string;
  labelKey: string;
  icon: React.ReactNode;
  badge?: number | null;
}

export interface StatItem {
  labelKey: string;
  value: string | number;
  badge?: string | number;
  highlight?: boolean;
}

export interface SidebarProps {
  navigationItems: NavItem[];
  pathname: string;
  statsItems: StatItem[];
  cartStats: StatItem | null;
  user: User | null;
  isAuthenticated: boolean;
  logout: () => void;
}
