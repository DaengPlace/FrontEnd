"use client";

import React from "react";
import styled from "styled-components";
import Header from "@/components/common/Header/Header";
import { WithMapIcon } from "@/components/common/Header/Header.stories";

const HeaderSection = () => {
  return (
      <Header
        title="포토/비디오 리뷰 모아보기"
        showHomeIcon={WithMapIcon.args.showHomeIcon}
        showMapIcon={WithMapIcon.args.showMapIcon}
      />
  );
};

export default HeaderSection;
