import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { reviews } from "@/data/reviewData";
import { useRouter } from "next/navigation";

const ReviewSection = () => {
    const router = useRouter();

  
    const handleViewAllClick = () => {
        router.push("/reviews"); 
    };
    return (
        <>
        <RatingContainer>
            <StarIcon
            src="/assets/star.png"
            alt="별"
            width={20}
            height={20}
            priority
            />
            <Rating>
            {(
                reviews.reduce((sum, review) => sum + review.rating, 0) /
                reviews.length
            ).toFixed(1)}
            </Rating>
            <ReviewCount>리뷰 {reviews.length}</ReviewCount>
            <ViewAllButton onClick={handleViewAllClick}>
                전체보기 ({reviews.length}) &gt;
            </ViewAllButton>
        </RatingContainer>
        <ReviewContainer>
            <ReviewSlider>
            {reviews.map((review) => (
                <Review key={review.id}>
                <Content>
                    <ReviewHeader>
                    <StarContainer>
                        {Array.from({ length: Math.round(review.rating) }, (_, i) => (
                        <Star key={i}>⭐</Star>
                        ))}
                    </StarContainer>
                    </ReviewHeader>
                    <ReviewText>{review.review}</ReviewText>
                </Content>
                <ImageContainer>
                    <ReviewDate>{review.date}</ReviewDate>
                    <ReviewImage
                    src={review.image}
                    alt={`Review ${review.id}`}
                    width={70}
                    height={70}
                    priority
                    />
                </ImageContainer>
                </Review>
            ))}
            </ReviewSlider>
        </ReviewContainer>
        </>
    );
    };

export default ReviewSection;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  position: relative;
`;

const StarIcon = styled(Image)`
  margin-right: 8px;
`;

const Rating = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin-right: 8px;
  color: ${({ theme }) => theme.colors.primary};
`;

const ReviewCount = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.divider};
`;

const ViewAllButton = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  left: 63%;
  top: 3px;
  color: #000000;
  cursor: pointer;
  padding: 0;
`;

const ReviewContainer = styled.div`
  overflow: hidden;
  margin-bottom: 20px;
`;

const ReviewSlider = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 10px;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Review = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.defaultBackground};
  padding: 10px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.divider};
  width: 293px;
  height: 117px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const StarContainer = styled.div`
  display: flex;
  margin-top: -40px;
`;

const Star = styled.div`
  margin-right: 5px;
  width:10px;
  height:10px;
`;

const ImageContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ReviewDate = styled.span`
  position: absolute;
  top: 5px;
  right: 1px;
  font-size: 13px;
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.divider};
  z-index: 10;
`;

const ReviewText = styled.p`
  font-size: 13px;
  color: #000000;
`;

const ReviewImage = styled(Image)`
  object-fit: cover;
  border-radius: 10px;
  margin-top: 30px;
`;