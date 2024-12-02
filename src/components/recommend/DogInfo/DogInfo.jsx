import React from 'react';
import DogPersonality from '../DogPersonality/DogPersonality';
import DogTags from '../DogTags/DogTags';
import styled from 'styled-components';
import Image from 'next/image';
import theme from '@/styles/theme';

const DogInfo = ({dog}) => {
  return (
    <Container>
      <DogNameImage>
        <DogName>{dog.name}</DogName>
        <DogImage>
          <Image src={"/assets/dog/default_profile.svg"} alt={`${dog.name} 이미지`} width={80} height={80} />
        </DogImage>
      </DogNameImage>
      {dog.hasPersonality ? (
        <>
          <DogPersonality personality={dog.personality} />
          <DogTags tags={dog.tags} />
          <ActionButton>성향 테스트 다시하기</ActionButton>
        </>
      ) : (
        <>
          <NoInfoText>아직 성향에 대한 정보가 없어요!</NoInfoText>
          <ActionButton>성향 테스트 하러가기</ActionButton>
        </>
      )}
    </Container>
  );
};

export default DogInfo;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DogNameImage = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DogName = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const DogImage = styled.div`
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 50%;
  }
`;

const ActionButton = styled.button`
  width: 100%;
  height: 40px;
  border: 1px solid ${theme.colors.primary};
  border-radius: 20px;
  background-color: white;
  color: ${theme.colors.primary};
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.primary};
    color: white;
  }
`;

const NoInfoText = styled.div`
  font-size: 14px;
  color: ${theme.colors.divider};
  margin-bottom: 10px;
`;
