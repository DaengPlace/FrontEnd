"use client";

import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
  const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_URL;
  };

  return (
    <Container>
      <TextBox>
        <SubTitle>
          <p>반려견과 함께 떠나는</p>
          <p>특별한 공간</p>
        </SubTitle>
        <Title>댕댕플레이스</Title>
      </TextBox>

      <Divider>
        <hr />
        <span>SNS 계정으로 로그인</span>
        <hr />
      </Divider>

      <ButtonBox>
        <Image
          src="/assets/common/kakao_login_btn.svg"
          width={300}
          height={50}
          alt="kakao_login_btn"
          onClick={handleKakaoLogin}
        />
        <Image
          src="/assets/common/google_login_btn.svg"
          width={300}
          height={50}
          alt="google_login_btn"
          onClick={() => router.push("/signin")} // 임시
        />
      </ButtonBox>
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

const Divider = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  gap: 10px;

  hr {
    flex: 1;
    border: none;
    border-top: 1px solid ${({ theme }) => theme.colors.white};
  }
  span {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.white};
    white-space: nowrap;
  }
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
