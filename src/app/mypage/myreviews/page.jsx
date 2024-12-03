"use client";

import React from "react";
import styled from "styled-components";
import Header from "@/components/common/Header/Header";
import { OnlyHomeIcon } from "@/components/common/Header/Header.stories";
import { reviews } from "@/data/reviewData";
import ReviewCard from "@/components/mypage/myreviews/ReviewCard/ReviewCard";

const MyReviews = () => {
  return (
    <Container>
      <Header
        title="리뷰 목록"
        showFavoriteIcon={OnlyHomeIcon.args.showFavoriteIcon}
        showMapIcon={OnlyHomeIcon.args.showMapIcon}
        showHomeIcon={OnlyHomeIcon.args.showHomeIcon}
        backbuttonPath="/mypage"
      />
      <ReviewsList>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </ReviewsList>
    </Container>
  );
};

export default MyReviews;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.defaultBackground};
`;

const ReviewsList = styled.div`
  width: 90%;
  margin-top: 70px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;