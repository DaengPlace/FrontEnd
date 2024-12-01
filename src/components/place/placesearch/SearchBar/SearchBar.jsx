import React from "react";
import styled from "styled-components";
import Image from "next/image";

const SearchBar = ({ onClick }) => (
  <SearchBarContainer onClick={onClick}>
    <SearchWrapper>
      <Image
        src="/assets/image 14.png"
        alt="돋보기"
        width={30}
        height={30}
        style={{ marginRight: "10px" }}
      />
      <SearchInput placeholder="내 위치 주변" />
    </SearchWrapper>
  </SearchBarContainer>
);

const SearchBarContainer = styled.div`
  margin-bottom: 16px;
  cursor: pointer;
  margin-left: 20px;
  &:hover div {
    background-color: ${({ theme }) => theme.colors.divider}; /* 호버 시 배경색 변경 */
    transition: background-color 0.3s ease; /* 부드러운 전환 효과 */
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.deactivate};
  border-radius: 30px;
  padding: 10px 16px;
  width: 560px;
  height: 80px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  background: none;
  flex-grow: 1;
  font-size: 20px;
  font-weight: bold;
  color: black;
  cursor: pointer;
`;

export default SearchBar;
