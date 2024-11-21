"use client";

import styled from "styled-components";
import Image from "next/image";

export default function Home() {
  return (
    <Container>
      <TextBox>
        <SubTitle>
          <p>반려견과 함께 떠나는</p>
          <p>특별한 공간</p>
        </SubTitle>
        <Title>댕댕플레이스</Title>
      </TextBox>

      <ButtonBox>
        <Image
          src="/assets/common/kakao_login_btn.svg"
          width={300}
          height={50}
          alt="kakao_login_btn"
        />
        <Image
          src="/assets/common/google_login_btn.svg"
          width={300}
          height={50}
          alt="google_login_btn"
        />
      </ButtonBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 60px;

  background-image: url("/assets/common/start.svg");
  background-size: cover;
  background-position: center;
  height: 100vh;
  color: ${({ theme }) => theme.colors.white};
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 10rem;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  img {
    cursor: pointer;
  }
`;

const SubTitle = styled.h2`
  text-align: center;
  font-size: 1.4rem;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 3.3rem;
`;
