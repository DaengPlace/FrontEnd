import React from "react";
import Image from "next/image";
import styled from "styled-components";

const ReviewList = ({ reviews }) => {
  return (
    <Container>
      {reviews.map((review) => (
        <ReviewCard key={review.id}>
          <ReviewNumber>{review.id}</ReviewNumber>
          <ReviewContent>
            <CategoryBadge>{review.category}</CategoryBadge>
            <ReviewTitle>{review.title}</ReviewTitle>
            <ReviewInfo>
              {review.author} | {review.date} 작성
            </ReviewInfo>
            <ReviewText>{review.review}</ReviewText>
            <hr style={{width: "140%", marginLeft:"-30px", marginTop:"15px"}}></hr>
          </ReviewContent>
          <ReviewImageWrapper>
            <StyledImage 
              src={review.image}
              alt={`리뷰 이미지 ${review.id}`}
              width={80}
              height={80}
            />
          </ReviewImageWrapper>
        </ReviewCard>
      ))}
    </Container>
  );
};

// 스타일 정의
const Container = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const ReviewCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
  padding: 15px;
  position: relative;
`;

const ReviewNumber = styled.div`
  position: absolute;
  top: 50px;
  left: 10px;
  color: #0019f4;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ReviewContent = styled.div`
  margin-left: 20px;
  flex: 1;
  min-width: 0;
  gap: 10px;
`;

const CategoryBadge = styled.span`
  display: inline-block;
  padding: 3px;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  background: #01003f;
  border-radius: 20px;
  margin-right: 10px;
  text-align: center;
  width: 114px;
  height: 24px;
`;

const ReviewTitle = styled.span`
  font-weight: bold;
`;

const ReviewInfo = styled.p`
  font-size: 16px;
  color: #ababab;
  margin-top: 5px;
`;

const ReviewText = styled.p`
  font-size: 16px;
  color: #000;
  font-weight: bold;
  margin-top: 10px;
`;

const ReviewImageWrapper = styled.div`
  border-radius: 10px;
  overflow: hidden;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
`;

export default ReviewList;
