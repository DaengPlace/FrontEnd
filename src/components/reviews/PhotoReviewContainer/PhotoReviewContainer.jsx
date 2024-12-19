import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronRight } from "@styled-icons/bootstrap/ChevronRight";

const PhotoReviewContainer = ({ reviews, placeId }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/reviews/PhotoReview?placeId=${placeId}`);
  };

  const processedReviews = reviews.map((review) => ({
    ...review,
    imageUrls: review.imageUrls?.slice(0, 4) || ["/assets/image.png"],
  }));

  return (
    <Container>
      <SectionHeader>
        <h3 style={{marginTop: "5px"}}>포토/비디오 리뷰 모아보기</h3>
        <ViewMore onClick={handleClick}>더보기 <ChevronRight style={{marginBottom: "2px"}} width={12} height={12} /></ViewMore>
      </SectionHeader>
      <PhotoList>
        {processedReviews.slice(0, 3).map((review) => (
          <PhotoGroup key={review.reviewId}>
            {review.imageUrls.map((url, index) => (
              <PhotoWrapper key={index}>
                <Image
                  src={url}
                  alt={`리뷰 이미지 ${review.reviewId} - ${index}`}
                  width={100}
                  height={100}
                  style={{ borderRadius: "10px" }}
                  priority
                />
              </PhotoWrapper>
            ))}
          </PhotoGroup>
        ))}
      </PhotoList>
    </Container>
  );
};

export default PhotoReviewContainer;

const Container = styled.div`
  margin: 20px 0;
  height: 170px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
  margin-left: 10px;
  padding: 10px 20px;
  border-radius: 20px;
  margin-right: 10px;
  background-color: white
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ViewMore = styled.button`
  background: none;
  border: none;
  color: #000000;
  cursor: pointer;
`;

const PhotoList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;
const PhotoGroup = styled.div`
  display: flex;
  gap: 8px;
`;
const PhotoWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  overflow: hidden;
`;
