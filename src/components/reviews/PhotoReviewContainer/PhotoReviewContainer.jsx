import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PhotoReviewContainer = ({ reviews }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/reviews/PhotoReview");
  };

  // reviews 데이터 미리 처리하여 기본 이미지를 설정
  const processedReviews = reviews.map((review) => ({
    ...review,
    imageUrls: review.imageUrls?.length > 0 ? review.imageUrls : ["/assets/image.png"],
  }));

  return (
    <Container>
      <SectionHeader>
        <h3>포토/비디오 리뷰 모아보기</h3>
        <ViewMore onClick={handleClick}>더보기 &gt;</ViewMore>
      </SectionHeader>
      <PhotoList>
        {processedReviews.slice(0, 5).map((review) => (
          review.imageUrls[0] && ( // 이미지가 있는 경우에만 렌더링
            <PhotoWrapper key={review.reviewId}>
              <Image
                src={review.imageUrls[0]} // URL이 없으면 기본 이미지 사용
                alt={`리뷰 이미지 ${review.reviewId}`}
                width={100}
                height={100}
                style={{ borderRadius: "10px" }}
                priority
              />
            </PhotoWrapper>
          )
        ))}
      </PhotoList>
    </Container>
  );
};

export default PhotoReviewContainer;

const Container = styled.div`
  margin: 20px 0;
  height: 170px;
  border: 1px solid ${({ theme }) => theme.colors.divider};
  margin-left: 10px;
  padding: 10px 20px;
  border-radius: 20px;
  margin-right: 10px;
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
  margin-right: 20px;
`;

const PhotoList = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

const PhotoWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  overflow: hidden;
`;
