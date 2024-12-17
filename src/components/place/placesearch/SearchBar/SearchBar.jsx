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
      <SearchInput />
    </SearchWrapper>
  </SearchBarContainer>
);

const SearchBarContainer = styled.div`
  margin-bottom: 16px;
  cursor: pointer;
  margin-left: 20px;
  &:hover div {
    background-color: ${({ theme }) => theme.colors.divider};
    transition: background-color 0.3s ease;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.deactivate};
  border-radius: 30px;
  padding: 10px 16px;
  width: 95%;
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
