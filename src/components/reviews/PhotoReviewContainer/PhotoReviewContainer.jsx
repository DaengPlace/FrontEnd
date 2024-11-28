import React from "react";
import styled from "styled-components";
import Image from "next/image";

const PhotoReviewContainer = ({ reviews }) => {
  return (
    <Container>
      <SectionHeader>
        <h3>포토/비디오 리뷰 모아보기</h3>
        <ViewMore>더보기 &gt;</ViewMore>
      </SectionHeader>
      <PhotoList>
        {reviews.slice(0, 5).map((review) => (
          <PhotoWrapper key={review.id}>
            <Image
              src={review.image}
              alt={`리뷰 이미지 ${review.id}`}
              width={100}
              height={100}
              style={{ borderRadius: "10px" }}
              priority 
            />
          </PhotoWrapper>
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
  padding: 10px;
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
