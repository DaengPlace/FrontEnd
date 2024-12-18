"use client";
import React, {useState} from "react";
import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SelectBox from "@/components/common/SelectBox/SelectBox";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";

const BottomSheet = ({
  isOpen,
  onClose,
  selectedSido,
  selectedGungu,
  setSelectedSido, 
  setSelectedGungu, 
  sidoOptions,
  gunguOptions,
}) => {
  const router = useRouter();
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [inputValue, setInputValue] = useState("");

  if (!isOpen) return null;
  
  const handleReset = () => {
    setSelectedSido("");
    setSelectedGungu("");
    setUseCurrentLocation(false);
    setInputValue("");; 
  };

  const handleLocationClick = () => {
    setUseCurrentLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          router.push(`/place/placemap?lat=${latitude}&lng=${longitude}`);
        },
        () => alert("현재 위치를 가져올 수 없습니다.")
      );
    } else {
      alert("브라우저가 현재 위치 기능을 지원하지 않습니다.");
    }
    handleReset();
  };

  const handleSearch = async () => {
    if (useCurrentLocation) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            router.push(`/place/placemap?lat=${latitude}&lng=${longitude}`);
          },
          () => alert("현재 위치를 가져올 수 없습니다.")
        );
      } else {
        alert("브라우저가 현재 위치 기능을 지원하지 않습니다.");
      }
    } else if (inputValue) {
      console.log("Search Term:", inputValue);
      router.push(`/place/placemap?name=${encodeURIComponent(inputValue)}`);
    } else if (selectedSido || selectedGungu) {
      const location = `${selectedSido} ${selectedGungu || ""}`.trim();
  
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            location
          )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );
  
        const data = await response.json();
  
        if (data.status === "OK" && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          router.push(`/place/placemap?lat=${lat}&lng=${lng}`);
        } else {
          alert("선택한 위치의 좌표를 가져올 수 없습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
        alert("위치를 검색하는 중 오류가 발생했습니다.");
      }
    } else {
      alert("지역 또는 사업장명을 입력하거나 시/도를 선택해주세요.");
    }
  };
  
  
  return (
    <>
      <Overlay onClick={onClose} />
      <Sheet>
        <BottomSheetHeader>
          <Title>검색</Title>
          <CloseButton onClick={onClose}><CloseOutline width={30} height={30} /></CloseButton>
        </BottomSheetHeader>
        <hr style={{ marginTop: "20px", color: "#ABABAB" }} />
        <BottomSheetContent>

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
              <FilterWrapper>
              <SearchIcon>
                <Image
                  src="/assets/image 14.png"
                  alt="돋보기"
                  width={20}
                  height={20}
                />
              </SearchIcon>
              <FilterInput
                placeholder="사업장명 입력"
                value={inputValue || ""}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={useCurrentLocation}
              />
              </FilterWrapper>
              <LocationButton onClick={handleLocationClick}>
                <img src="/assets/image 22.png" alt="위치 아이콘" />
                <span>내주변</span>
              </LocationButton>
            </FilterInputContainer>
          </FilterOption>

          <DropdownWrapper>
            <SelectBoxWrapper>
            <SelectBox
              options={sidoOptions.map((sido) => ({
                value: sido,
                label: sido,
              }))}
              selectedValue={selectedSido}
              onChange={(value) => {
                setSelectedSido(value);
                if (value === "전국") {
                  setSelectedGungu(""); 
                } else {
                  setSelectedGungu(""); 
                }
              }}
              placeholder="시/도 선택"
              disabled={useCurrentLocation}
            />
            </SelectBoxWrapper>
            {selectedSido && selectedSido !== "전국" && !useCurrentLocation && (
              <SelectBoxWrapper>
              <SelectBox
                options={(gunguOptions[selectedSido] || []).map((gungu) => ({
                  value: gungu,
                  label: gungu,
                }))}
                selectedValue={selectedGungu}
                onChange={setSelectedGungu}
                placeholder="시/군/구 선택"
              />
              </SelectBoxWrapper>
            )}
          </DropdownWrapper>
        </BottomSheetContent>
        <BottomSheetButtons>
          <ResetButton onClick={handleReset}>초기화</ResetButton>
          <SearchButton onClick={handleSearch}>검색하기</SearchButton>
        </BottomSheetButtons>
        
      </Sheet>
    </>
  );
};

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative; 
  width: 100%;
`
const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 30px;
  transform: translateY(-50%);
  width: 24px;
  z-index: 1;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const Sheet = styled.div`
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
  border-radius: 20px 20px 0 0;
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

const BottomSheetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
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

const BottomSheetContent = styled.div`
  margin-top: 20px;
  border: 1px solid ${({ theme }) => theme.colors.divider};
  padding: 10px;
  border-radius: 10px;
  width: 100%;
  height: 453px;
`;

const FilterOption = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 10px;
`;

const Label = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const FilterInputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  padding: 8px 10px;
`;

const FilterInput = styled.input`
  flex-grow: 1;
  padding: 8px 16px 8px 60px;
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: 20px;
  width: 80%;
  height: 60px;
  color: ${({ theme }) => theme.colors.divider};
  font-size: 18px;
`;

const LocationButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  width: 30%;
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

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};

  span {
    font-size: 12px;
  }
`;

const DropdownWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
  align-items: center;
  flex-wrap: wrap;
`;

const BottomSheetButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
  width: 100%;
  position: relative;
  bottom: 0;
  padding: 10px 0;
  position: absolute;
  bottom: 20px;
  left: 0;
  padding: 0 20px;

`;

const ResetButton = styled.button`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.defaultBackground};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  height: 50px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const SearchButton = styled.button`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 10px;
  height: 50px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const SelectBoxWrapper = styled.div`
  flex: 1;
  max-width: 210px;
  min-width: 210px;
`;
export default BottomSheet;