"use client";
import React from "react";
import styled from "styled-components";
import Image from "next/image";

const SearchBar = ({ value, onClick }) => (
  <SearchBarWrapper onClick={onClick}>
    <SearchWrapper>
      <Image
        src="/assets/image 14.png"
        alt="돋보기"
        width={25}
        height={25}
        style={{ marginRight: "10px" }}
      />
      <SearchInput
        readOnly
      />
    </SearchWrapper>
  </SearchBarWrapper>
);

export default SearchBar;

const SearchBarWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 16px;
  margin-left: 20px;
    &:hover div {
    background-color: ${({ theme }) => theme.colors.divider};
    transition: background-color 0.3s ease; 
  }
  cursor : pointer;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.deactivate};
  border-radius: 30px;
  padding: 10px 16px;
  width: 95%;
  height: 50px;
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
