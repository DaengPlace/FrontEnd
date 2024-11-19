"use client";

import { usePathname } from "next/navigation";
import { ThemeProvider } from "styled-components";
import BottomNav from "@/components/common/NavBottom/NavBottom";
import theme from "@/styles/theme";
import "./globals.css";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const noBottomNavPaths = ["/login"];

  return (
    <ThemeProvider theme={theme}>
      {children}
      {!noBottomNavPaths.includes(pathname) && <BottomNav />}
    </ThemeProvider>
  );
}
