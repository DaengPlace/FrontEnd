import React from "react";
import Image from "next/image";
import styled from "styled-components";

const ReviewList = ({ reviews }) => {
  const NativeDate = global.Date;
  const formatDate = (dateString) => {
    const date = new NativeDate(dateString); 
    if (isNaN(date)) {
      return "Invalid date";
    }
    const kstOffset = 9 * 60 * 60 * 1000; 
    const localDate = new NativeDate(date.getTime() + kstOffset);
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, "0");
    const day = String(localDate.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };
  const topReviews = reviews.slice(0, 3);
  return (
    <Container>
      {topReviews.map((review, index) => (
        <ReviewCard key={review.reviewId}>
          <ReviewNumber>{index + 1}</ReviewNumber>
          <ReviewContent>
            <CategoryBadge>{review.category}</CategoryBadge>
            <ReviewTitle>{review.placeName}</ReviewTitle>
            <ReviewInfo>
              {review.memberName} | {formatDate(review.createdAt)} 작성
              <Rating>
                {Array.from({ length: Math.round(review.rating) }, (_, i) => (
                  <Star key={i}>⭐</Star>
                ))}
              </Rating> 
            </ReviewInfo>
            <ReviewText>{review.content}</ReviewText>
            {index !== reviews.length - 1 && (
              <hr
                style={{
                  width: "138%",
                  marginLeft: "-35px",
                  marginTop: "15px",
                  color: "#ABABAB",
                }}
              />
            )}
          </ReviewContent>
          <ReviewImageWrapper>
            <StyledImage
              src="/assets/image.png"
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
  width: 100%;
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
  padding: 5px 10px; 
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  background: #01003f;
  border-radius: 20px;
  text-align: center;
  line-height: 1; 
  white-space: nowrap; 
  margin-right: 10px;
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
