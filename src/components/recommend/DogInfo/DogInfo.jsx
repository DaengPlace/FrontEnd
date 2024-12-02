import React, { useState } from 'react';
import DogPersonality from '../DogPersonality/DogPersonality';
import DogTags from '../DogTags/DogTags';
import styled from 'styled-components';
import Image from 'next/image';
import theme from '@/styles/theme';
import BottomSheet from '@/components/common/BottomSheet/BottomSheet';
import { useRouter } from 'next/navigation';

const DogInfo = ({dog}) => {

  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const router = useRouter;

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
          <ActionButton onClick={() => setOpenBottomSheet(true)}>성향 테스트 다시하기</ActionButton>
        </>
      ) : (
        <>
          <NoInfoText>아직 성향에 대한 정보가 없어요!</NoInfoText>
          <ActionButton>성향 테스트 하러가기</ActionButton>
        </>
      )}

      {openBottomSheet && (
        <BottomSheet
          title={
            <>
              기존 성향 테스트 기록이 남아있습니다.<br />
              테스트를 다시 진행하시겠습니까?
            </>
          }
          confirmText='진행'
          cancelText='취소'
          onConfirm={() => router.push('/recommend/test')}
          setIsBottomSheetVisible={setOpenBottomSheet}
          warningText='새롭게 테스트를 진행할 경우 기존의 데이터는 삭제됩니다.'
        />
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
