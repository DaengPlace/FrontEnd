"use client";

import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

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
          onClick={() => router.push("/signin")} // 임시
          />
        <Image
          src="/assets/common/google_login_btn.svg"
          width={300}
          height={50}
          alt="google_login_btn"
          onClick={() => router.push("/signin")} // 임시
          />
      </ButtonBox>

      <WithoutLoginBtn onClick={() => router.push("/main")}>
        <span>로그인 없이 시작하기</span>
      </WithoutLoginBtn>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 40px;

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
  font-family: "Do Hyeon", sans-serif !important;

  p {
  margin: 0;
  font-family: "Do Hyeon", sans-serif;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 3.3rem;
  font-family: "Gugi", sans-serif;
  font-weight: 400;
`;

const WithoutLoginBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  cursor: pointer;

  span {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.white};
    text-align: center;
    position: relative;

  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.white};
    margin-top: 1px;
  }
}`;