"use client";

import Button from '@/components/common/Button/Button';
import Header from '@/components/common/Header/Header';
import { NoTitleHeader } from '@/components/common/Header/Header.stories';
import Modal from '@/components/common/Modal/Modal';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import styled from 'styled-components';
import FeatureGroup from '@/components/recommend/FeatureGroup/FeatureGroup';

const RecommendDogTest = () => {

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
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

        <Title>댕댕이의 성향을<br />알려주세요</Title>
        <FeatureGroup
          label="활동성"
          options={["활발해요", "점잖아요"]}
          selectedValue={selectedTags.activity}
          onSelect={(value) => handleCheckboxClick("activity", value)}
        />

        <FeatureGroup
          label="타견 사교성"
          options={["다른 강아지와 잘 어울려요", "낯을 많이 가려요"]}
          selectedValue={selectedTags.sociality}
          onSelect={(value) => handleCheckboxClick("sociality", value)}
        />

        <FeatureGroup
          label="대인관계"
          options={["처음 보는 사람에게 잘 다가가요", "낯선 사람을 경계해요"]}
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
            router.push("/recommend/usertest");
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
    </Container>
  );
};

export default RecommendDogTest;

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

const Title = styled.h1`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

