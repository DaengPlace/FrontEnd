"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import styled from "styled-components";
import HeaderSection from "@/components/reviews/ReviewsDetail/HeaderSection/HeaderSection";
import SubHeader from "@/components/reviews/ReviewsDetail/SubHeader/SubHeader";
import ReviewCard from "@/components/reviews/ReviewsDetail/ReviewCard/ReviewCard";

const ReviewDetailPage = () => {
  const [likedReviews, setLikedReviews] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const accessToken = localStorage.getItem("accessToken");
  const reviewId = searchParams.get("reviewId");
  const placeId = searchParams.get("placeId");
  console.log("Review ID:", reviewId, "Place ID:", placeId);
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
    const fetchReviewDetail = async () => {
      try {
        const response = await axios.get(`https://api.daengplace.com/reviews/${placeId}/and/${reviewId}`,
          {
            headers: { Authorization : `Bearer ${accessToken}` },
          }
        );
        console.log("Review Detail:", response.data.data);
        setReview(response.data.data);
        console.log("Review Data:", review.imageUrls);
        setLoading(false);
      } catch (error) {
        console.error("리뷰 상세 정보를 가져오는 데 실패했습니다:", error);
        setLoading(false);
      }
    };

    const fetchPlaceDetail = async () => {
      try {
        const response = await axios.get(`https://api.daengplace.com/places/${placeId}`);
        setPlace(response.data.data); 
      } catch (error) {
        console.error("장소 정보를 가져오는 데 실패했습니다:", error);
      }
    };

    if (reviewId && placeId) {
      fetchReviewDetail();
      fetchPlaceDetail(); 
    }
  }, [reviewId, placeId]);

  return (
    <>
      <HeaderSection />
      <SubHeader category={place?.category || "카테고리 없음"} title={place?.name || "제목 없음"} />
      <Container>
        <ReviewCard
          review={review}
          likedReviews={likedReviews}
          toggleLike={toggleLike}
          isOpen={isOpen}
          toggleDropdown={toggleDropdown}
          accessToken={accessToken}
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
