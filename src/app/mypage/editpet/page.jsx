"use client";

import React, { useEffect, useState, useRef, Suspense } from "react";
import styled from "styled-components";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";
import Checkbox from "@/components/common/Checkbox/Checkbox";
import { putPetUpdate } from "@/apis/dog/putPetUpdate";
import { getPetDetail } from "@/apis/dog/getPetDetail";
import Header from "@/components/common/Header/Header";
import { deletePet } from "@/apis/dog/deletePet";
import Modal from "@/components/common/Modal/Modal";

const EditPetPage = () => {
  return (
    <Suspense>
      <ActualEditPetPage />
    </Suspense>
  )
}

const ActualEditPetPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const petId = searchParams.get("petId");
  const inputRefs = useRef([]);
  const [birthDateError, setBirthDateError] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [petInfo, setPetInfo] = useState({
    name: "",
    breed: "",
    birthDate: "",
    gender: null,
    isNeutered: null,
    weightWhole: "",
    weightDecimal: "",
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    const fetchPetInfo = async () => {
      try {
        const response = await getPetDetail(petId);
        const data = response.data;
        const formattedBirthDate = data.birthDate.split("T")[0].replace(/-/g, "");

        setPetInfo({
          name: data.name || "",
          breed: data.breed || "",
          birthDate: formattedBirthDate || "",
          gender: data.gender === "MALE" ? "남아" : "여아",
          isNeutered: data.isNeutered ? "했어요" : "안했어요",
          weightWhole: String(Math.floor(data.weight)) || "",
          weightDecimal: String((data.weight % 1).toFixed(1).split(".")[1]) || "",
        });
      } catch (error) {
        console.error("반려견 정보를 불러오는데 실패했습니다.", error);
      }
    };

    if (petId) fetchPetInfo();
  }, [petId]);

  const handleInputChange = (key, value) => {
    if (key === "birthDate") {
      const onlyNumbers = value.replace(/\D/g, ""); // 숫자만 허용
      if (onlyNumbers.length <= 8) {
        setPetInfo((prev) => ({ ...prev, [key]: onlyNumbers }));
  
        // 에러 메시지 설정
        if (onlyNumbers.length !== 8 && onlyNumbers.length > 0) {
          setBirthDateError("생년월일은 8자리 숫자여야 합니다. (예: 20240101)");
        } else {
          setBirthDateError(""); // 에러 메시지 초기화
        }
      }
    } else {
      setPetInfo((prev) => ({ ...prev, [key]: value }));
    }
  };

  const isFormValid = () => {
    const { name, breed, birthDate, gender, isNeutered, weightWhole, weightDecimal } = petInfo;
  
    // 입력값이 모두 존재하고, 생년월일이 8자리 숫자인지 확인
    return (
      name.trim() &&
      breed.trim() &&
      /^\d{8}$/.test(birthDate) &&
      gender &&
      isNeutered &&
      weightWhole.trim() &&
      weightDecimal.trim()
    );
  };
  const onSubmit = async () => {
    const updatedWeight = parseFloat(
      `${petInfo.weightWhole}.${petInfo.weightDecimal}`
    );

    const updatedData = {
      name: petInfo.name,
      breed: petInfo.breed,
      birthDate: petInfo.birthDate,
      weight: updatedWeight,
      gender: petInfo.gender === "남아" ? "MALE" : "FEMALE",
      isNeutered: petInfo.isNeutered === "했어요",
    };

    try {
      await putPetUpdate(petId, updatedData);
      router.push("/mypage")
    } catch (error) {
      console.error("반려견 정보 수정에 실패했습니다.", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deletePet(petId);
      router.push('/mypage')
    } catch (error) {
      console.error("반려견 삭제 요청 중 오류가 발생하였습니다.")
    }
  }

  return (
    <Container>
      <Header title={"강아지 정보 수정"} backbuttonPath={"/mypage"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <InputBox>
            <p>이름</p>
            <Input
              type="text"
              placeholder="반려견 이름"
              value={petInfo.name || ""}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
            {!petInfo.name && <ErrorText>필수 입력 항목입니다</ErrorText>}
          </InputBox>
          <InputBox>
            <p>견종</p>
            <Input
              style={{"color": "gray"}}
              type="text"
              placeholder="견종 입력"
              value={petInfo.breed || ""}
              readOnly
            />
          </InputBox>
          <InputBox>
            <p>생년월일</p>
            <Input
              placeholder="생년월일 (예: 20240101)"
              type="text"
              maxLength={8}
              value={petInfo.birthDate || ""}
              onChange={(e) => handleInputChange("birthDate", e.target.value)}
            />
            {birthDateError && <ErrorText>{birthDateError}</ErrorText>}
            {!petInfo.birthDate && !birthDateError && (
              <ErrorText>생년월일은 필수입니다.</ErrorText>
            )}
          </InputBox>
          <InputBox>
            <p>성별</p>
            <BoxContainer>
              <Checkbox
                label="여아"
                isChecked={petInfo.gender === "여아"}
                onClick={() => handleInputChange("gender", "여아")}
              />
              <Checkbox
                label="남아"
                isChecked={petInfo.gender === "남아"}
                onClick={() => handleInputChange("gender", "남아")}
              />
            </BoxContainer>
          </InputBox>
          <InputBox>
            <p>중성화 수술 여부</p>
            <BoxContainer>
              <Checkbox
                label="했어요"
                isChecked={petInfo.isNeutered === "했어요"}
                onClick={() => handleInputChange("isNeutered", "했어요")}
              />
              <Checkbox
                label="안했어요"
                isChecked={petInfo.isNeutered === "안했어요"}
                onClick={() => handleInputChange("isNeutered", "안했어요")}
              />
            </BoxContainer>
          </InputBox>
          <InputBox>
            <p>몸무게 (kg)</p>
            <BoxContainer>
              <Input
                type="number"
                placeholder="소수점 앞자리"
                value={petInfo.weightWhole || ""}
                onChange={(e) =>
                  handleInputChange("weightWhole", e.target.value)
                }
              />
              <Dot> . </Dot>
              <Input
                type="number"
                placeholder="소수점 뒷자리"
                value={petInfo.weightDecimal || ""}
                onChange={(e) =>
                  handleInputChange("weightDecimal", e.target.value)
                }
              />
            </BoxContainer>
            {(!petInfo.weightWhole || !petInfo.weightDecimal) && (
              <ErrorText>필수 입력 항목입니다</ErrorText>
            )}
          </InputBox>
        </InputContainer>
        <FixedButtonContainer>
          <DeleteButtonWrapper>
            <StyledDeleteButton
              isActive={true}
              onClick={() => setIsDeleteModalOpen(true)}
              type="button"
            >삭제</StyledDeleteButton>
          </DeleteButtonWrapper>
          <SaveButtonWrapper>
            <Button isActive={isFormValid()} disabled={!isFormValid()} type="submit">
              저장 
            </Button>
          </SaveButtonWrapper>
        </FixedButtonContainer>
      </form>

      {isDeleteModalOpen && (
        <Modal
          title="반려견 정보를 삭제하시겠습니까?"
          cancelText="취소"
          confirmText="확인"
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          isDanger={true}
        />
      )}

    </Container>
  );
};

export default EditPetPage;

const Container = styled.div`
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  margin-top: 50px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 5px;
    color: ${({ theme }) => theme.colors.divider};
  }
`;

const BoxContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Dot = styled.span`
  font-size: 1.5rem;
  position: relative;
  top: 5px;
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
  gap: 10px;
`;

const SaveButtonWrapper = styled.div`
  flex: 1;
  width: 50%;
`;

const DeleteButtonWrapper = styled.div`
  flex: 1;
  max-width: 50%;
`;

const StyledDeleteButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.caution};
  color: white;
`;

const ErrorText = styled.span`
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
`;