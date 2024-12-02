"use client";

import Header from '@/components/common/Header/Header';
import { WithBookmarkIcon } from '@/components/common/Header/Header.stories';
import React from 'react';
import styled from 'styled-components';
import { dogs } from '@/data/DogsTest';
import theme from '@/styles/theme';
import DogCard from '@/components/recommend/DogCard/DogCard';

const RecommendTestResults = () => {

  return (
    <Container>
      <Header title="성향테스트 조회" showFavoriteIcon={WithBookmarkIcon.args.showFavoriteIcon} showHomeIcon={WithBookmarkIcon.args.showHomeIcon} />
      <ScrollableContent>
        {dogs.map((dog, index) => (
          <DogCard key={index} dog={dog} />
        ))}
      </ScrollableContent>
    </Container>
  );
};

export default RecommendTestResults;

const Container = styled.div`
  width; 100%;
  height: 100vh;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.colors.defaultBackground};
`;

const ScrollableContent = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  margin-top: 50px;

  &::-webkit-scrollbar {
    display: none;
  }
`;



