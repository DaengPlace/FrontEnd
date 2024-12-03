"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import Checkbox from "@/components/common/Checkbox/Checkbox";
import Button from "@/components/common/Button/Button";
import SelectBox from "@/components/common/SelectBox/SelectBox";
import Header from "@/components/signin/Header/Header";

const SigninInfoPage = () => {
  const router = useRouter();
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
      <Header
        titleLines={["원활한 서비스 이용을 위해", "추가 정보를 입력해주세요"]}
        onBack={() => router.push("/signin")}
        onClose={() => router.push("/")}
      />
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
              router.push("/signin/profile");
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

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  p {
    font-size: 1.1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary};
  }
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
