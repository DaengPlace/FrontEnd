import React from "react";
import styled from "styled-components";
import { BREEDS } from "@/constants/DogBreeds";

const DogBottomSheet = ({ onClose, onSelect }) => {
  return (
    <Overlay onClick={onClose}>
      <SheetContainer onClick={(e) => e.stopPropagation()}>
        <Header>견종을 검색해 주세요</Header>
        <SearchInputWrapper>
          <SearchInput
            type="text"
            placeholder="견종을 검색해 주세요"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value.trim() !== "") {
                onSelect(e.target.value);
              }
            }}
          />
        </SearchInputWrapper>
        <BreedList>
          <p>많이 찾는 견종</p>
          {BREEDS.map((breed, index) => (
            <BreedItem key={index} onClick={() => onSelect(breed)}>
              {breed}
            </BreedItem>
          ))}
        </BreedList>
      </SheetContainer>
    </Overlay>
  );
};

export default DogBottomSheet;

const Overlay = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
`;

const SheetContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background: white;
  border-radius: 16px 16px 0 0;
  padding: 25px;
  box-shadow: 0px -4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Header = styled.h2`
  font-size: 22px;
  text-align: center;
  margin-bottom: 1rem;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.divider};
  background: #ebebeb;
  border-radius: 8px;
`;

const BreedList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  p {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 10px;
  }
`;

const BreedItem = styled.li`
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  &:hover {
    background: #f9f9f9;
  }
`;
