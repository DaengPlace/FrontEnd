"use client";

import Button from '@/components/common/Button/Button';
import Header from '@/components/common/Header/Header';
import { NoTitleHeader } from '@/components/common/Header/Header.stories';
import Modal from '@/components/common/Modal/Modal';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import styled from 'styled-components';
import FeatureGroup from '@/components/recommend/FeatureGroup/FeatureGroup';
import FeatureTitle from '@/components/recommend/FeatureTitle/FeatureTitle';
import BottomSheet from '@/components/common/BottomSheet/BottomSheet';

const RecommendUserTest = () => {

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSavedBottomSheetOpen, setIsSavedBottomSheetOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState({
    activity: null,
    sociality: null,
    relation: null,
  });

  const isButtonActive = selectedTags.activity && selectedTags.sociality && selectedTags.relation;

  const handleCheckboxClick = (type, value) => {
    setSelectedTags((prev) => ({
      ...prev,
      [type]: prev[type] === value? null:value, 
    }));
  };

  return (
    <Container>
      <Header showX={NoTitleHeader.args.showX} onClose={() => setIsModalOpen(true)} />
      <Content>
        <FeatureTitle title={
          <>
            보호자 님은<br />
            어떤 시설을 원하시나요?
          </>
        } />
        <FeatureGroup
          label="가성비"
          options={["가성비가 중요해요", "가격은 중요하지 않아요"]}
          selectedValue={selectedTags.activity}
          onSelect={(value) => handleCheckboxClick("activity", value)}
        />

        <FeatureGroup
          label="주차 공간"
          options={["필요해요", "필요하지 않아요"]}
          selectedValue={selectedTags.sociality}
          onSelect={(value) => handleCheckboxClick("sociality", value)}
        />

        <FeatureGroup
          label="취향"
          options={["특색 있는 곳이 좋아요", "깔끔하고 평범한 곳이 좋아요"]}
          selectedValue={selectedTags.relation}
          onSelect={(value) => handleCheckboxClick("relation", value)}
        />
      </Content>

      <Button 
        isActive={isButtonActive}
        onClick={() => {
          if (isButtonActive) {
            // submit action

            //
            setIsSavedBottomSheetOpen(true);
          }
        }}
        hasImage
      > 확인
      </Button>

      {isModalOpen && (
        <Modal
          title='성향테스트를 중단하시겠습니까?'
          message={
            <>
              지금까지 작성된 정보는<br />
              저장되지 않습니다.
            </>
          }
          cancelText='나가기'
          confirmText='계속 작성'
          onCancel={() => router.back()}
          onConfirm={() => setIsModalOpen(false)}
        />
      )}

      {isSavedBottomSheetOpen && (
        <StyledBottomSheetWrapper>
          <BottomSheet
            title='성향테스트 정보가 저장되었습니다.'
            cancelText='성향 확인하기'
            confirmText='추천 시설 보기'
            onClose={() => router.push('/recommend/testresult')}
            onConfirm={() => router.push('/recommend')}
          />
        </StyledBottomSheetWrapper>
      )}
    </Container>
  );
};

export default RecommendUserTest;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 50px;
`;

const StyledBottomSheetWrapper = styled.div`
  h2 {
    margin-bottom: 40px; /* 제목과 버튼 사이 간격 */
  }
`;