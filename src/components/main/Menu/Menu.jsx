"use client";

import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import React from 'react';
import AuthGuard from "@/components/common/AuthGuard/AuthGuard";
import { useRouter } from "next/navigation";

const Menu = () => {

  const router = useRouter();

  const handleBookmarkClick = () => {
    router.push("/mypage/bookmark");
  };

  return (
    <MenuContainer>
      <MenuItem>
        <LinkWrapper onClick={() => router.push("/recommend")}>
          <MenuImage src='/assets/mainpage/recommendIcon.svg' alt="recommend icon" width={80} height={80} /><MenuDescription>성향별 추천</MenuDescription>
        </LinkWrapper>
      </MenuItem>

      <MenuItem>
        <LinkWrapper onClick={() => router.push("/place")}>
            <MenuImage src='/assets/mainpage/daengplaceIcon.svg' alt="daengplace icon" width={80} height={80} /><MenuDescription>댕플</MenuDescription>
        </LinkWrapper>
      </MenuItem>

      <MenuItem>
        <AuthGuard>
          <LinkWrapper onClick={handleBookmarkClick}>
            <MenuImage src='/assets/mainpage/bookmarkIcon.svg' alt="bookmark icon" width={80} height={80} /><MenuDescription>즐겨찾기</MenuDescription>
          </LinkWrapper>
        </AuthGuard>
      </MenuItem>
    </MenuContainer>
  );
};

export default Menu;

const MenuContainer = styled.div`
    display: flex;
    border: 1px solid ${({ theme }) => theme.colors.defaultBackground};
    border-radius: 20px;
    justify-content: space-around;
    align-items: center;
    margin: 10px 0;
    padding: 20px 30px;
    background-color: white;
    max-width: 600px;
    width: 90%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const MenuItem = styled.div`
    display: flex-col;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
`;

const MenuImage = styled(Image)`
    width: 80px;
    height: 80px;
`;

const MenuDescription = styled.div`
    padding-top: 10px;
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
`;