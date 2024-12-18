import React, { useState, useEffect } from "react";
import styled from "styled-components";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollToTopButton = () => {

  const scrollToTop = () => {
    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <ButtonContainer onClick={scrollToTop}>
      <KeyboardArrowUpIcon sx={{ fontSize: 36, marginBottom:"-10px"}} />
      <span>맨위로</span>
    </ButtonContainer>
  );
};

export default ScrollToTopButton;

const ButtonContainer = styled.button`
  position: fixed;
  bottom: ${({ bottom }) => `${bottom}px`}; 
  right: calc(50% - 280px); 
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.defaultBackground};
  color: ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 1000;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
  
  span {
    margin-bottom: 10px;
  }

  @media {
    bottom: 25px;
    right: 10px;
    width: 50px;
    height: 50px;

    span {
      font-size: 10px; /* 글자 크기 축소 */
    }
  }

  @media (min-width: 601px) {
    right: calc(50% - 280px); /* 버튼이 중앙에서 280px 오른쪽에 위치하도록 */
  }
}`