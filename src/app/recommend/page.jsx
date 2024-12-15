"use client";

import Header from "@/components/common/Header/Header";
import { WithBookmarkIcon } from "@/components/common/Header/Header.stories";
import styled from "styled-components";
import { initialFacilities } from "@/data/facilities";
import theme from "@/styles/theme.js";
import FacilitiesSection from "@/components/main/FacilitiesSection/FacilitiesSection";
import Divider from "@/components/common/Divider/Divider";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/common/AuthGuard/AuthGuard";
import axios from "axios";

const RecommendPage = () => {

  const router = useRouter();

  const [userRecommended, setUserRecommended] = useState([]);
  const [popularFacilities, setPopularFacilities] = useState([]);
  const [genderAgePopular, setGenderAgePopular] = useState([]);
  const [reviewsTopFacilities, setReviewsTopFacilities] = useState([]);

  const [age, setAge] = useState("");
  const [gender, setGender] = useState(""); // 0 : male, 1: female

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        
        // 사용자 기준 추천 시설
        const userRecommendedRes = await axios.get("https://api.daengplace.com/recommend", {
          headers: { "Accept": "application/json", 'Authorization': `Bearer ${token}` },
        });

        // 최근 인기 시설
        const popularRes = await axios.get("https://api.daengplace.com/places/popular", {
          headers: { "Accept": "application/json" },
          params: { sort: "popularity", size: 5 },
        });

        // 성별/연령대별 인기 시설
        const genderAgeRes = await axios.get("https://api.daengplace.com/places/gender-popular", {
          headers: { "Accept": "application/json" },
        });

        // 데이터 상태 업데이트
        setUserRecommended(userRecommendedRes.data.data || []);
        setPopularFacilities(popularRes.data.data.content || []);
        setGenderAgePopular(genderAgeRes.data.data.popularPlaces || []);
        setAge(genderAgeRes.data.data.age);
        setGender(genderAgeRes.data.data.gender);
      } catch (error) {
        console.error("API 데이터 불러오기 실패: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Header 
        title="성향별 시설 추천" 
        showHomeIcon={WithBookmarkIcon.args.showHomeIcon} 
        showFavoriteIcon={WithBookmarkIcon.args.showFavoriteIcon} 
        showMapIcon={WithBookmarkIcon.args.showMapIcon}
        backbuttonPath="/main"
      />

      <ScrollableContent>

        <TestBanner>
          <AuthGuard>
            <BannerButton onClick={() => router.push('/recommend/testresult')}>성향 테스트 하러가기</BannerButton>
          </AuthGuard>
        </TestBanner>

        {/* 사용자 기준 추천 */}
        <Section>
          <FacilitiesSection sectionTitle={<><span>보호자 </span>님을 위한 <span>추천 시설</span></>} facilities={userRecommended} isCompact={true} />
        </Section>

        {/* 최근 인기 시설 */}
        <Section>
          <FacilitiesSection sectionTitle={<>최근 <span>인기 시설 🔥</span></>} facilities={popularFacilities} isCompact={true} />
        </Section>

        {/* 성별/연령대별 인기 시설 */}
        <Section>
          <FacilitiesSection 
            sectionTitle={<><span>{age}대 {gender}</span>들이 많이 찾는 👩🏻</>} 
            facilities={genderAgePopular} 
            isCompact={true} 
          />
        </Section>

        <Divider />

        <Banner>
          <BannerText>아직 <span>성향 테스트</span>를 하지 않으셨나요?</BannerText>
          <AuthGuard>
            <BannerImage onClick={() => router.push('/recommend/testresult')} src="/assets/recommend/recommendBanner.svg" alt="recommendBanner" width={560} height={373} />
          </AuthGuard>
          <Divider />
        </Banner>
  
        <Section>
        <FacilitiesSection sectionTitle={<><span>리뷰가 가장 많이 달린 </span>시설 🏢</>} facilities={initialFacilities} isCompact={true} />
        </Section>

      </ScrollableContent>
    
    </Container>
  );
};

export default RecommendPage;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh; 
  overflow: hidden;
  background-color: ${theme.colors.defaultBackground};
`;

const ScrollableContent = styled.div`
  margin-top: 50px;
  width: 100%;
  height: calc(100vh - 65px);
  overflow-y: scroll;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TestBanner = styled.div`
  margin: 20px 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const BannerButton = styled.button`
  background-color: white;
  width: 560px;
  height: 60px;
  border: 1px solid ${theme.colors.primary};
  color: ${theme.colors.primary};
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.primary};
    color: white;
  }
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Banner = styled.div`
  margin: 10px 0;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BannerImage = styled(Image)`
  border-radius: 30px;
  padding-bottom :10px;
  cursor: pointer;
`;

const BannerText = styled.div`
  width: 560px;
  padding: 0 10px 10px 10px;
  font-size: 18px;
  font-weight: bold;
  text-align: left;

  span {
    color: ${theme.colors.primary}
  }
`;