"use client";

import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { SuitHeartFill } from '@styled-icons/bootstrap/SuitHeartFill';
import theme from "@/styles/theme.js";

const facilities = [
  {id:1, image: "/assets/mypage/facilityImage.png", name: "간식곳간", category: "반려동물용품점", rating: 5.0, reviewCnt: 14, address: "경기도 고양시 일산동구 백마로 195", startTime: "11:00", endTime: "20:00", dayoff: "Mon", is_parking: true, weather_type: 1, weight_limit: 0, pet_fee: 0 },
  {id:2, image: "/assets/mypage/facilityImage.png", name: "강아지 고양이 편의점 백석점", category: "반려동물용품점", rating: 5.0, reviewCnt: 12, address: "경기도 고양시 일산동구 백마로 195", startTime: "11:00", endTime: "20:00", dayoff: "Mon", is_parking: true, weather_type: 0, weight_limit: 0, pet_fee: 0 }
]

const BookmarkPage = () => {
  return (
    <Container>
      
      {facilities.map((fac) => (
        <BigFacilityCard key={fac.id}>
          <ImageWrapper>
            <FacilityImage src={fac.image} alt={fac.name} width={510} height={300} />
            <FavoriteButton><FavoriteIcon /></FavoriteButton>
          </ImageWrapper>

          <FacilityInfo>
            <RowLayout>
              <Category>{fac.category}</Category>
              <Rating>
                ★ {fac.rating.toFixed(1)} <span>({fac.reviewCnt})</span>
              </Rating>
            </RowLayout>
            <Information>
              <Name>{fac.name}</Name>
              <Address>{fac.address}</Address>
              <Details>
                운영시간 {fac.startTime} ~ {fac.endTime} | {fac.dayoff}
              </Details>
            </Information>
            <Tags>
              {fac.is_parking && <Tag>주차 가능</Tag>}
              {fac.weather_type === 1 && <Tag>실내공간</Tag>}
              {fac.weight_limit === 0 && <Tag>무게 제한 없음</Tag>}
              {fac.pet_fee === 0 && <Tag>애견 동반 요금 없음</Tag>}
            </Tags>

          </FacilityInfo>

        </BigFacilityCard>
      ))}

    </Container>
  );
};

export default BookmarkPage;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BigFacilityCard = styled.div`
  width: 540px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin-bottom: 20px;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const FacilityImage = styled(Image)`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const FavoriteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border: none;
  cursor: pointer;
  background-color: transparent;
`;

const FavoriteIcon = styled(SuitHeartFill)`
  width: 24px;
  height: 24px;
  color: white;
  transition: color 0.3s;
`;

const FacilityInfo = styled.div`
  padding: 10px 15px;
`;

const RowLayout = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3px;
`;

const Category = styled.div`
  font-size: 12px;
  background: ${theme.colors.tertiary};
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 5px;
`;

const Rating = styled.div`
  font-size: 14px;
  color: ${theme.colors.primary};
  margin-bottom: 10px;
  font-weight: bold;

  span {
    color: ${theme.colors.divider};
  }
`;

const Information = styled.div`
  margin-left: 5px;
  border-bottom: 1px solid ${theme.colors.divider};
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Address = styled.div`
  font-size: 14px;
  color: #777;
  margin-bottom: 10px;
`;

const Details = styled.div`
  font-size: 12px;
  color: #555;
  margin-bottom: 10px;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 8px;
`;

const Tag = styled.div`
  font-size: 12px;
  background: #f0f0f0;
  color: #555;
  padding: 5px 10px;
  border-radius: 20px;
`;