"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import styled from "styled-components";
import HeaderSection from "@/components/reviews/ReviewsDetail/HeaderSection/HeaderSection";
import SubHeader from "@/components/reviews/ReviewsDetail/SubHeader/SubHeader";
import ReviewCard from "@/components/reviews/ReviewsDetail/ReviewCard/ReviewCard";
import {
  fetchReviewDetail,
  fetchPlaceDetails,
} from "@/apis/review/reviewApi";


const ReviewDetailPage = () => {
  const [likedReviews, setLikedReviews] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const reviewId = searchParams.get("reviewId");
  const placeId = searchParams.get("placeId");
  const [place, setPlace] = useState(null); 
  const [review, setReview] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleLike = (id) => {
    setLikedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const reviewData = await fetchReviewDetail(placeId, reviewId);
        setReview(reviewData);

        const placeData = await fetchPlaceDetails(placeId);
        setPlace(placeData);

        setLoading(false);
      } catch (error) {
        console.error("Failed to load data:", error);
        setLoading(false);
      }
    };

    if (reviewId && placeId) {
      loadData();
    }
  }, [reviewId, placeId]);

  return (
    <>
      <HeaderSection />
      <SubHeader category={place?.category || "카테고리 없음"} title={place?.name || "제목 없음"} />
      <Container>
        <ReviewCard
          review={review}
          isOpen={isOpen}
          toggleDropdown={toggleDropdown}
          setReview={setReview}
        />
      </Container>
    </>
  );
};

export default ReviewDetailPage;

const Container = styled.div`
  margin-bottom: 20px;
  padding: 20px;
`;
