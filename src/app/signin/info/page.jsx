"use client";

import { useState } from "react";
import styled from "styled-components";
import Checkbox from "@/components/common/Checkbox/Checkbox";
import Button from "@/components/common/Button/Button";
import SelectBox from "@/components/common/Selectbox/Selectbox";

const SigninInfoPage = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState({
    city: null,
    district: null,
  });

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const handleRegionChange = (key, value) => {
    setSelectedRegion((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Container>
      <Title>
        <p>원활한 서비스 이용을 위해</p>
        <p>추가 정보를 입력해주세요</p>
      </Title>
      <InputContainer>
        <InputBox>
          <p>성별</p>
          <BoxContainer>
            <Checkbox
              label="여성"
              isChecked={selectedGender === "여성"}
              onClick={() => handleGenderSelect("여성")}
            />
            <Checkbox
              label="남성"
              isChecked={selectedGender === "남성"}
              onClick={() => handleGenderSelect("남성")}
            />
          </BoxContainer>
        </InputBox>

        <InputBox>
          <p>활동 지역</p>
          <BoxContainer>
            <SelectBox
              placeholder="시/도"
              options={[
                { value: "seoul", label: "서울" },
                { value: "busan", label: "부산" },
                { value: "incheon", label: "인천" },
              ]}
              selectedValue={selectedRegion.city}
              onChange={(value) => handleRegionChange("city", value)}
            />
            <SelectBox
              placeholder="시/군/구"
              options={[
                { value: "gangnam", label: "강남구" },
                { value: "bukgu", label: "북구" },
                { value: "bupyeong", label: "부평구" },
              ]}
              selectedValue={selectedRegion.district}
              onChange={(value) => handleRegionChange("district", value)}
            />
          </BoxContainer>
        </InputBox>
      </InputContainer>

      <ButtonContainer>
        <Button
          isActive={
            selectedGender !== null &&
            selectedRegion.city !== null &&
            selectedRegion.district !== null
          }
          onClick={() => {
            if (
              selectedGender !== null &&
              selectedRegion.city &&
              selectedRegion.district
            ) {
              console.log("성별:", selectedGender);
              console.log("활동 지역:", selectedRegion);
            }
          }}
          hasImage={true}
          type="button"
        >
          확인
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default SigninInfoPage;

const Container = styled.div`
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.black};
  font-size: 1.4rem;
  margin-bottom: 3rem;
`;

const InputBox = styled.div`
  p {
    color: ${({ theme }) => theme.colors.primary};
  }
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 1.1rem;
`;

const BoxContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 2rem;
`;
