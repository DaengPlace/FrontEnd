"use client"

import Header from '@/components/common/Header/Header';
import { NoTitleHeader } from '@/components/common/Header/Header.stories';
import Modal from '@/components/common/Modal/Modal';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import styled from 'styled-components';

const RecommendTest = () => {

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Container>
      
      <Header showX={NoTitleHeader.args.showX} onClose={() => setIsModalOpen(true)} />


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

export default RecommendTest;

const Container = styled.div`
  width: 100%;
`;