"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import Button from "@/components/common/Button/Button";
import Header from "@/components/signin/Header/Header";
import DogInfo from "@/components/dog/DogInfo/DogInfo";
import { useDogStore } from "@/stores/dogStore";
import { postRegister } from "@/apis/dog/postRegister";
import Modal from "@/components/common/Modal/Modal";
import { useState } from "react";

const RegisterConfirmPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { dogData } = useDogStore();
  console.log(dogData);

  const handleRegister = async () => {
    try {
      await postRegister({
        name: dogData.name,
        breed: dogData.breed,
        birthDate: dogData.birthDate,
        weight: dogData.weight,
        gender: dogData.gender === "여아" ? "FEMALE" : "MALE",
        isNeutered: dogData.isNeutered,
      });
      router.push("/mypage");
    } catch (error) {
      alert("등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmModal = () => {
    router.push("/mypage");
  };

  return (
    <Container>
      <Header
        titleLines={["입력하신 정보를", "확인해주세요"]}
        onClose={() => router.push("/mypage")}
      />
      <DogInfo />
      <ButtonBox>
        <Button
          onClick={() => router.push("/mypage/registerpet/edit")}
          variant="outlined"
          className="edit"
          fullWidth
        >
          수정
        </Button>
        <Button onClick={handleRegister} isActive={true} fullWidth>
          등록
        </Button>
      </ButtonBox>

      {isModalOpen && (
        <Modal
          title="강아지 정보 등록을 중단하시겠습니까?"
          message={
            <>
              지금까지 작성된 정보는 <br /> 저장되지 않습니다
            </>
          }
          onCancel={closeModal}
          onConfirm={confirmModal}
          cancelText="계속 작성"
          confirmText="나가기"
        />
      )}
    </Container>
  );
};

export default RegisterConfirmPage;

const Container = styled.div`
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  outline: none;
`;

const ButtonBox = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 0 2rem;
`;
