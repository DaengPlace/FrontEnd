import React from 'react';
import styled from "styled-components";
import {ChevronLeft} from "@styled-icons/boxicons-regular/ChevronLeft";
import {Place} from "@styled-icons/material-rounded/Place";
import {Heart} from "@styled-icons/evaicons-solid/Heart";
import {Home} from "@styled-icons/feather/Home";
import { useRouter } from 'next/router';
import theme from "@/styles/theme.js";

const Header = ({title, showFavoriteIcon, showMapIcon}) => {

  const router = useRouter();

  return (
    <Container>
      
      <IconWrapper onClick={() => router.back()}>
        <ChevronLeft size="24" />
      </IconWrapper>

      <Title>{title}</Title>

      <RightIcons>
        {showMapIcon && (
          <IconWrapper onClick={() => router.push('/place')}>
            <Place size="24" />
          </IconWrapper>
        )}
        {showFavoriteIcon && (
          <IconWrapper onClick={() => router.push('/place')}>
            <Heart size="24" />
          </IconWrapper>
        )}
        <IconWrapper onClick={() => router.push("/main")}>
          <Home size="24" />
        </IconWrapper>
      </RightIcons>

    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${theme.colors.divider};
`;

const IconWrapper = styled.div`
  cursor: pointer;
  color: black;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const RightIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;