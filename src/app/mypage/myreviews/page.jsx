"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "@/components/common/Header/Header";
import { OnlyHomeIcon } from "@/components/common/Header/Header.stories";
import ReviewCard from "@/components/mypage/myreviews/ReviewCard/ReviewCard";
import { getReviews } from "@/apis/reviews/getReviews";

const MyReviews = () => {

  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getReviews();
        setReviews(response.data);
      } catch (error) {
        console.error("리뷰 데이터를 가져오는 데 실패하였습니다 : ", error);
        setError("리뷰 데이터를 불러올 수 없습니다.");
      }
    };
    fetchReviews();
  }, []);

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
        {error ? (
          <Message>{error}</Message>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard key={review.reviewId} review={review} />
          ))
        ) : (
          <Message>등록된 리뷰가 없습니다.</Message>
        )}
      </ReviewsList>
    </Container>
  );
};

export default MyReviews;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100vh;
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

const Message = styled.div`
  margin: 20px;
  font-size: 16px;
  text-align: center;
  color: #888;
`;