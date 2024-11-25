"use client";

import { usePathname } from "next/navigation";
import { ThemeProvider } from "styled-components";
import { useEffect, useState } from "react";
import BottomNav from "@/components/common/NavBottom/NavBottom";
import theme from "@/styles/theme";
import "./globals.css";

export default function ClientLayout({ children }) {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const noBottomNavPaths = ["/", "/signin", "/signin/info"];

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {children}
      {isClient && !noBottomNavPaths.includes(pathname) && <BottomNav />}
    </ThemeProvider>
  );
}
