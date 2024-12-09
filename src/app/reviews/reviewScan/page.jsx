"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@/components/common/Button/Button";
import { useRouter } from "next/navigation";
import Modal from '@/components/common/Modal/Modal';
import Header from "@/components/common/Header/Header";
import { NoTitleHeader } from "@/components/common/Header/Header.stories";
import useReviewStore from "@/stores/reviewStore";

const ReviewScanPage = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { placeName, visitDate } = useReviewStore();

  const handleConfirm = () => {
    router.push("/reviews/reviewsInput");
  };

  return (
    <>
      <Header title="리뷰 정보 확인" showX={NoTitleHeader.args.showX} onClose={() => setIsModalOpen(true)}/>
      <Container>
        <Content>
          <Subtitle>
            영수증 스캔 정보를
            <br />
            확인해주세요
          </Subtitle>
          <InfoBox>
            <InfoItem>
              <Label>상호명</Label>
              <Value>{placeName || "장소 정보 없음"}</Value>
            </InfoItem>
            <Divider />
            <InfoItem>
              <Label>방문일자</Label>
              <Value>{visitDate || "날짜 정보 없음"}</Value>
            </InfoItem>
          </InfoBox>
        </Content>
        <Footer>
          <Button
            isActive={true}
            hasImage={true}
            onClick={handleConfirm}
            className="with-dog"
          >
            확인
          </Button>
        </Footer>
        {isModalOpen && (
        <Modal
          title='리뷰작성을 중단하시겠습니까?'
          message={
            <>
              지금까지 작성된 정보는<br />
              저장되지 않습니다.
            </>
          }
          cancelText='나가기'
          confirmText='계속 작성'
          onCancel={() => router.push("/reviews")}
          onConfirm={() => setIsModalOpen(false)}
        />
      )}
      </Container>
    </>
  );
};

export default ReviewScanPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.defaultBackground};
  padding: 70px 20px 20px 20px;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  justify-content: flex-start; 
  text-align: left;
  padding: 20px; 
`;

const Subtitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  line-height: 1.5;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
  padding: 20px;
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: 8px;
  width: 540px;
  height: 151px;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
`;

const Label = styled.span`
  font-weight: bold;
  font-size: 18px;
  color: #333333;
`;

const Value = styled.span`
  font-size: 18px;
  color: #555555;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.divider};
`;

const Footer = styled.footer`
  width: 100%;
  max-width: 540px;
  align-self: center;
`;
