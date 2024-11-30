"use client";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { reviews } from "@/data/reviewData";
import Header from "@/components/common/Header/Header";
import PageHeader from "@/components/reviews/PageHeader/PageHeader";
import ReviewSummary from "@/components/reviews/ReviewSummary/ReviewSummary";
import TagSection from "@/components/reviews/TagSection/TagSection";
import PhotoReviewContainer from "@/components/reviews/PhotoReviewContainer/PhotoReviewContainer";
import ReviewList from "@/components/reviews/ReviewList/ReviewList";
import { WithMapIcon } from "@/components/common/Header/Header.stories";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ReviewPage = () => {
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const containerRef = useRef(null);

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
      <HeaderWrapper>
        <Header
          title="리뷰 전체보기"
          showCloseButton={true}
        />
      </HeaderWrapper>
      <Container ref={containerRef}>
        <PageHeader title="92버터샵" reviewCount={reviews.length} />
        <ReviewSummary
          averageRating={averageRating}
          reviewCount={reviews.length}
        />
        <TagSection />
        <PhotoReviewContainer reviews={reviews} />
        <ReviewList reviews={reviews} />
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

export default ReviewPage;

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: 1000;
  background-color: white;
`;

const Container = styled.div`
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
