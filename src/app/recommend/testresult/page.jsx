"use client";

import Header from '@/components/common/Header/Header';
import { WithBookmarkIcon } from '@/components/common/Header/Header.stories';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';
import DogCard from '@/components/recommend/DogCard/DogCard';
import axios from 'axios';
import { getTraitsByPetId } from '@/apis/traits/getTraits';

const RecommendTestResults = () => {

  const [dogs, setDogs] = useState([]);
  
  useEffect(() => {
    const fetchDogData = async () => {
      try {
        const response = await getTraitsByPetId();

        const data = response.data;

        const formattedDogs = data.petTraits.map((petTrait) => {
          const personality = petTrait.petTraits.reduce(
            (acc, trait) => {
              acc[trait.traitQuestion] = trait.traitAnswer;
              return acc;
            },
            {activity: "", sociality: "", relation: ""}
          );

          const tags = data.memberTraits.map(
            (trait) => trait.traitAnswer
          );

          return {
            id: petTrait.petId,
            name: petTrait.petName,
            hasPersonality: petTrait.petTraits.length > 0,
            personality,
            tags,
          };
        });

        setDogs(formattedDogs);
      } catch (error) {
        console.error("성향 테스트 결과 데이터 가져오기 실패 : ", error)
      }
    };

    fetchDogData();
  }, []);

  return (
    <Container>
      <Header 
        title="성향테스트 조회" 
        showFavoriteIcon={WithBookmarkIcon.args.showFavoriteIcon} 
        showHomeIcon={WithBookmarkIcon.args.showHomeIcon} 
        backbuttonPath="/recommend"
      />
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