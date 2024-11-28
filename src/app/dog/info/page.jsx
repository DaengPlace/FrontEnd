"use client";

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";
import Header from "@/components/signin/Header/Header";
import Checkbox from "@/components/common/Checkbox/Checkbox";

const DogInfoPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const inputRefs = useRef([]);
  const {
    control,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
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

  const getFieldName = (currentStep) => {
    switch (currentStep) {
      case 1:
        return "name";
      case 2:
        return "breed";
      case 3:
        return "birthDate";
      case 4:
        return "gender";
      case 5:
        return "neutered";
      case 6:
        return "weight";
      default:
        return "";
    }
  };

  const isCurrentStepValid = async () => {
    switch (step) {
      case 1:
        return dogInfo.name.trim() !== "";
      case 2:
        return dogInfo.breed.trim() !== "";
      case 3:
        return await trigger("birthDate");
      case 4:
        return dogInfo.gender !== null;
      case 5:
        return dogInfo.neutered !== null;
      case 6:
        return (
          dogInfo.weightWhole.trim() !== "" &&
          dogInfo.weightDecimal.trim() !== ""
        );
      default:
        return false;
    }
  };

  const handleNextStep = async () => {
    const isValid = await isCurrentStepValid();
    if (isValid) {
      setStep((prevStep) => prevStep + 1);
      const nextRef = inputRefs.current[step];
      if (nextRef) {
        nextRef.focus();
      }
    }
  };

  useEffect(() => {
    const currentRef = inputRefs.current[step - 1];
    if (currentRef) {
      currentRef.focus();
    }
  }, [step]);

  return (
    <Container
      tabIndex={0}
      onKeyDown={async (e) => {
        if (e.key === "Enter") {
          await handleNextStep();
        }
      }}
    >
      <Header
        titleLines={["우리 댕댕이의 정보를", "알려주세요"]}
        onBack={() => (step > 1 ? setStep(step - 1) : router.push("/"))}
        onClose={() => router.push("/")}
      />

      <InputContainer>
        {step >= 1 && (
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

        {step >= 2 && (
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

        {step >= 3 && (
          <InputBox>
            <p>생년월일</p>
            <Controller
              name="birthDate"
              control={control}
              rules={{
                required: "생년월일은 필수 입력입니다.",
                pattern: {
                  value: /^\d{6}$/,
                  message: "생년월일은 6자리 숫자여야 합니다. (예: 980918)",
                },
              }}
              render={({ field }) => (
                <>
                  <Input
                    {...field}
                    ref={(el) => (inputRefs.current[2] = el)}
                    placeholder="생년월일 (예: 980918)"
                    type="text"
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e);
                      handleInputChange("birthDate", e.target.value);
                    }}
                    isValid={!errors.birthDate}
                  />
                  {errors.birthDate && (
                    <ErrorText>{errors.birthDate.message}</ErrorText>
                  )}
                </>
              )}
            />
          </InputBox>
        )}

        {step >= 4 && (
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

        {step >= 5 && (
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

        {step >= 6 && (
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
        <Button isActive={true} onClick={handleNextStep} type="button">
          {step < 6 ? "다음" : "확인"}
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
  outline: none;
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

const ErrorText = styled.span`
  font-size: 1rem;
  color: red;
  margin-top: 5px;
  display: block;
`;
