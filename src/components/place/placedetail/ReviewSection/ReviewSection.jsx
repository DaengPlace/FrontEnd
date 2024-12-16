import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ReviewSection = ({ placeId, rating, reviewCount, reviews}) => {
    const router = useRouter();
    
    const handleViewAllClick = () => {
        router.push(`/reviews?placeId=${placeId}`); 
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const kstOffset = 9 * 60 * 60 * 1000;
      const kstDate = new Date(date.getTime() + kstOffset);

      return kstDate.toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
      });
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
            <Rating>{rating.toFixed(1)}</Rating>
            <ReviewCount>리뷰 {reviewCount}</ReviewCount>
            <ViewAllButton onClick={handleViewAllClick}>
                전체보기 ({reviewCount}) &gt;
            </ViewAllButton>
        </RatingContainer>
        <ReviewContainer>
            <ReviewSlider>
            {reviews.map((review) => (
                <Review key={review.reviewId}>
                <Content>
                    <ReviewHeader>
                    <StarContainer>
                        {Array.from({ length: Math.round(review.rating) }, (_, i) => (
                        <Star key={i}>⭐</Star>
                        ))}
                        <ReviewDate>{formatDate(review.createdAt)}</ReviewDate>
                    </StarContainer>
                    </ReviewHeader>
                    <ReviewText>{review.content}</ReviewText>
                </Content>
                <ImageContainer>
                  {review.image && review.image.length > 0 && (
                    <Image
                      src={review.image[0]} 
                      width={90}
                      height={90}
                      alt="리뷰 이미지"
                      style={{ objectFit: "cover", borderRadius: "10px" }}
                    />
                  )}
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
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.defaultBackground};
  padding: 10px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.divider};
  width: 293px;
  min-height: 120px;
  position: relative;
  
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  width: calc(100% - 100px);
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const StarContainer = styled.div`
  display: flex;
   margin-bottom: 5px;
`;

const Star = styled.div`
  margin-right: 5px;
  width:10px;
  height:10px;
`;

const ImageContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-top : 30px;
`;

const ReviewDate = styled.span`
  right: 1px;
  font-size: 13px;
  margin-left: 130px;
  margin-top: 5px;
  color: ${({ theme }) => theme.colors.divider};
  white-space: nowrap;
  text-align: right;
  display: inline; 
`;

const ReviewText = styled.p`
  line-height: 1.4;
  margin-top: 10px; 
  max-height: 80px; 
  overflow-wrap: break-word; 
  text-overflow: ellipsis;
  font-size: 13px;
  color: #000000;

`;

const ReviewImage = styled(Image)`
  object-fit: cover;
  border-radius: 10px;
  margin-top: 30px;
`;
const ImageWrapper = styled.div`
  width: 90px;
  height: 90px;
  overflow: hidden;
  border-radius: 10px;
  margin-right: 8px;
  position: relative;
`;
