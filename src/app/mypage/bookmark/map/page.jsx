"use client";

import Header from '@/components/common/Header/Header';
import { OnlyHomeIcon } from '@/components/common/Header/Header.stories';
import React from 'react';
import styled from 'styled-components';

const page = () => {
  return (
    <Container>
      
      <Header title="즐겨찾기" showHomeIcon={OnlyHomeIcon.args.showHomeIcon} showFavoriteIcon={OnlyHomeIcon.args.showFavoriteIcon} showMapIcon={OnlyHomeIcon.args.showMapIcon}  />
      <MapArea>
        지도
      </MapArea>
    </Container>
  );
};

export default page;

const Container = styled.div`

`;

const MapArea = styled.div`
  background-color: gray;
  color: white;
  height: 100vh;
`;