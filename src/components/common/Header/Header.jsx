import React from 'react';
import styled from "styled-components";
import {ChevronLeft} from "@styled-icons/bootstrap/ChevronLeft";
import {Place} from "@styled-icons/material-rounded/Place";
import {HeartOutlined} from "@styled-icons/entypo/HeartOutlined";
import {Home} from "@styled-icons/feather/Home";
import { useRouter } from 'next/navigation';
import theme from "@/styles/theme.js";
import Image from 'next/image';
import Logo from "@/../../public/assets/mainpage/Logo.png";

const Header = ({title, showLogo, showFavoriteIcon, showMapIcon}) => {

  const router = useRouter();

  return (
    <Container>
      <SmallContainer>

        {showLogo ? (
          <LogoWrapper onClick={() => router.push("/main")}>
            <LogoImage src={Logo} width={30} height={30} alt="logo" />
            <LogoTitle>댕댕플레이스</LogoTitle>
          </LogoWrapper>
        ) : (
          <>
            <IconWrapper onClick={() => router.back()}>
              <ChevronLeft size="24" />
            </IconWrapper>
            <Title>{title}</Title>
          </>
        )}

      </SmallContainer>

      <RightIcons>
        {showMapIcon && (
          <IconWrapper onClick={() => router.push('/place')}>
            <StyledPlace size="28" />
          </IconWrapper>
        )}
        {showFavoriteIcon && (
          <IconWrapper onClick={() => router.push('/mypage/bookmark')}>
            <StyledHeart size="28" />
          </IconWrapper>
        )}
        <IconWrapper onClick={() => router.push("/main")}>
          <StyledHome size="28" color='black' />
        </IconWrapper>
      </RightIcons>

    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: 600px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid #d1d1d1;

  position: fixed; /* Header를 고정 */
  top: 0; /* 상단에 고정 */
  left: 50%; /* 화면 가운데 정렬 */
  transform: translateX(-50%); /* 가운데 정렬 보정 */
  background-color: white; /* 배경색 지정 (투명 문제 방지) */
  z-index: 1000; /* 다른 요소보다 위로 배치 */
`;

const SmallContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  cursor: pointer;
  color: black;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const LogoImage = styled(Image)`
  width: 30px;
  height: 30px;
`;

const LogoTitle = styled.div`
  padding-left: 8px;
  font-size: 20px;
  font-family: 'Gugi', sans-serif;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding-left: 15px;
`;

const RightIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledPlace = styled(Place)`
  width: 28px;
  height: 28px;
  stroke-width: 1; /* Adjust line thickness */
  color: black;
`;

const StyledHeart = styled(HeartOutlined)`
  width: 28px;
  height: 28px;
  stroke-width: 1; /* Adjust line thickness */
  color: black;
`;

const StyledHome = styled(Home)`
  width: 28px;
  height: 28px;
  stroke-width: 1.5; /* Adjust line thickness */
  color: black;
`;