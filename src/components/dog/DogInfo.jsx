"use client";

import styled from "styled-components";
import Image from "next/image";

const DogInfo = ({ dog }) => {
  const dogDetails = [
    { title: "견종", value: dog.type },
    { title: "나이", value: dog.age },
    { title: "성별", value: dog.gender },
    { title: "중성화", value: dog.neutralization },
    { title: "체중", value: dog.weight },
  ];

  return (
    <Container>
      <InfoContainer>
        <DogName>{dog.name}</DogName>
        <DogDetailBox>
          {dogDetails.map((detail, index) => (
            <DogDetail key={index}>
              <DetailTitle>{detail.title} </DetailTitle> {detail.value}
            </DogDetail>
          ))}
        </DogDetailBox>
      </InfoContainer>
      <ImageContainer>
        <ProfileImageWrapper>
          <StyledImage
            src="/assets/dog/default_profile.svg"
            alt="강아지 프로필"
            width={120}
            height={120}
          />
          <EditIcon
            src="/assets/common/camera.svg"
            alt="수정"
            width={34}
            height={34}
          />
        </ProfileImageWrapper>
      </ImageContainer>
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

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledImage = styled(Image)`
  border-radius: 8px;
`;

const EditIcon = styled(Image)`
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 50%;
  background: white;
  padding: 2px;
  cursor: pointer;
`;
