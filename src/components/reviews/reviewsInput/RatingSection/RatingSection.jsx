import React, { useState } from "react";
import styled from "styled-components";

const RatingSection = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (index, isHalf) => {
    const newRating = index + (isHalf ? 0.5 : 1); 
    onRatingChange(newRating);
  };

  const handleStarHover = (index, isHalf) => {
    setHoverRating(index + (isHalf ? 0.5 : 1)); 
  };

  const handleStarLeave = () => {
    setHoverRating(0); 
  };

  return (
    <Section>
      <SubTitle>별점 선택</SubTitle>
      <Rating>
        <RatingContent>
          <StarRatingText>
            <BigText>{rating.toFixed(1)}</BigText>
            <SmallText>/ 5</SmallText>
          </StarRatingText>
        </RatingContent>
        <Stars>
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              onClick={() => handleStarClick(index)}
              onMouseEnter={() => handleStarHover(index)}
              onMouseLeave={handleStarLeave}
              $isActive={index < (hoverRating || rating)} 
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={index + 0.5 <= (hoverRating || rating) ? "yellow" : "none"} 
                stroke={index + 0.5 <= (hoverRating || rating) ? "yellow" : "black"} 
                strokeWidth="2"
              >
                <path d="M12 .587l3.668 7.568L24 9.75l-6 5.922 1.434 8.567L12 19.077l-7.434 5.162L6 15.672 0 9.75l8.332-1.595z" />
              </svg>
            </Star>
          ))}
        </Stars>
      </Rating>
    </Section>
  );
};

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

const StarRatingText = styled.div`
  display: flex;
  align-items: baseline;
`;

const BigText = styled.span`
  font-size: 32px;
  font-weight: bold;
  line-height: 1;
  color: ${({ theme }) => theme.colors.primary};
`;

const SmallText = styled.span`
  font-size: 16px;
  color: #ababab;
  margin-left: 4px;
`;

const Stars = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -10px;
  gap: 8px;
`;

const Star = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "$isActive",
})`
  width: 48px;
  height: 48px;
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
    transition: fill 0.3s ease, stroke 0.3s ease; 
  }

  &:hover svg {
    fill: yellow;
    stroke: yellow;
  }
`;
