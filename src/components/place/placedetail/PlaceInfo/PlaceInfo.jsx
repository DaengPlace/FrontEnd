import React from "react";
import styled from "styled-components";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const PlaceInfo = ({
    isLiked,
    toggleLike,
    address,
    handleAddressClick,
    category,
    placeName,
    openingHours,
    features,
  }) => {
  return (
    <>
      <CategoryBadge>{category}</CategoryBadge>
      <PlaceName>{placeName}</PlaceName>
      <HeartIconContainer isliked={isLiked} onClick={toggleLike}>
        {isLiked ? <Favorite /> : <FavoriteBorder />}
      </HeartIconContainer>
      <Address onClick={handleAddressClick}>{address}</Address>
      <OpeningHours>{openingHours}</OpeningHours>
      <Features>{features}</Features>
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
  font-size: 12px;
  text-align: center;
  padding: 5px 10px; 
  white-space: nowrap; 
  margin-bottom: 8px; 
  align-self: flex-start;
`;

const PlaceName = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const HeartIconContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !["hovered", "isliked"].includes(prop),
})`
  position: absolute;
  right: 40px;
  top: 350px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  z-index: 10;

  svg {
    font-size: 30px;
    color: ${({ isliked }) => (isliked ? "red" : "#000000")};
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
