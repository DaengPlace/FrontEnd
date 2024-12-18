import React from "react";
import styled from "styled-components";
import Image from "next/image";

const ImageContainer = () => {
  return (
    <Container>
      <StyledImage
        src="/assets/image 19.svg"
        alt="Main Place"
        width={600}
        height={352}
        priority
      />
    </Container>
  );
};

export default ImageContainer;

const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
