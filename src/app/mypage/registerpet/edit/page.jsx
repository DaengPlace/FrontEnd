"use client";

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDogStore } from "@/stores/dogStore";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";
import Header from "@/components/signin/Header/Header";
import Checkbox from "@/components/common/Checkbox/Checkbox";

const RegisterEditPage = () => {
  const router = useRouter();
  const inputRefs = useRef([]);
  const { dogData, setDogData } = useDogStore();
  const {
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const [dogInfo, setDogInfo] = useState({
    name: dogData.name || "",
    breed: dogData.breed || "",
    birthDate: dogData.birthDate || "",
    gender: dogData.gender || null,
    neutered: dogData.isNeutered ? "했어요" : "안했어요",
    weightWhole: dogData.weight ? String(Math.floor(dogData.weight)) : "",
    weightDecimal: dogData.weight
      ? String((dogData.weight % 1).toFixed(1).split(".")[1])
      : "",
  });

  const handleInputChange = (key, value) => {
    setDogInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const updatedWeight = parseFloat(
      `${dogInfo.weightWhole}.${dogInfo.weightDecimal}`
    );
    setDogData({
      name: dogInfo.name,
      breed: dogInfo.breed,
      birthDate: dogInfo.birthDate,
      gender: dogInfo.gender === "여아",
      isNeutered: dogInfo.neutered === "했어요",
      weight: updatedWeight,
    });
    router.push("/dog/confirm");
  };

  return (
    <Container>
      <Header
        titleLines={["우리 댕댕이의", "정보를 수정해주세요"]}
        onBack={() => router.push("/dog/info")}
        onClose={() => router.push("/")}
      />
      <InputContainer>
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
        <InputBox>
          <p>몸무게</p>
          <BoxContainer>
            <Input
              ref={(el) => (inputRefs.current[5] = el)}
              type="number"
              placeholder="소수점 앞자리"
              value={dogInfo.weightWhole}
              onChange={(e) => handleInputChange("weightWhole", e.target.value)}
              min="0"
            />
            <span> . </span>
            <Input
              type="number"
              placeholder="소수점 뒷자리"
              value={dogInfo.weightDecimal}
              onChange={(e) =>
                handleInputChange("weightDecimal", e.target.value)
              }
              min="0"
            />
          </BoxContainer>
        </InputBox>
      </InputContainer>
      <FixedButtonContainer>
        <Button isActive={true} onClick={handleSave} type="button">
          확인
        </Button>
      </FixedButtonContainer>
    </Container>
  );
};

export default RegisterEditPage;

const Container = styled.div`
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  outline: none;
  margin-bottom: 5rem;
`;

const InputContainer = styled.div`
  flex: 1;
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

const FixedButtonContainer = styled.div`
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  padding: 0 2rem;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
`;

const ErrorText = styled.span`
  font-size: 1rem;
  color: red;
  margin-top: 5px;
  display: block;
`;