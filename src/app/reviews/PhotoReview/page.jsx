"use client";

import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import HeaderSection from "@/components/reviews/PhotoReview/HeaderSection/HeaderSection";
import SubHeader from "@/components/reviews/PhotoReview/SubHeader/SubHeader";
import PhotoGrid from "@/components/reviews/PhotoReview/PhotoGrid/PhotoGrid";
import ScrollToTop from "@/components/reviews/PhotoReview/ScrollToTop/ScrollToTop";

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
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
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
      <HeaderSection />
      <Container ref={containerRef}>
        <SubHeader category="반려동물용품점" title="간식곳간" photoCount={reviews.length} />
        <PhotoGrid reviews={reviews} onImageClick={handleImageClick} />
      </Container>
      <ScrollToTop show={showScrollToTop} onClick={scrollToTop} />
    </>
  );
};

export default PhotoReviewPage;

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
