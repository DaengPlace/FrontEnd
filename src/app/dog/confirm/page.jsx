"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import Button from "@/components/common/Button/Button";
import Header from "@/components/signin/Header/Header";
import DogInfo from "@/components/dog/DogInfo";
import { DOG } from "@/data/dogData";

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
          onClick={() => router.push("/dog/edit")}
          variant="outlined"
          className="edit"
          fullWidth
        >
          수정
        </Button>
        <Button onClick={() => router.push("/main")} isActive={true} fullWidth>
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
