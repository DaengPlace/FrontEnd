"use client";

import React from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme.js';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const PetProfile = ({pets}) => {

  const router = useRouter();

  return (
    <Container>
      {pets.map((pet) => (
        <SectionBox key={pet.id}>
          <ProfileImage src={pet.image} alt="profile image" width={100} height={100} />
          
          <PetInfo>
            <ProfileName>{pet.name}</ProfileName>
            <ProfileInfo>{pet.breed} | {pet.birth} | {pet.gender === 1? "여아" : "남아"} | {pet.weight}kg</ProfileInfo>
            <ProfileIsNeutered>{pet.isNeutered === true? "중성화 수술 완료" : "중성화 수술 전"}</ProfileIsNeutered>
          </PetInfo>
          <EditButton onClick={() => router.push('/dog/edit')}>편집</EditButton>

        </SectionBox>
      ))}
    </Container>
  );
};

export default PetProfile;

const Container = styled.div`
  width: 90%;
`;

const SectionBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  padding: 0 30px 0 0;
  margin-bottom: 10px;
`;

const ProfileImage = styled(Image)`
  width: 100px;
  padding: 15px;
`;

const PetInfo = styled.div`
  margin-right: auto;
  margin-left: 5px;
`;

const ProfileName = styled.div`
  font-weight:bold;
  margin-right: auto;
`;  

const ProfileInfo = styled.div`
  margin-top: 5px;
  font-size: 12px;
`;

const ProfileIsNeutered = styled.div`
  color: ${theme.colors.divider};
  margin-top: 5px;
  font-size: 12px;
`;

const EditButton = styled.button`
  width: 50px;
  height: 25px;
  border-radius: 8px;
  background-color: white;
  font-size: 12px;
  border: 1px solid ${theme.colors.primary};
  color: ${theme.colors.primary};

  &:hover {
    background-color: ${theme.colors.primary};
    color: white;
    cursor: pointer;
  }
`;