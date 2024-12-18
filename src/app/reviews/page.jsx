"use client";
import React, { useState, useEffect, useRef, Suspense } from "react";
import styled from "styled-components";
import { useSearchParams } from "next/navigation";
import Header from "@/components/common/Header/Header";
import PageHeader from "@/components/reviews/PageHeader/PageHeader";
import ReviewSummary from "@/components/reviews/ReviewSummary/ReviewSummary";
import TagSection from "@/components/reviews/TagSection/TagSection";
import PhotoReviewContainer from "@/components/reviews/PhotoReviewContainer/PhotoReviewContainer";
import ReviewList from "@/components/reviews/ReviewList/ReviewList";
import { WithMapIcon } from "@/components/common/Header/Header.stories";
import { fetchPlaceReviews, fetchPlaceDetails } from "@/apis/review/reviewApi";

const ReviewPage = () => {
  return (
    <Suspense>
      <ActualReviewPage />
    </Suspense>
  )
}

  const ActualReviewPage = () => {
  const searchParams = useSearchParams();
  const placeId = searchParams.get("placeId");
  const [reviews, setReviews] = useState([]);
  const [placeData, setPlaceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const containerRef = useRef(null);


  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const reviewsData = await fetchPlaceReviews(placeId);
        setReviews(reviewsData);

        const placeDetails = await fetchPlaceDetails(placeId);
        setPlaceData(placeDetails);

      } catch (error) {
        setError(error.message || "Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    if (placeId) {
      loadData();
    } else {
      console.warn("placeId is undefined.");
    }
  }, [placeId]);

  return (
    <>
        <Header
          title="리뷰 전체보기"
          showHomeIcon={WithMapIcon.args.showHomeIcon}
          showFavoriteIcon={WithMapIcon.args.showFavoriteIcon}
          showMapIcon={WithMapIcon.args.showMapIcon}
        />
      <Container ref={containerRef}>
        <PageHeader placeName={placeData?.name || "장소 이름 없음"}
          category={placeData?.category || "카테고리 없음"} reviewCount={reviews.length} />
        <ReviewSummary
          averageRating={
            reviews.reduce((sum, review) => sum + review.rating, 0) /
            (reviews.length || 0.0)
          }
          reviewCount={reviews.length}
        />
        <TagSection reviews={reviews}/>
        <PhotoReviewContainer reviews={reviews} placeId={placeId} />
        <ReviewList reviews={reviews} setReviews={setReviews}/>
      </Container>
    </>
  );
};


export default ReviewPage;

const Container = styled.div`
  padding: 16px;
  padding-top: 70px;
  height: 100vh;
  overflow-y: auto;
  -ms-overflow-style: none; 
  scrollbar-width: none; 
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 20px;
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
