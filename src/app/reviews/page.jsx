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
import theme from "@/styles/theme";

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

  background-color: ${theme.colors.defaultBackground};
`;

