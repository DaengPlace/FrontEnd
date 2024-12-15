"use client";

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useDogStore } from "@/stores/dogStore";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";
import Header from "@/components/signin/Header/Header";
import Checkbox from "@/components/common/Checkbox/Checkbox";
import axios from "axios";

const DogEditPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const petId = searchParams.get("petId");

  const inputRefs = useRef([]);

  const {
    control,
    formState: { errors }, trigger
  } = useForm({
    mode: "onChange",
  });
  const [dogInfo, setDogInfo] = useState({
    name: "",
    breed: "",
    birthDate: "",
    gender: null,
    neutered: "",
    weightWhole: "",
    weightDecimal: "",
  });

  // 반려견 정보 가져오기
  useEffect(() => {
    const fetchDogInfo = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`https://api/daengplace.com/members/pets/${petId}`, {
          headers: {
            'Accept': "application/json",
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = response.data.data;

        console.log(data);

        // 상태 초기화
        setDogInfo({
          name: data.name,
          breed: data.breed,
          birthDate: data.birthDate,
          gender: data.gender === "MALE" ? "남아" : "여아",
          neutered: data.isNeutered ? "했어요" : "안했어요",
          weightWhole: String(Math.floor(data.weight)), 
          weightDecimal: String((data.weight % 1).toFixed(1).split(".")[1]), 
        });
      } catch (error) {
        console.error("반려견 정보 가져오기 실패 : ", error);
      }
    };

    if (petId) fetchDogInfo();
  }, [petId]);

  const handleInputChange = (key, value) => {
    setDogInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    const isValid = await trigger(["birthDate"]); // 폼 검증
    if (isValid) {
      try {
        const token = localStorage.getItem("accessToken");
        const updatedWeight = parseFloat(`${dogInfo.weightWhole}.${dogInfo.weightDecimal}`);
        const payload = {
          name: dogInfo.name,
          breed: dogInfo.breed,
          birthDate: `20${dogInfo.birthDate.slice(0, 2)}-${dogInfo.birthDate.slice(2, 4)}-${dogInfo.birthDate.slice(4, 6)}`, // "230101" → "2023-01-01"
          gender: dogInfo.gender === "남아" ? "MALE" : "FEMALE",
          isNeutered: dogInfo.neutered === "했어요",
          weight: updatedWeight,
        };

        const response = await axios.put(
          `https://api.daengplace.com/members/pets/${petId}`,
          payload,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("정보가 성공적으로 수정되었습니다!");
        router.push("/dog/info");
      } catch (error) {
        console.error("반려견 정보 수정 실패:", error);
        alert("정보 수정에 실패했습니다. 다시 시도해주세요.");
      }
    } else {
      alert("생년월일을 올바르게 입력해주세요.");
    }
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
                message: "생년월일은 6자리 숫자여야 합니다. (예: 240101)",
              },
            }}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  ref={(el) => (inputRefs.current[2] = el)}
                  placeholder="생년월일 (예: 240101)"
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

export default DogEditPage;

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
