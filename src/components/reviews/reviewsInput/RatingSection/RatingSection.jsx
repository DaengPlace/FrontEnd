import React from "react";
import styled from "styled-components";
import Image from "next/image";

const RatingSection = () => (
  <Section>
    <SubTitle>별점 선택</SubTitle>
    <Rating>
      <RatingContent>
        <StarImage src="/assets/star.png" alt="별 이미지" width={20} height={20} />
        <RatingText>
          <BigText>5.0</BigText>
          <SmallText>/ 5</SmallText>
        </RatingText>
      </RatingContent>
      <Stars>
        <Star>⭐</Star>
        <Star>⭐</Star>
        <Star>⭐</Star>
        <Star>⭐</Star>
        <Star>⭐</Star>
      </Stars>
    </Rating>
  </Section>
);

export default RatingSection;

const Section = styled.div`
  margin-bottom: 20px;
  margin-left: 10px;
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: 20px;
  padding: 10px 20px;
`;

const SubTitle = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 5px;
  text-align: left;
`;

const Rating = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

const RatingContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px; 
`;

const StarImage = styled(Image)`
  display: inline-block;
`;

const RatingText = styled.div`
  display: flex;
  align-items: baseline; 
  margin-right: 10px;
`;

const BigText = styled.span`
  font-size: 32px; 
  font-weight: bold;
  line-height: 1; 
  color : ${({ theme }) => theme.colors.primary};
`;

const SmallText = styled.span`
  font-size: 16px;
  color: #ABABAB;
  margin-left: 4px; 
`;

const Stars = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -10px;
`;

const Star = styled.span`
  text-align: center;
  font-size: 48px;
`;
