import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import AuthGuard from "@/components/common/AuthGuard/AuthGuard";

const PlaceInfo = ({
  isLiked,
  toggleLike,
  address,
  handleAddressClick,
  category,
  placeName,
  openhours,
  features,
}) => {
  const [showHours, setShowHours] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(false);
  const [closingTime, setClosingTime] = useState(null);

  const dayLabels = {
    monday: "월요일",
    tuesday: "화요일",
    wednesday: "수요일",
    thursday: "목요일",
    friday: "금요일",
    saturday: "토요일",
    sunday: "일요일",
  };
  const featureList = [];
  if (features.inside) featureList.push("실내공간");
  if (features.outside) featureList.push("야외공간");
  if (features.isParking) featureList.push("주차 가능");
  if (features.petFee === 0) featureList.push("애견 동반 요금 없음");
  if (features.weightLimit === 0) featureList.push("무게 제한 없음");

  const getCurrentDayKey = () => {
    const today = new Date();
    const dayMap = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return dayMap[today.getDay()];
  };

  const checkIsOpen = () => {
    const currentDay = getCurrentDayKey();
    const open = openhours?.[`${currentDay}Open`]?.slice(0, 5);;
    const close = openhours?.[`${currentDay}Close`]?.slice(0, 5);;

    if (open === "00:00" && close === "00:00") {
      setIsOpenNow(true);
      setClosingTime(null);
      return;
    }

    if (open && close) {
      const now = new Date();
      const openTime = new Date(now.toDateString() + " " + open);
      const closeTime = new Date(now.toDateString() + " " + close);

      if (now >= openTime && now <= closeTime) {
        setIsOpenNow(true);
        setClosingTime(close); 
      } else {
        setIsOpenNow(false);
        setClosingTime(null);
      }
    } else {
      setIsOpenNow(false);
      setClosingTime(null);
    }
  };

  useEffect(() => {
    checkIsOpen();
    const interval = setInterval(checkIsOpen, 60000); 
    return () => clearInterval(interval);
  }, [openhours]);

  const renderOpenHours = () => {
    return (
      <HoursList>
        {Object.entries(dayLabels).map(([key, label]) => {
          const open = openhours?.[`${key}Open`]?.slice(0, 5);;
          const close = openhours?.[`${key}Close`]?.slice(0, 5);;
          return (
            <HoursItem key={key}>
              <Day>{label}</Day>
              <Time>
              {open === "00:00" && close === "00:00"
                ? "24시간 영업"
                : open && close
                ? `${open} - ${close}`
                : "휴무"}
            </Time>
            </HoursItem>
          );
        })}
      </HoursList>
    );
  };

  return (
    <>
      <CategoryBadge>{category}</CategoryBadge>
      <PlaceName>{placeName}</PlaceName>

      <AuthGuard>
        <HeartIconContainer isliked={isLiked} onClick={toggleLike}>
          {isLiked ? <Favorite /> : <FavoriteBorder />}
        </HeartIconContainer>

      </AuthGuard>
      <Address onClick={handleAddressClick}>{address}</Address>
      <CurrentStatus>
        {isOpenNow ? (
          closingTime ? (
            <>
              <StatusOpen>영업 중</StatusOpen> · {closingTime}에 영업 종료
            </>
          ) : (
            <StatusOpen>24시간 영업</StatusOpen>
          )
        ) : (
          <StatusClosed>영업 종료</StatusClosed>
        )}
        <ArrowButton onClick={() => setShowHours((prev) => !prev)}>
          {showHours ? "▲" : "▼"}
        </ArrowButton>
      </CurrentStatus>
      {showHours && renderOpenHours()}
      <Features>{featureList.join(" | ")}</Features>
      <hr style={{ marginBottom: "10px" }} />
    </>
  );
};

export default PlaceInfo;

const CategoryBadge = styled.div`
  display: inline-block;
  background: ${({ theme }) => theme.colors.tertiary};
  color: #ffffff;
  border-radius: 10px;
  font-weight: bold;
  margin-bottom: 12px;
  font-size: 12px;
  text-align: center;
  padding: 5px 10px; 
  white-space: nowrap; 
  margin-bottom: 8px; 
  align-self: flex-start;
`;

const PlaceName = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const HeartIconContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !["hovered", "isliked"].includes(prop),
})`
  position: absolute;
  right: 40px;
  top: 350px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  z-index: 10;

  svg {
    font-size: 30px;
    color: ${({ isliked }) => (isliked ? "red" : "#000000")};
    transition: transform 0.2s ease, color 0.2s ease;
  }

  &:hover svg {
    transform: scale(1.2);
  }
`;

const Address = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.divider};
  margin-bottom: 20px;
  cursor: pointer;
`;

const CurrentStatus = styled.div`
  font-size: 14px;
  margin-top : -10px;
  margin-bottom: 10px;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const StatusOpen = styled.span`
  color: green;
`;

const StatusClosed = styled.span`
  color: red;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  margin-left: 5px;
  cursor: pointer;
`;

const HoursList = styled.div`
  margin-bottom: 20px;
`;

const HoursItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const Day = styled.span`
  font-size: 14px;
  font-weight: bold;
`;

const Time = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

const Features = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.divider};
  margin-bottom: 20px;
`;
