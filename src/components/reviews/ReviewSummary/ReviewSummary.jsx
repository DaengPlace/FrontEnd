import React from "react";
import styled from "styled-components";

const ReviewSummary = ({ averageRating, reviewCount }) => {
  return (
    <SummaryContainer>
      <Rating>
        ⭐ {averageRating.toFixed(1)}
      </Rating>
      <WriteReviewButton>리뷰 작성하기</WriteReviewButton>
    </SummaryContainer>
  );
};

export default ReviewSummary;

const SummaryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 10px;
`;

const Rating = styled.div`
  font-size: 40px;
  font-weight: bold;
`;

const WriteReviewButton = styled.button`
  padding: 5px 5px;
  background-color: ${({ theme }) => theme.colors.defaultBackground};
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
  width: 138px;
  height: 36px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
  margin-bottom: 0;
  margin-top: 10px;
  margin-right: 10px;
`;
