"use client";

import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header/Header";
import { WithMapIcon } from "@/components/common/Header/Header.stories";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Divider from "@/components/common/Divider/Divider";

const PhotoReviewPage = () => {
  const reviews = Array(50).fill("/assets/image.png"); 
  const containerRef = useRef(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const router = useRouter();

  const handleImageClick = (index) => {
    router.push(`/reviews/ReviewDetail?id=${index + 1}`);
  };

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: -50, behavior: "smooth" }); 
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        setShowScrollToTop(scrollTop > 10);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);


  return (
    <>
      <HeaderWrapper>
        <Header
          title="포토/비디오 리뷰 모아보기"
          showFavoriteIcon={WithMapIcon.args.showFavoriteIcon}
          showMapIcon={WithMapIcon.args.showMapIcon}
        />
      </HeaderWrapper>
      <Container ref={containerRef}>
        <SubHeader>
          <CategoryBadge>반려동물용품점</CategoryBadge>
          <Subtitle>간식곳간</Subtitle>
        </SubHeader>
        <Divider />
        <PhotoCount>포토 {reviews.length}개</PhotoCount>
        <PhotoGrid>
          {reviews.map((image, index) => (
            <PhotoWrapper key={index} onClick={() => handleImageClick(index)}>
              <Image
                src={image}
                alt={`리뷰 이미지 ${index + 1}`}
                width={300}
                height={300}
                style={{ borderRadius: "10px", objectFit: "cover" }}
                priority
              />
            </PhotoWrapper>
          ))}
        </PhotoGrid>
      </Container>
      {showScrollToTop && (
        <ScrollToTopButton onClick={scrollToTop}>
          <KeyboardArrowUpIcon sx={{ fontSize: 36, marginBottom: "-4px" }} />
          <span>맨위로</span>
        </ScrollToTopButton>
      )}
    </>
  );
};

export default PhotoReviewPage;

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: 1000;
  background-color: white;
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.defaultBackground};
  padding: 16px;
  padding-top: 70px;
  height: calc(100vh - 50px); 
  overflow-y: auto;
  -ms-overflow-style: none; 
  scrollbar-width: none; 
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SubHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const CategoryBadge = styled.div`
  display: inline-block;
  padding: 5px 10px; 
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  background: #01003f;
  border-radius: 10px;
  text-align: center;
  line-height: 1; 
  white-space: nowrap; 
`;

const Subtitle = styled.h2`
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const PhotoCount = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.divider};
  margin-bottom: 16px;
  font-weight: bold;
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px; 
`;

const PhotoWrapper = styled.div`
  width: 100%; 
  aspect-ratio: 1 / 1;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
  }
`;

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 90px;
  right: calc(50% - 280px); 
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.defaultBackground};
  color: ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 1000;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }

  span {
    margin-top: -4px;
  }
`;
