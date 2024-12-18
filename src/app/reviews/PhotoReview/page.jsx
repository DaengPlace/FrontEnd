"use client";

import React, { useRef, useEffect, useState, Suspense } from "react";
import styled from "styled-components";
import { useRouter, useSearchParams } from "next/navigation";
import HeaderSection from "@/components/reviews/PhotoReview/HeaderSection/HeaderSection";
import SubHeader from "@/components/reviews/PhotoReview/SubHeader/SubHeader";
import PhotoGrid from "@/components/reviews/PhotoReview/PhotoGrid/PhotoGrid";
import ScrollToTop from "@/components/reviews/PhotoReview/ScrollToTop/ScrollToTop";
import { axiosInstance } from "@/apis/axiosInstance";

const PhotoReviewPage = () => {
  return (
    <Suspense>
      <ActualPhotoReviewPage />
    </Suspense>
  )
}

const ActualPhotoReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const containerRef = useRef(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const placeId = searchParams.get("placeId");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (!placeId) return;

        const response = await axiosInstance.get(`/reviews/places/${placeId}`);
        const reviewsData = response.data.data.map((review) => ({
          reviewId: review.reviewId, 
          imageUrls: review.imageUrls || [], 
        }));
  
        setReviews(reviewsData);
        console.log(reviewsData)
        const placeResponse = await axiosInstance.get(`/places/${placeId}`);
        setCategory(placeResponse.data.data.category);
        setName(placeResponse.data.data.name);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [placeId]);

  const handleImageClick = (reviewId, placeId) => {
    router.push(`/reviews/ReviewDetail?reviewId=${reviewId}&placeId=${placeId}`);
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
        <SubHeader category={category} name={name} photoCount={reviews.length} />
        <PhotoGrid reviews={reviews} placeId={placeId} onImageClick={handleImageClick} />
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
  height: 100vh;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
