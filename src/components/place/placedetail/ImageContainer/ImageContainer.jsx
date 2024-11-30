import React from "react";
import styled from "styled-components";
import Image from "next/image";

const ImageContainer = () => {
  return (
    <Container>
      <StyledImage
        src="/assets/image 19.png"
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
  height: 300px;
  overflow: hidden;
  margin-bottom: 20px;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
