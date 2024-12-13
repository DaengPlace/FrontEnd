import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getBreedTypes } from "@/apis/dog/getBreedTypes";

const DogBottomSheet = ({ onClose, onSelect }) => {
  const [breedList, setBreedList] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBreedTypes = async () => {
      try {
        const response = await getBreedTypes();
        const breeds = response.data?.breeds || [];
        setData(breeds);
        setBreedList(breeds);
      } catch (error) {
        console.error("Failed to fetch breed types:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBreedTypes();
  }, []);

  const handleSearch = (searchValue) => {
    if (!data) return;
    const filteredBreeds = data.filter((breed) =>
      breed.breedType.toLowerCase().includes(searchValue.toLowerCase())
    );
    setBreedList(filteredBreeds);
  };

  return (
    <Overlay onClick={onClose}>
      <SheetContainer onClick={(e) => e.stopPropagation()}>
        <Header>견종을 검색해 주세요</Header>
        <SearchInputWrapper>
          <SearchInput
            type="text"
            placeholder="견종을 검색해 주세요"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </SearchInputWrapper>
        <BreedList>
          {isLoading ? (
            <p>로딩 중...</p>
          ) : breedList.length > 0 ? (
            breedList.map((breed) => (
              <BreedItem
                key={breed.breedTypeId}
                onClick={() => onSelect(breed)}
              >
                {breed.breedType}
              </BreedItem>
            ))
          ) : (
            <p>검색 결과가 없습니다.</p>
          )}
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
  max-height: 70%;
  overflow: hidden;
`;

const BreedList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 50vh;
  overflow-y: auto;
  border-top: 1px solid #eee;
  p {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 10px;
  }
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

const BreedItem = styled.li`
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  &:hover {
    background: #f9f9f9;
  }
`;
