"use client";

import React from 'react';
import styled from 'styled-components';
import defaultProfileImage from "../../../public/assets/mypage/defaultProfileImage.png"
import theme from "../../styles/theme.js";
import Image from 'next/image';
import { ChevronRight } from 'styled-icons/bootstrap';

const pets = [
  {id:1, image: "/assets/mypage/defaultPetImage.png", name: "뽀삐", breed: "말티즈", birth: "11개월", gender: 1, weight: 5.3, isNeutered: true},
  {id:2, image: "/assets/mypage/defaultPetImage.png", name: "댕댕", breed: "시바견", birth: "11개월", gender: 1, weight: 8.7, isNeutered: true},
];

const MyPage = () => {
  return (
    <Container>
      <UserProfile>
        <SectionHeader>내 프로필</SectionHeader>
        <SectionBox>

          <ProfileImage src={defaultProfileImage} alt="profile image" width={100} height={100} />
          
          <ProfileName>뽀삐엄마</ProfileName>
          <EditButton>편집</EditButton>

        </SectionBox>
      </UserProfile>

      <PetProfile>
        <SectionHeader>우리집 댕댕이들</SectionHeader>
          
          {pets.map((pet) => (
            <SectionBox key={pet.id}>
              <ProfileImage src={pet.image} alt="profile image" width={100} height={100} />
              
              <PetInfo>
                <ProfileName>{pet.name}</ProfileName>
                <ProfileInfo>{pet.breed} | {pet.birth} | {pet.gender === 1? "여아" : "남아"} | {pet.weight}kg</ProfileInfo>
                <ProfileIsNeutered>{pet.isNeutered === true? "중성화 수술 완료" : "중성화 수술 전"}</ProfileIsNeutered>
              </PetInfo>
              <EditButton>편집</EditButton>

            </SectionBox>
          ))}
      </PetProfile>

      <MyActivities>
        <SectionHeader>나의 활동</SectionHeader>
        <ActivityBox>
          <ActivityItem>
            <span>🏢</span> <p>즐겨찾는 시설 목록</p>
            <ActivityArrow>
              <StyledChevronRight />
            </ActivityArrow>
          </ActivityItem>
          <ActivityItem>
            <span>📝</span> <p>내가 쓴 리뷰 목록</p>
            <ActivityArrow>
              <StyledChevronRight />
            </ActivityArrow>
          </ActivityItem>
        </ActivityBox>
      </MyActivities>

      <AccountManagement>
        <SectionHeader>계정 관리</SectionHeader>
        <ActivityBox>
          <ActivityItem>
            <p>로그아웃</p>
            <ActivityArrow>
              <StyledChevronRight />
            </ActivityArrow>
          </ActivityItem>
          <ActivityItem>
            <p>회원 탈퇴</p>
            <ActivityArrow>
              <StyledChevronRight />
            </ActivityArrow>
          </ActivityItem>
        </ActivityBox>
      </AccountManagement>

    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserProfile = styled.div`
  width: 540px;
`;

const SectionHeader = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
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

const PetProfile = styled.div`
  width: 540px; 
  margin-top: 30px;
`;

const MyActivities = styled.div`
  width: 540px; 
  margin-top: 30px;
`;

const ActivityBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const ActivityItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  padding: 10px 0;

  span {
    padding-left: 10px;
    font-size: 20px;
  }

  p {
    margin-right: auto;
    padding-left: 20px;
  }
`;

const ActivityArrow = styled.div`
  padding-right: 20px;
`;

const StyledChevronRight = styled(ChevronRight)`
  width: 20px;
  height: 20px;
  color: ${theme.colors.divider};

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const AccountManagement = styled.div`
  width: 540px; 
  margin: 30px 0;

`;