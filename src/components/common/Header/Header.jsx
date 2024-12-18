import React from "react";
import styled from "styled-components";
import { ChevronLeft } from "@styled-icons/bootstrap/ChevronLeft";
import { Place } from "@styled-icons/material-rounded/Place";
import { HeartOutlined } from "@styled-icons/entypo/HeartOutlined";
import { Home } from "@styled-icons/feather/Home";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/../../public/assets/mainpage/Logo.svg";


const Header = ({
  title,
  showLogo,
  showX,
  onClose,
  showHomeIcon,
  showFavoriteIcon,
  showMapIcon,
  backbuttonPath,
}) => {
  const router = useRouter();

  return (
    <Container>
      <SmallContainer>
        {showLogo ? (
          <LogoWrapper onClick={() => router.push("/main")}>
            <LogoImage src={Logo} width={150} height={30} alt="logo" />
          </LogoWrapper>
        ) : (
          <>
            <IconWrapper onClick={() => (backbuttonPath ? router.push(backbuttonPath) : router.back())}>
              <ChevronLeft size="24" />
            </IconWrapper>
            <Title>{title}</Title>
          </>
        )}
      </SmallContainer>

      <RightIcons>
        {showMapIcon && (
          <IconWrapper onClick={() => router.push("/place")}>
            <StyledPlace size="28" />
          </IconWrapper>
        )}
        {showFavoriteIcon && (
          <IconWrapper onClick={() => router.push("/mypage/bookmark")}>
            <StyledHeart size="28" />
          </IconWrapper>
      )}
        {showHomeIcon && (
          <IconWrapper onClick={() => router.push("/main")}>
            <StyledHome size="28" />
          </IconWrapper>
        )}
        {showX && (
          <IconWrapper>
            <StyledCloseLine onClick={onClose} size="28" />
          </IconWrapper>
        )}
      </RightIcons>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);

  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  z-index: 500;
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
  width: 150px;
  height: 30px;
`;

const LogoTitle = styled.div`
  padding-left: 8px;
  font-size: 20px;
  font-family: "Gugi", sans-serif;
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
  position: relative;
`;

const StyledPlace = styled(Place)`
  width: 28px;
  height: 28px;
  stroke-width: 1;
  color: black;
`;

const StyledHeart = styled(HeartOutlined)`
  width: 28px;
  height: 28px;
  stroke-width: 1;
  color: black;
`;

const StyledHome = styled(Home)`
  width: 28px;
  height: 28px;
  stroke-width: 1.5;
  color: black;
`;

const StyledCloseLine = styled(CloseOutline)`
  width: 28px;
  height: 28px;
  color: black;
  stroke-width: 1.5;
`;
