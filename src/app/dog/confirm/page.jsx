"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import Button from "@/components/common/Button/Button";
import Header from "@/components/signin/Header/Header";
import DogInfo from "@/components/dog/DogInfo";

const DOG = [
  {
    id: 1,
    name: "초코",
    type: "말티즈",
    age: "11개월",
    gender: "여아",
    neutralization: "수술 완료",
    weight: "2.5kg",
  },
];

const DogConfirmPage = () => {
  const router = useRouter();

  return (
    <Container>
      <Header
        titleLines={["입력하신 정보를", "확인해주세요"]}
        onBack={() => router.push("/")}
        onClose={() => router.push("/")}
      />
      <DogInfo dog={DOG[0]} />
      <ButtonBox>
        <Button
          onClick={() => router.push("/edit")}
          variant="outlined"
          className="edit"
          fullWidth
        >
          수정
        </Button>
        <Button
          onClick={() => router.push("/submit")}
          isActive={true}
          fullWidth
        >
          등록
        </Button>
      </ButtonBox>
    </Container>
  );
};

export default DogConfirmPage;

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
