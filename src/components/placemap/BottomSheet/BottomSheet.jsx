"use client";
import React from "react";
import styled from "styled-components";
import Image from "next/image";

const BottomSheet = ({
  isOpen,
  onClose,
  sidoOptions,
  gunguOptions,
  selectedSido,
  selectedGungu,
  showGunguDropdown,
  onSidoChange,
  onGunguChange,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <Overlay onClick={onClose} />
      <SheetContainer>
        <Header>
          <Title>검색</Title>
          <CloseButton onClick={onClose}>X</CloseButton>
        </Header>
        <Separator />
        <Content>
          <FilterOption>
            <LabelWrapper>
              <Image
                src="/assets/image 22.png"
                alt="아이콘"
                width={24}
                height={24}
              />
              <Label>어디로 떠나볼까요?</Label>
            </LabelWrapper>
            <FilterInputContainer>
              <FilterInput placeholder="지역 또는 사업장명 입력" />
              <LocationButton>
                <Image
                  src="/assets/image 22.png"
                  alt="아이콘"
                  width={24}
                  height={24}
                />
                <span>내주변</span>
              </LocationButton>
            </FilterInputContainer>
          </FilterOption>
          <DropdownWrapper>
            <Dropdown onChange={onSidoChange} value={selectedSido}>
              <option value="">시/도 선택</option>
              {sidoOptions.map((sido) => (
                <option key={sido} value={sido}>
                  {sido}
                </option>
              ))}
            </Dropdown>
            {showGunguDropdown && (
              <Dropdown onChange={onGunguChange} value={selectedGungu}>
                <option value="">시/군/구 선택</option>
                {gunguOptions[selectedSido]?.map((gungu) => (
                  <option key={gungu} value={gungu}>
                    {gungu}
                  </option>
                ))}
              </Dropdown>
            )}
          </DropdownWrapper>
        </Content>
        <Buttons>
          <ResetButton>초기화</ResetButton>
          <SearchButton>검색하기</SearchButton>
        </Buttons>
      </SheetContainer>
    </>
  );
};

export default BottomSheet;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const SheetContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 100vh;
  max-width: 90%;
  background: ${({ theme }) => theme.colors.defaultBackground};
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 1000;
  border-radius: 20px;
  animation: slideUp 0.3s ease-out forwards;

  @keyframes slideUp {
    from {
      transform: translate(-50%, 100%);
    }
    to {
      transform: translate(-50%, -50%);
    }
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  flex-grow: 1;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 25px;
  cursor: pointer;
`;

const Separator = styled.hr`
  margin-top: 20px;
  color: #ababab;
`;

const Content = styled.div`
  margin-top: 16px;
  border: 1px solid ${({ theme }) => theme.colors.divider};
  padding: 10px;
  border-radius: 10px;
  width: 560px;
  height: 453px;
`;

const FilterOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Label = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const FilterInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

const FilterInput = styled.input`
  flex-grow: 1;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: 20px;
  width: 440px;
  height: 60px;
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.divider};
  font-size: 20px;
`;

const LocationButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  width: 73px;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.defaultBackground};
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
  cursor: pointer;

  img {
    width: 30px;
    height: 33.75px;
    margin-bottom: 4px;
    filter: invert(17%) sepia(90%) saturate(5950%) hue-rotate(209deg) brightness(95%) contrast(101%);
  }

  span {
    font-size: 12px;
  }
`;

const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  margin-top: 20px;
  margin-left: 10px;
`;

const Dropdown = styled.select`
  width: 230px;
  height: 64px;
  background-color: #f2f2f2;
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: 20px;
  font-size: 16px;
  padding: 5px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

const ResetButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.defaultBackground};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  width: 219px;
  height: 73px;
  cursor: pointer;
  position: fixed;
  bottom: 10px;
  margin-left: 10px;
  font-size: 24px;
  font-weight: bold;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 326px;
  height: 73px;
  position: fixed;
  bottom: 10px;
  left: 260px;
  font-size: 24px;
  font-weight: bold;
`;
