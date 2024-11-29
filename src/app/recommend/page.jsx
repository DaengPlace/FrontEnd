"use client";

import Header from "@/components/common/Header/Header";
import { WithBookmarkIcon } from "@/components/common/Header/Header.stories";
import styled from "styled-components";
import { initialFacilities } from "@/data/facilities";
import theme from "@/styles/theme.js";
import FacilitiesSection from "@/components/main/FacilitiesSection/FacilitiesSection";
import Divider from "@/components/common/Divider/Divider";
import { useState } from "react";

const RecommendPage = () => {

  const [age, setAge] = useState(20);
  const [gender, setGender] = useState(1); // 0 : male, 1: female

  return (
    <Container>
      <Header title="성향별 시설 추천" showFavoriteIcon={WithBookmarkIcon.args.showFavoriteIcon} showMapIcon={WithBookmarkIcon.args.showMapIcon} />

      <ScrollableContent>

        <TestBanner>
          <BannerButton>성향 테스트 하러가기</BannerButton>
        </TestBanner>

        <Section>
          <FacilitiesSection sectionTitle={<>최근 <span>인기 시설 🔥</span></>} facilities={initialFacilities} isCompact={true} />
          <FacilitiesSection sectionTitle={<><span>{age}대 {gender===1 ? "여성" : "남성"}</span>들이 많이 찾는 👩🏻</>} facilities={initialFacilities} isCompact={true} />
          <Divider />
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
`;

const ScrollableContent = styled.div`
  margin-top: 50px;
  width: 100%;
  height: calc(100vh - 65px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
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