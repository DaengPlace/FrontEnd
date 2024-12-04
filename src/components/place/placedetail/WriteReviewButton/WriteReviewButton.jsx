"use client";

import React from "react";
import styled from "styled-components";

const WriteReviewButton = ({ onClick }) => {
  return <Button onClick={onClick}>리뷰 작성하기</Button>;
};

export default WriteReviewButton;

const Button = styled.button`
  padding: 5px 5px;
  background-color: ${({ theme }) => theme.colors.defaultBackground};
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
  width: 27%;
  height: 4%;
  top: -1.25rem;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
  margin-bottom: 0;
`;