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
    "/dog/edit",
    "/mypage/bookmark",
    "/mypage/bookmark/map",
    "/mypage/myreviews",
    "/mypage/profile",
    "/mypage/editpet",
    "/mypage/registerpet",
    "/mypage/registerpet/confirm",
    "/mypage/registerpet/edit",
    "/place/placesearch",
    "/place/placemap",
    "/place/placedetail",
    "/recommend",
    "/recommend/testresult",
    "/recommend/dogtest",
    "/recommend/usertest",
    "/reviews/reviewScan",
    "/reviews/reviewsInput",
    "/reviews/receiptCapture",
    "/reviews",
  ];
  const noHeaderNavPaths = [
    "/main",
    "/signin",
    "/signin/info",
    "/signin/profile",
    "/dog/info",
    "/dog/confirm",
    "/dog/edit",
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
  position: relative;
`;

const Content = styled.main`
  flex: 1;
  margin-bottom: ${({ $noBottom }) => ($noBottom ? "0" : "75px")};
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
