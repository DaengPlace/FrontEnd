"use client";

import React from 'react';
import styled from "styled-components";
import Image from "next/image";

const Banner = () => {
  return (
    <BannerContainer>
      <BannerImage
          src="/assets/mainpage/banner1.svg"
          alt="banner image"
          width={600}
          height={300}
      />
    </BannerContainer>
  );
};

export default Banner;

const BannerContainer = styled.div`
  text-align: center;
`;

const BannerImage = styled(Image)`
    width: 100%;
`;