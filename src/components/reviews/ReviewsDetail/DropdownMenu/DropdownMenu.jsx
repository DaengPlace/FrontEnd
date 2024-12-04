"use client";

import React from "react";
import styled from "styled-components";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const DropdownMenu = ({ isOpen, toggleDropdown }) => {
  return (
    <DropdownWrapper>
      <Button onClick={toggleDropdown}>
        <MoreVertIcon />
      </Button>
      {isOpen && (
        <Menu>
          <MenuItem>수정</MenuItem>
          <MenuItem>삭제</MenuItem>
        </Menu>
      )}
    </DropdownWrapper>
  );
};

export default DropdownMenu;

const DropdownWrapper = styled.div`
  position: relative; /* 부모 요소를 기준으로 드롭다운 위치를 설정 */
  display: inline-block; /* 버튼과 드롭다운 메뉴를 같은 줄에 표시 */
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  svg {
    color: #ababab;
  }
`;

const Menu = styled.div`
  position: absolute;
  top: 120%; 
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 100px;
  z-index: 100; 
`;

const MenuItem = styled.div`
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: #f4f4f4;
  }
`;
