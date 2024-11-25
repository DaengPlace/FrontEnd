import React from "react";
import Image from "next/image";
import styled from "styled-components";

const ReviewList = ({ reviews }) => {
  return (
    <Container>
      {reviews.map((review, index) => (
        <ReviewCard key={review.id}>
          <ReviewNumber>{review.id}</ReviewNumber>
          <ReviewContent>
            <CategoryBadge>{review.category}</CategoryBadge>
            <ReviewTitle>{review.title}</ReviewTitle>
            <ReviewInfo>
              {review.author} | {review.date} 작성
              <Rating>
                {Array.from({ length: Math.round(review.rating) }, (_, i) => (
                  <Star key={i}>⭐</Star>
                ))}
              </Rating> 
            </ReviewInfo>
            <ReviewText>{review.review}</ReviewText>
            {index !== reviews.length - 1 && (
              <hr
                style={{
                  width: "138%",
                  marginLeft: "-30px",
                  marginTop: "15px",
                  color: "#ABABAB",
                }}
              />
            )}
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
  gap: 10px;
  padding: 5px 15px;
  position: relative;
`;

const ReviewNumber = styled.div`
  position: absolute;
  top: 35px;
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
  gap: 5px;
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
  display: flex;
  align-items: center;
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
const Rating = styled.span`
  margin-left: 10px;
  display: flex;
`;

const Star = styled.span`
  color: #f4c542; 
  font-size: 10px;
`;

export default ReviewList;
