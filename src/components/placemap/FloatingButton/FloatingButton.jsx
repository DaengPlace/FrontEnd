"use client";
import React from "react";
import styled from "styled-components";
import ListAltIcon from "@mui/icons-material/ListAlt"; 

const FloatingButton = ({ onClick }) => (
  <FloatingButtonContainer>
    <ListButton onClick={onClick}>
      <StyledIcon />
      목록 보기
    </ListButton>
  </FloatingButtonContainer>
);

export default FloatingButton;

const FloatingButtonContainer = styled.div`
  position: fixed;
  bottom: 30px;
  margin-left: 220px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 1000;
`;

const ListButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: ${({ theme }) => theme.colors.defaultBackground};
  color: ${({ theme }) => theme.colors.primary};
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 40px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const StyledIcon = styled(ListAltIcon)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 20px;
`;
