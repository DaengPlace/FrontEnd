"use client";

import React from "react";
import styled from "styled-components";
import Header from "@/components/common/Header/Header";
import { WithMapIcon } from "@/components/common/Header/Header.stories";

const HeaderSection = () => {
  return (
    <HeaderWrapper>
      <Header
        title="리뷰 상세"
        showFavoriteIcon={WithMapIcon.args.showFavoriteIcon}
        showMapIcon={WithMapIcon.args.showMapIcon}
      />
    </HeaderWrapper>
  );
};

export default HeaderSection;

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: 1000;
  background-color: white;
`;
