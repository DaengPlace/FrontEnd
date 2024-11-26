"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import Checkbox from "@/components/common/Checkbox/Checkbox";
import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import Header from "@/components/signin/Header/Header";

const DogInfoPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const inputRefs = useRef([]);
  const [dogInfo, setDogInfo] = useState({
    name: "",
    breed: "",
    birthDate: "",
    gender: null,
    neutered: null,
    weightWhole: "",
    weightDecimal: "",
  });

  const handleInputChange = (key, value) => {
    setDogInfo((prev) => ({ ...prev, [key]: value }));
  };

  const isStepComplete = (currentStep) => {
    switch (currentStep) {
      case 0:
        return dogInfo.name.trim() !== "";
      case 1:
        return dogInfo.breed.trim() !== "";
      case 2:
        return dogInfo.birthDate.trim() !== "";
      case 3:
        return dogInfo.gender !== null;
      case 4:
        return dogInfo.neutered !== null;
      case 5:
        return (
          dogInfo.weightWhole.trim() !== "" &&
          dogInfo.weightDecimal.trim() !== ""
        );
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (step < 5) {
      setStep((prevStep) => prevStep + 1);
    } else {
      router.push("/dog/confirm");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && isStepComplete(step)) {
      handleNextStep();
    }
  };

  useEffect(() => {
    const currentRef = inputRefs.current[step];
    if (currentRef) {
      currentRef.focus();
    }
  }, [step]);

  return (
    <Container onKeyDown={handleKeyDown} tabIndex={0}>
      <Header
        titleLines={["우리 댕댕이의 정보를", "알려주세요"]}
        onBack={() => router.push("/")}
        onClose={() => router.push("/")}
      />

      <InputContainer>
        {step >= 0 && (
          <InputBox>
            <p>이름</p>
            <Input
              ref={(el) => (inputRefs.current[0] = el)}
              type="text"
              placeholder="강아지 이름 입력"
              value={dogInfo.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </InputBox>
        )}

        {step >= 1 && (
          <InputBox>
            <p>견종</p>
            <Input
              ref={(el) => (inputRefs.current[1] = el)}
              type="text"
              placeholder="견종을 입력하세요"
              value={dogInfo.breed}
              onChange={(e) => handleInputChange("breed", e.target.value)}
            />
          </InputBox>
        )}

        {step >= 2 && (
          <InputBox>
            <p>생년월일</p>
            <Input
              ref={(el) => (inputRefs.current[2] = el)}
              type="text"
              value={dogInfo.birthDate}
              placeholder="생년월일 ex) 000101"
              onChange={(e) => handleInputChange("birthDate", e.target.value)}
            />
          </InputBox>
        )}

        {step >= 3 && (
          <InputBox>
            <p>성별</p>
            <BoxContainer>
              <Checkbox
                label="여아"
                isChecked={dogInfo.gender === "여아"}
                onClick={() => handleInputChange("gender", "여아")}
              />
              <Checkbox
                label="남아"
                isChecked={dogInfo.gender === "남아"}
                onClick={() => handleInputChange("gender", "남아")}
              />
            </BoxContainer>
          </InputBox>
        )}

        {step >= 4 && (
          <InputBox>
            <p>중성화 수술 여부</p>
            <BoxContainer>
              <Checkbox
                label="했어요"
                isChecked={dogInfo.neutered === "했어요"}
                onClick={() => handleInputChange("neutered", "했어요")}
              />
              <Checkbox
                label="안했어요"
                isChecked={dogInfo.neutered === "안했어요"}
                onClick={() => handleInputChange("neutered", "안했어요")}
              />
            </BoxContainer>
          </InputBox>
        )}

        {step >= 5 && (
          <InputBox>
            <p>몸무게</p>
            <BoxContainer>
              <Input
                ref={(el) => (inputRefs.current[5] = el)}
                type="number"
                placeholder="소수점 앞자리"
                value={dogInfo.weightWhole}
                onChange={(e) =>
                  handleInputChange("weightWhole", e.target.value)
                }
              />
              <span> . </span>
              <Input
                type="number"
                placeholder="소수점 뒷자리"
                value={dogInfo.weightDecimal}
                onChange={(e) =>
                  handleInputChange("weightDecimal", e.target.value)
                }
              />
            </BoxContainer>
          </InputBox>
        )}
      </InputContainer>

      <ButtonContainer>
        <Button
          isActive={isStepComplete(step)}
          onClick={handleNextStep}
          type="button"
        >
          {step < 5 ? "다음" : "확인"}
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default DogInfoPage;

const Container = styled.div`
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  outline: none; /* Enter 키 활성화를 위해 tabIndex 추가 */
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.black};
  font-size: 1.4rem;
  margin-bottom: 3rem;
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
  align-items: center;
  gap: 10px;

  span {
    font-size: 1.2rem;
  }
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
