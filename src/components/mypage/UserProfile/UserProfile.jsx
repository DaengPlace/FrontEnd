"use client";

import React from "react";
import styled from "styled-components";
import Image from "next/image";
import theme from "@/styles/theme.js";
import { useRouter } from "next/navigation";

const UserProfile = ({ imagePath, name }) => {
  const router = useRouter();

  const handleEditBtnClick = () => {
    router.push("/mypage/profile");
  };

  return (
    <Container>
      <SectionBox>
        <ProfileImage
          src={imagePath}
          alt="profile image"
          width={100}
          height={100}
        />

        <ProfileName>{name}</ProfileName>
        <EditButton onClick={handleEditBtnClick}>편집</EditButton>
      </SectionBox>
    </Container>
  );
};

export default UserProfile;

const Container = styled.div`
  width: 540px;
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

const ProfileName = styled.div`
  font-weight: bold;
  margin-right: auto;
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
