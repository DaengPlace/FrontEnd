"use client";

import styled from "styled-components";
import Button from "@/components/common/Button/Button";
import { Input } from "@/components/common/Input/Input";
import { useState } from "react";
import Image from "next/image";

const SigninProfilePage = () => {
  const [nickname, setNickname] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);

  const handleCheckDuplicate = () => {
    setIsDuplicate(nickname === "사용중인닉네임");
  };

  return (
    <Container>
      <Title>
        <p>댕댕플레이스에서 활동할</p>
        <p>프로필을 등록해 주세요</p>
      </Title>

      <ProfileBox>
        <Image
          src="/assets/profile/default_profile.svg"
          alt="default_profile"
          width={150}
          height={150}
        />
        <Image
          src="/assets/profile/camera.svg"
          alt="edit"
          width={50}
          height={50}
        />
      </ProfileBox>

      <InputBox>
        <p>닉네임</p>
        <BoxContainer>
          <Input
            placeholder="닉네임 입력"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <Button isActive={nickname.length > 0} onClick={handleCheckDuplicate}>
            중복확인
          </Button>
        </BoxContainer>
      </InputBox>

      {isDuplicate && <ErrorMessage>이미 사용 중인 닉네임입니다.</ErrorMessage>}

      <ButtonContainer>
        <Button
          isActive={!isDuplicate && nickname.length > 0}
          onClick={() => console.log("닉네임 등록:", nickname)}
          hasImage={false}
          type="button"
        >
          확인
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default SigninProfilePage;

const Container = styled.div`
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.black};
  font-size: 1.4rem;
  margin-bottom: 3rem;
`;

const BoxContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  & > input {
    flex: 7 7 70%;
  }
  & > div {
    flex: 3 3 30%;
  }
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto;

  img:first-child {
    position: relative;
    z-index: 1;
  }

  img:last-child {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 2;
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  p {
    font-size: 1.1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 10px;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 2rem;
`;
