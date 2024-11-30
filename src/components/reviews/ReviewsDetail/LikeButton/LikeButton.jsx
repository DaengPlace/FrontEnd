"use client";

import React from "react";
import styled from "styled-components";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const LikeButton = ({ isLiked, onClick }) => {
  return (
    <Button onClick={onClick}>
      {isLiked ? <FavoriteIcon style={{ color: "red" }} /> : <FavoriteBorderIcon style={{ color: "#ccc" }} />}
    </Button>
  );
};

export default LikeButton;

const Button = styled.div`
  cursor: pointer;
  margin-left: auto;
  &:hover svg {
    transform: scale(1.2);
  }
`;
