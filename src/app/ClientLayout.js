"use client";

import { usePathname } from "next/navigation";
import { ThemeProvider } from "styled-components";
import BottomNav from "@/components/common/NavBottom/NavBottom";
import theme from "@/styles/theme";
import "./globals.css";
import styled from "styled-components";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const noBottomNavPaths = [
    "/",
    "/signin",
    "/signin/info",
    "/signin/profile",
    "/dog/info",
    "/dog/confirm",
    "/placesearch",
    "/placemap"
  ];
  const noHeaderNavPaths = [
    "/",
    "/signin",
    "/signin/info",
    "/signin/profile",
    "/dog/info",
    "/dog/confirm",
  ];

  const showBottomNav = !noBottomNavPaths.includes(pathname);
  const showHeaderNav = !noHeaderNavPaths.includes(pathname);

  return (
    <ThemeProvider theme={theme}>
      <LayoutContainer>
        <Content $noHeader={!showHeaderNav} $noBottom={!showBottomNav}>
          {children}
        </Content>
        {showBottomNav && <BottomNav />}
      </LayoutContainer>
    </ThemeProvider>
  );
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const Content = styled.main`
  flex: 1;
  margin-top: ${({ $noHeader }) => ($noHeader ? "0" : "50px")};
  margin-bottom: ${({ $noBottom }) => ($noBottom ? "0" : "75px")};
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;