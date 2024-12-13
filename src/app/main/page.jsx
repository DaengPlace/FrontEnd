"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "../../styles/theme.js";

import Banner from "@/components/main/Banner/Banner.jsx";
import Menu from "@/components/main/Menu/Menu.jsx";
import FacilitiesSection from "@/components/main/FacilitiesSection/FacilitiesSection.jsx";
import Footer from "@/components/common/Footer/Footer.jsx";
import Divider from "@/components/common/Divider/Divider.jsx";
import Header from "@/components/common/Header/Header.jsx";
import { DefaultHeader } from "@/components/common/Header/Header.stories.js";
import { initialFacilities } from "@/data/facilities.js";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

const MainPage = () => {
  const router = useRouter();
  const { setTokens } = useAuthStore();
  const [age, setAge] = useState(20);
  const [gender, setGender] = useState(1); // 0 : male, 1: female

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setTokens({
        accessToken,
        refreshToken,
      });

      router.push("/main");
    } else {
      console.log("Access Token이 URL에 없습니다.");
    }
  }, [router]);

  return (
    <Container>
      <Header
        showLogo={DefaultHeader.args.showLogo}
        showHomeIcon={DefaultHeader.args.showHomeIcon}
        showFavoriteIcon={DefaultHeader.args.showFavoriteIcon}
      />
      <Banner />
      <Menu />
      <FacilitiesSection
        sectionTitle={
          <>
            최근 <span>인기 시설 🔥</span>
          </>
        }
        facilities={initialFacilities}
      />
      <FacilitiesSection
        sectionTitle={
          <>
            <span>
              {age}대 {gender === 1 ? "여성" : "남성"}
            </span>
            들이 많이 찾는 👩🏻
          </>
        }
        facilities={initialFacilities}
      />
      <Divider />
      <Footer />
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.colors.defaultBackground};
`;
