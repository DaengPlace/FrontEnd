"use client";
import React, { useState, useEffect } from "react";
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

  const scrollToTop = () => {
    const container = document.getElementById("scrollable-container");
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  
  useEffect(() => {
    const container = document.getElementById("scrollable-container");
    const handleScroll = () => {
      if (container) {
        const scrollTop = container.scrollTop;
        if (scrollTop > 10) {
          setShowScrollToTop(true);
        } else {
          setShowScrollToTop(false);
        }
      }
    };

    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <FixedHeader>
        <Header
          title="리뷰 전체보기"
          showFavoriteIcon={WithMapIcon.args.showFavoriteIcon}
          showMapIcon={WithMapIcon.args.showMapIcon}
        />
      </FixedHeader>
      <Container id="scrollable-container">
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

const FixedHeader = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const Container = styled.div`
  overflow-y: auto;
  height: calc(100vh - 70px);
  padding-bottom: 70px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  padding : 16px;
`;

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 80px;
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
