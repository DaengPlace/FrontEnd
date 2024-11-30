import React from "react";
import Image from "next/image";
import styled from "styled-components";

const Banner = () => {
  return (
    <Section>
      <StyledImage
        src="/assets/place/banner1.svg"
        alt="야외 공간 있는 카페"
        width={600}
        height={400}
      />
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

