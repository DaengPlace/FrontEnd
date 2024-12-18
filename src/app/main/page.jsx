"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import theme from "../../styles/theme.js";
import Banner from "@/components/main/Banner/Banner.jsx";
import Menu from "@/components/main/Menu/Menu.jsx";
import FacilitiesSection from "@/components/main/FacilitiesSection/FacilitiesSection.jsx";
import Footer from "@/components/common/Footer/Footer.jsx";
import Divider from "@/components/common/Divider/Divider.jsx";
import Header from "@/components/common/Header/Header.jsx";
import { DefaultHeader } from "@/components/common/Header/Header.stories.js";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import {
  getGenderAgeFacilities,
  getPopularFacilities,
} from "@/apis/place/getPopularFacilities.jsx";

const MainPage = () => {
  const router = useRouter();
  const { setTokens } = useAuthStore();
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [popularFacilities, setPopularFacilities] = useState([]);
  const [genderAgeFacilities, setGenderAgeFacilities] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      setTokens({
        accessToken,
      });
      router.push("/main");
    } else {
    }
  }, [router]);

  // 인기 시설 조회
  useEffect(() => {
    const fetchPopularFacilities = async () => {
      try {
        const response = await getPopularFacilities();
        setPopularFacilities(response.data);
      } catch (error) {
        console.error("인기 시설 데이터를 가져오는 데 실패했습니다 : ", error);
      }
    };

    fetchPopularFacilities();
  }, []);

  // 성별/연령대별 시설 조회
  useEffect(() => {
    const fetchGenderAgeFacilities = async () => {
      try {
        const response = await getGenderAgeFacilities();
        setGenderAgeFacilities(response.data.popularPlaces);
        setAge(response.data.age);
        setGender(response.data.gender);
      } catch (error) {
        console.error(
          "성별/연령대별 인기 시설 데이터를 가져오는 데 실패했습니다 : ",
          error
        );
      }
    };

    fetchGenderAgeFacilities();
  }, []);

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
        facilities={popularFacilities}
      />
      <FacilitiesSection
        sectionTitle={
          <>
            <span>
              {age} {gender}
            </span>
            들이 많이 찾는 👩🏻
          </>
        }
        facilities={genderAgeFacilities}
      />
      <Divider />
      <Footer />
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.colors.defaultBackground};
`;
