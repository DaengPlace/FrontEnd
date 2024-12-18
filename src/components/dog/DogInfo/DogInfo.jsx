"use client";

import styled from "styled-components";
import Image from "next/image";
import { useDogStore } from "@/stores/dogStore";

const DogInfo = () => {
  const { dogData } = useDogStore();

  const calculateAge = (birthDate) => {
    if (!birthDate || birthDate.length !== 8) return "";

    const year = parseInt(birthDate.slice(0, 4), 10);
    const month = parseInt(birthDate.slice(4, 6), 10);
    const day = parseInt(birthDate.slice(6, 8), 10);

    const today = new Date();
    const birth = new Date(year, month - 1, day);

    let ageYears = today.getFullYear() - birth.getFullYear();
    let ageMonths = today.getMonth() - birth.getMonth();

    if (today.getDate() < birth.getDate()) {
      ageMonths -= 1;
    }

    if (ageMonths < 0) {
      ageYears -= 1;
      ageMonths += 12;
    }

    return `${ageYears}살 ${ageMonths}개월`;
  };

  const dogDetails = [
    { title: "견종", value: dogData.breed || "" },
    { title: "나이", value: calculateAge(dogData.birthDate) },
    { title: "성별", value: dogData.gender || "" },
    { title: "중성화", value: dogData.isNeutered ? "했어요" : "안했어요" },
    { title: "체중", value: `${dogData.weight || "0"} kg` },
  ];

  return (
    <Container>
      <InfoContainer>
        <DogName>{dogData.name || "이름 없음"}</DogName>
        <DogDetailBox>
          {dogDetails.map((detail, index) => (
            <DogDetail key={index}>
              <DetailTitle>{detail.title}</DetailTitle> {detail.value}
            </DogDetail>
          ))}
        </DogDetailBox>
      </InfoContainer>
      <StyledImage
        src="/assets/dog/default_profile.svg"
        alt="강아지 프로필"
        width={120}
        height={120}
      />
    </Container>
  );
};

export default DogInfo;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 25px 40px;
  width: 100%;
  border: 1px solid #0019f4;
  border-radius: 20px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const DogName = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.black};
`;

const DogDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const DogDetail = styled.p`
  font-size: 16px;
  display: flex;
  gap: 10px;
`;

const DetailTitle = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.divider};
  width: 80px;
`;

const StyledImage = styled(Image)`
  border-radius: 8px;
`;
