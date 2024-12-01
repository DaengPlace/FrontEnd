import React from "react";
import styled from "styled-components";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollToTopButton = ({ onClick }) => (
  <Button onClick={onClick}>
    <KeyboardArrowUpIcon sx={{ fontSize: 36, marginBottom: "-4px" }} />
    <span>맨위로</span>
  </Button>
);

export default ScrollToTopButton;

const Button = styled.button`
  position: fixed;
  bottom: 70px; 
  right: calc(50% - 290px); 
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
  z-index: 9999;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
  
  span {
    margin-bottom: 10px;
  };
`;
