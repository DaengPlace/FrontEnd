"use client";

import Header from '@/components/common/Header/Header';
import { WithBookmarkIcon } from '@/components/common/Header/Header.stories';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';
import DogCard from '@/components/recommend/DogCard/DogCard';
import axios from 'axios';

const RecommendTestResults = () => {

  const [dogs, setDogs] = useState([]);
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJuYW1lIjoia2FrYW9fMzgyMjM1MDcxNSIsInJvbGUiOiJST0xFX1VTRVIiLCJpYXQiOjE3MzQxMTY3ODUsImV4cCI6MTczNDE3Njc4NX0.-jBsk8YVbxZW8PeDhxGsY6lyFyTOJJAfU3hkXnzYVKE';
  
  useEffect(() => {
    localStorage.setItem('accessToken', token);
    const fetchDogData = async () => {
      try {
        const response = await axios.get('https://api.daengplace.com/traits', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`,
          }
        });
        console.log("API 응답 데이터 : ", response.data);

        const data = response.data;

        const formattedDogs = data.data.petTraits.map((petTrait) => {
          const personality = petTrait.petTraits.reduce(
            (acc, trait) => {
              acc[trait.traitQuestion] = trait.traitAnswer;
              return acc;
            },
            {activity: "", sociality: "", relation: ""}
          );

          const tags = data.data.memberTraits.map(
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