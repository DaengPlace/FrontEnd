"use client";

import Button from '@/components/common/Button/Button';
import Header from '@/components/common/Header/Header';
import { NoTitleHeader } from '@/components/common/Header/Header.stories';
import Modal from '@/components/common/Modal/Modal';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';
import FeatureGroup from '@/components/recommend/FeatureGroup/FeatureGroup';
import FeatureTitle from '@/components/recommend/FeatureTitle/FeatureTitle';
import { getPetQuestions } from '@/apis/traits/getTraits';
import { useTraitStore } from '@/stores/traitStore';

const RecommendDogTest = () => {
  return (
    <Suspense>
      <ActualRecommendDogTest />
    </Suspense>
  )
}

const ActualRecommendDogTest = () => {

  const searchParams = useSearchParams();
  const petId = searchParams.get("petId");
  const router = useRouter();
  const { setPetTraits } = useTraitStore();
  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getPetQuestions();
        setQuestions(response.data);
      } catch (error) {
        console.error("반려견 성향 질문 불러오기 실패:", error);
      }
    };

    fetchQuestions();
  }, []);

  const isButtonActive = Object.keys(selectedTags).length === questions.length;

  const handleCheckboxClick = (questionId, answerId) => {
    setSelectedTags((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  const handleSubmit = () => {
    const petTraits = Object.entries(selectedTags).map(([questionId, answerId]) => ({
      traitQuestionId: Number(questionId),
      traitAnswerId: answerId,
    }));
    setPetTraits(petTraits); // Zustand에 저장
    console.log(petTraits)
    router.push(`/recommend/usertest?petId=${petId}`);
  };

  return (
    <Container>
      <Header showX={NoTitleHeader.args.showX} onClose={() => setIsModalOpen(true)} />
      <Content>
        <FeatureTitle title={
          <>
            댕댕이의 성향을 <br/>알려주세요
          </>
        } />
        {questions.map((question) => (
          <FeatureGroup
            key={question.questionId}
            label={question.content}
            options={question.answers}
            selectedValue={selectedTags[question.questionId]}
            onSelect={(answerId) => handleCheckboxClick(question.questionId, answerId)}
          />
        ))}
      </Content>

      <Button 
        isActive={isButtonActive} onClick={handleSubmit} hasImage> 확인
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



