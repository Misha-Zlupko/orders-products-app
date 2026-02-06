import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css";

import "./globals.css";

import BootstrapClient from "@/components/layout/BootstrapClientComponent";
import HeaderComponent from "@/components/layout/Header/HeaderComponent";
import SidebarComponent from "@/components/layout/Sidebar/SidebarComponent";
import { Providers } from "@/components/providers/Providers";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Orders & Products",
  description: "Orders and products management system. Test task.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <BootstrapClient />
          <HeaderComponent />
          <div className="app-body">
            <SidebarComponent />
            <main className="app-main">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
