"use client";

import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import React from 'react';

const Menu = () => {
  return (
    <MenuContainer>
      <MenuItem>
        <Link href='/recommend'>
          <MenuImage src='/assets/mainpage/recommendIcon.png' alt="recommend icon" width={80} height={80} /><MenuDescription>성향별 추천</MenuDescription>
        </Link>
      </MenuItem>

      <MenuItem>
        <Link href='/search'>
            <MenuImage src='/assets/mainpage/daengplaceIcon.png' alt="daengplace icon" width={80} height={80} /><MenuDescription>댕플</MenuDescription>
        </Link>
      </MenuItem>

      <MenuItem>
        <Link href='/user'>
            <MenuImage src='/assets/mainpage/bookmarkIcon.png' alt="bookmark icon" width={80} height={80} /><MenuDescription>즐겨찾기</MenuDescription>
        </Link>
      </MenuItem>
    </MenuContainer>
  );
};

export default Menu;

const MenuContainer = styled.div`
    display: flex;
    border: 1px solid ${({ theme }) => theme.colors.divider};
    border-radius: 20px;
    justify-content: space-around;
    align-items: center;
    margin: 10px 0;
    padding: 20px 30px;
    background-color: white;
    width: 550px;
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
