"use client";

import React from "react";
import styled from "styled-components";
import Button from "@/components/common/Button/Button";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header/Header";
import { NoTitleHeader } from "@/components/common/Header/Header.stories";

const ReviewScanPage = () => {
  const router = useRouter();

  const handleConfirm = () => {
    router.push("/reviews/reviewsInput");
  };

  return (
    <>
      <Header title="리뷰 정보 확인" showX={NoTitleHeader.args.showX} />
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
              <Value>간식곳간</Value>
            </InfoItem>
            <Divider />
            <InfoItem>
              <Label>방문일자</Label>
              <Value>2024.11.01</Value>
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
