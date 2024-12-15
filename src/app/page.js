"use client";

import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

export default function Home() {
  const router = useRouter();

  const KAKAO_URL = `${BASE_URL}/oauth2/authorization/kakao`;
  const GOOGLE_URL = `${BASE_URL}/oauth2/authorization/google`;

  const handleLogin = (url) => {
    window.location.href = url;
  };

  return (
    <Container>
      <ButtonBox>
        <Image
          src="/assets/common/kakao_login_btn.svg"
          width={300}
          height={50}
          alt="kakao_login_btn"
          onClick={() => handleLogin(KAKAO_URL)}
        />
        <Image
          src="/assets/common/google_login_btn.svg"
          width={300}
          height={50}
          alt="google_login_btn"
          onClick={() => handleLogin(GOOGLE_URL)}
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

  background-image: url("/assets/common/start1.svg");
  background-size: cover;
  background-position: center;
  height: 100vh;
  color: ${({ theme }) => theme.colors.white};
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 22rem;

  img {
    cursor: pointer;
  }
`;

const WithoutLoginBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  cursor: pointer;
  margin-top: -16px;

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
  }
`;
