"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import Banner from "@/components/place/Banner/Banner";
import Footer from "@/components/common/Footer/Footer.jsx";
import CategorySelector from "@/components/place/CategorySelector/CategorySelector";
import ReviewList from "@/components/place/ReviewList/ReviewList";
import { Permission } from "@/components/common/BottomSheet/BottomSheet.stories";
import Divider from "@/components/common/Divider/Divider.jsx";
import Image from "next/image";
import { reviews } from "@/data/reviewData";
import Hr from "@/components/place/Hr/Hr";
import Hr2 from "@/components/place/Hr2/Hr2";

const BottomSheet = dynamic(() => import("@/components/common/BottomSheet/BottomSheet"), { ssr: false });

const PlacePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [isLocationPermissionGranted, setIsLocationPermissionGranted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <Container>
      <Banner />
      <ImagesSection>
        <ImageWrapper onClick={() => setIsBottomSheetOpen(true)}>
          <Image
            src="/assets/place/banner3.png"
            alt="내 주변 동반가능시설"
            width={270}
            height={119}
            style={{
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
          <OverlayText dark={false}>
            <div>내 주변 동반가능시설</div>
            <div>찾아보기</div>
          </OverlayText>
        </ImageWrapper>
        <ImageWrapper>
          <Image
            src="/assets/place/banner2.png"
            alt="성향별 추천 시설"
            width={270}
            height={119}
            style={{
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
          <OverlayText dark={true}>
            <div>성향별 추천 시설</div>
            <div>알아보기</div>
          </OverlayText>
        </ImageWrapper>
      </ImagesSection>

      <CategorySection>
        <h2>카테고리별 <span>인기 리뷰</span> 🔥</h2>
        <CategorySelector
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          hoveredCategory={hoveredCategory}
          setHoveredCategory={setHoveredCategory}
        />
        <Hr />
        <ReviewList reviews={reviews} />
      </CategorySection>
      <Hr2 />
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
      {isBottomSheetOpen && (
        <BottomSheet
          title={Permission.args.title}
          content={Permission.args.content}
          cancelText={Permission.args.cancelText}
          confirmText={Permission.args.confirmText}
          onClose={() => setIsBottomSheetOpen(false)}
          onConfirm={() => {
            setIsLocationPermissionGranted(true);
            setIsBottomSheetOpen(false);
            router.push(`place/placesearch?permissionGranted=true`);
          }}
          
        />
      )}
    </Container>
  );
};

export default PlacePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f8f8;
`;

const ImagesSection = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
`;

const ImageWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const OverlayText = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "dark",
})`
  position: absolute;
  top: 10px;
  left: 8px;
  font-size: 16px;
  font-weight: bold;
  color: ${({ dark }) => (dark ? "white" : "black")};
  padding: 5px 10px;
`;

const CategorySection = styled.section`
  margin-top: 10px;
  background: #fff;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid #ababab;
  h2 {
    margin-bottom: 20px;
    font-size: 20px;
  }
  h2 span {
    color: #0019f4;
  }
`;

const FooterWrapper = styled.div`
  margin-top: auto;
  width: 100%;
  margin-left: -20px;
  padding: 10px 0;
`;
