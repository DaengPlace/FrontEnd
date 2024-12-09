import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import AuthGuard from "@/components/common/AuthGuard/AuthGuard";

const Card = ({ card, onCardClick, toggleLike }) => {
  const features = [];
  if (card.inside == true) features.push("실내공간"); 
  if (card.outside == true) features.push("야외공간"); 
  if (card.is_parking == true) features.push("주차 가능"); 
  if (card.pet_fee === 0) features.push("애견 동반 요금 없음"); 
  if (card.weight_limit === 0) features.push("무게 제한 없음"); 
  
  const getOperationHours = () => {
    if (card.operationHour) {
      const openTime = card.operationHour.todayOpen;
      const closeTime = card.operationHour.todayClose;

      if (openTime === "00:00:00" && closeTime === "00:00:00") {
        return "24시간 영업";
      }

      return `${openTime || "N/A"} - ${closeTime || "N/A"}`;
    }
    return "운영 시간 정보 없음";
  };

  return (
    <CardContainer
      onClick={(e) => {
        e.stopPropagation(); // 이벤트 전파 방지
        onCardClick(card.id); // 카드 전체 클릭 시 실행
      }}
    >
      <AuthGuard>
        <HeartIconContainer onClick={(e) => toggleLike(e, card.placeId)} isliked={card.isLiked}>
          {card.isLiked ? <Favorite /> : <FavoriteBorder />}
        </HeartIconContainer>
      </AuthGuard>
      <Image
        src={card.image || "/assets/image 19.png"}
        alt={card.name || "이미지 설명 없음"}
        width={510}
        height={300}
        style={{
          objectFit: "cover",
          borderRadius: "10px",
          margin: "10px 13px",
        }}
      />
      <CardDetails>
        <Category>
          <CategoryBadge>{card.category}</CategoryBadge>
          <RatingContainer>
            <Image src="/assets/star.png" alt="별" width={15} height={15} />
            <Rating>{card.rating || 0.0}</Rating>
            <ReviewsCount>({card.review_count || 0})</ReviewsCount>
          </RatingContainer>
        </Category>
        <PlaceName>{card.name}</PlaceName>
        <Address>{card.location || "위치 정보 없음"}</Address>
        <OpeningHours>{getOperationHours()}</OpeningHours>
        <hr />
      </CardDetails>
      <Bottom>
        {features.length > 0 ? features.join(" | ") : "특징 없음"}
      </Bottom>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.defaultBackground};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.divider};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 32rem;
  margin-left: 30px;
  cursor: pointer;
`;

const HeartIconContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !["hovered", "isliked"].includes(prop),
})`
  position: absolute;
  top: 30px;
  right: 30px;
  cursor: pointer;
  width: 32px;
  height: 32px;
  z-index: 10;

  &.heart-icon-container {
  }

  svg {
    font-size: 30px;
    color: ${({ isliked }) => (isliked ? "red" : "#FFFFFF")};
    transition: transform 0.2s ease, color 0.2s ease;
  }

  &:hover svg {
    transform: scale(1.2);
  }
`;

const CardDetails = styled.div`
  padding: 8px;
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const CategoryBadge = styled.div`
  display: inline-block;
  padding: 5px 10px; 
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  background: #01003f;
  border-radius: 20px;
  text-align: center;
  line-height: 1; 
  white-space: nowrap; 
  margin-left: 10px;
`;

const RatingContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 2px; 
    margin-right: 15px;
`;

const Rating = styled.span`
  font-size: 17px;
  font-weight: bold;
  margin-left: 3px;
`;

const PlaceName = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin: 10px 10px;
`;

const Address = styled.p`
  font-size: 15px;
  color:${({ theme }) => theme.colors.black};
  margin-left: 10px;
`;

const OpeningHours = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.black};
  margin-left: 10px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Bottom = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.divider};
  margin-left: 17px;
`;
const ReviewsCount = styled.span`
  font-size: 17px;
  color: ${({ theme }) => theme.colors.divider};
`;
export default Card;
