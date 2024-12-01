"use client";

import React from "react";
import styled from "styled-components";
import Divider from "@/components/common/Divider/Divider";

const SubHeader = ({ category, title, photoCount }) => {
  return (
    <Wrapper>
      <CategoryBadge>{category}</CategoryBadge>
      <Subtitle>{title}</Subtitle>
      <Divider />
      <PhotoCount>포토 {photoCount}개</PhotoCount>
    </Wrapper>
  );
};

export default SubHeader;

const Wrapper = styled.div`
  margin-bottom: 16px;
`;

const CategoryBadge = styled.div`
  display: inline-block;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  background: #01003f;
  border-radius: 10px;
  text-align: center;
`;

const Subtitle = styled.h2`
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const PhotoCount = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.divider};
  margin-top: 10px;
  font-weight: bold;
`;
