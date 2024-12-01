"use client";

import React, { useState } from "react";
import styled from "styled-components";
import HeaderSection from "@/components/reviews/ReviewsDetail/HeaderSection/HeaderSection";
import SubHeader from "@/components/reviews/ReviewsDetail/SubHeader/SubHeader";
import ReviewCard from "@/components/reviews/ReviewsDetail/ReviewCard/ReviewCard";

const ReviewDetailPage = () => {
  const [likedReviews, setLikedReviews] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const toggleLike = (id) => {
    setLikedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const review = {
    id: 1,
    category: "반려동물용품점",
    title: "간식곳간",
    author: "뽀삐엄마",
    date: "2024.11.01",
    rating: 5,
    image: "/assets/image.png",
    review: `
      야외 공간이 넓어서 뛰어놀기 참 좋네요!
      재방문 의사 100% 입니다^^
      음료 종류도 다양하고 아이들 간식도 정말 다양해요 ㅎㅎ
    `,
  };

  return (
    <>
      <HeaderSection />
      <SubHeader category={review.category} title={review.title} />
      <Container>
        <ReviewCard
          review={review}
          likedReviews={likedReviews}
          toggleLike={toggleLike}
          isOpen={isOpen}
          toggleDropdown={toggleDropdown}
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
