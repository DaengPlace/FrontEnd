import React from "react";
import styled from "styled-components";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const PlaceInfo = ({ isLiked, toggleLike, address, handleAddressClick }) => {
  return (
    <>
      <CategoryBadge>반려동물용품점</CategoryBadge>
      <PlaceName>간식곳간</PlaceName>
      <HeartIconContainer onClick={toggleLike}>
        {isLiked ? <Favorite /> : <FavoriteBorder />}
      </HeartIconContainer>
      <Address onClick={handleAddressClick}>{address}</Address>
      <OpeningHours>운영시간 11:00 ~ 20:00 | 월요일 휴무</OpeningHours>
      <Features>
        주차 가능 | 실내공간 | 무게 제한 없음 | 애견 동반 요금 없음
      </Features>
      <hr style={{ marginBottom: "10px" }} />
    </>
  );
};

export default PlaceInfo;

const CategoryBadge = styled.div`
  display: inline-block;
  background: ${({ theme }) => theme.colors.tertiary};
  color: #ffffff;
  border-radius: 10px;
  font-weight: bold;
  margin-bottom: 12px;
  height: 24px;
  font-size: 12px;
  width: 114px;
  text-align: center;
  padding: 4px 0px;
`;

const PlaceName = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const HeartIconContainer = styled.div`
  position: absolute;
  right: 40px;
  top: 350px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  z-index: 10;

  svg {
    font-size: 30px;
    color: ${({ isLiked }) => (isLiked ? "red" : "#000000")};
    transition: transform 0.2s ease, color 0.2s ease;
  }

  &:hover svg {
    transform: scale(1.2);
  }
`;

const Address = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.divider};
  margin-bottom: 20px;
  cursor: pointer;
`;

const OpeningHours = styled.p`
  font-size: 14px;
  color: #000000;
  margin-bottom: 12px;
`;

const Features = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.divider};
  margin-bottom: 20px;
`;
