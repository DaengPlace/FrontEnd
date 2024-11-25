import React from "react";
import Image from "next/image";
import styled from "styled-components";

const Banner = () => {
  return (
    <Section>
      <StyledImage
        src="/assets/place/banner1.png"
        alt="야외 공간 있는 카페"
        width={600}
        height={400}
      />
      <BannerText>댕플</BannerText>
    </Section>
  );
};

export default Banner;

const Section = styled.section`
  margin-top: -20px;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  right: 20px;
`;

const BannerText = styled.div`
  position: absolute;
  top: 5px;
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-family: Gugi, sans-serif
`;
