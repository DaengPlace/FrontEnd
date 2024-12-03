"use client";

import React from 'react';
import styled from 'styled-components';
import defaultProfileImage from "../../../public/assets/mypage/defaultProfileImage.png";

import SectionHeader from '@/components/mypage/SectionHeader/SectionHeader';
import UserProfile from '@/components/mypage/UserProfile/UserProfile';
import PetProfile from '@/components/mypage/PetProfile/PetProfile';
import Activities from '@/components/mypage/Activities/Activities';
import AccountManagement from '@/components/mypage/AccountManagement/AccountManagement';
import Header from '@/components/common/Header/Header';
import { OnlyHomeIcon } from '@/components/common/Header/Header.stories';
import { ChevronRight } from 'styled-icons/bootstrap';
import theme from "@/styles/theme.js";
import { useRouter } from 'next/navigation';

const pets = [
  {id:1, image: "/assets/mypage/defaultPetImage.png", name: "뽀삐", breed: "말티즈", birth: "11개월", gender: 1, weight: 5.3, isNeutered: true},
  {id:2, image: "/assets/mypage/defaultPetImage.png", name: "댕댕", breed: "시바견", birth: "11개월", gender: 1, weight: 8.7, isNeutered: true},
];

const MyPage = () => {

  const router = useRouter();

  return (
    <Container>
      <Header title="마이페이지" showHomeIcon={OnlyHomeIcon.args.showHomeIcon} showFavoriteIcon={OnlyHomeIcon.args.showFavoriteIcon} showMapIcon={OnlyHomeIcon.args.showMapIcon}  />
      <Space />
      
      <SectionHeader header={"내 프로필"} />
      <UserProfile imagePath={defaultProfileImage} name={"뽀삐엄마"} />
      <br />

      <MyPetsHeader>
        <SectionHeader header={"우리집 댕댕이들"} />
        <AddPet onClick={() => router.push('/dog/info')}>추가하기<StyledChevronRight /> </AddPet>
      </MyPetsHeader>
      <PetProfile pets={pets} />
      <br/>

      <SectionHeader header={"나의 활동"} />
      <Activities />
      <br />

      <SectionHeader header={"계정 관리"} />
      <AccountManagement />

    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.colors.defaultBackground};
`;

const Space = styled.div`
  height: 20px;
  margin-top: 50px;
`;

const MyPetsHeader = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddPet = styled.div`
  font-size: 12px;
  display: flex;
  width: 80px;
  cursor: pointer;
`;

const StyledChevronRight = styled(ChevronRight)`
  width: 12px;
  height: 12px;
  color: ${theme.colors.black};
  margin-left: 8px;
`;