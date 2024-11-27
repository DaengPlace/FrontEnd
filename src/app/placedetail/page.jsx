"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useJsApiLoader } from "@react-google-maps/api";
import ImageContainer from "@/components/placedetail/ImageContainer/ImageContainer";
import PlaceInfo from "@/components/placedetail/PlaceInfo/PlaceInfo";
import ReviewSection from "@/components/placedetail/ReviewSection/ReviewSection";
import MapBottomSheet from "@/components/placedetail/MapBottomSheet/MapBottomSheet";
import WriteReviewButton from "@/components/placedetail/WriteReviewButton/WriteReviewButton";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/common/Header/Header";
import { WithMapIcon } from "@/components/common/Header/Header.stories";
import { cards } from "@/data/cardsData";

const PlaceDetailPage = () => {
  const searchParams = useSearchParams();
  const id = parseInt(searchParams.get("id"), 10);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [center, setCenter] = useState(null);
  const [address, setAddress] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  const selectedCard = cards.find((card) => card.id === id)
  if (!selectedCard) {
    return <NotFound>선택한 장소의 정보를 찾을 수 없습니다.</NotFound>;
  }
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const fetchCoordinates = async (address) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      if (data.status === "OK" && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setCenter({ lat, lng });
      } else {
        alert("주소에 대한 좌표를 가져올 수 없습니다.");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };
  useEffect(() => {
    setIsClient(true);
    setAddress(selectedCard.address); 
    fetchCoordinates(selectedCard.address);
  }, []);

  if (!isClient || !isLoaded) {
    return null;
  }
  const toggleLike = () => setIsLiked((prev) => !prev);

  const handleAddressClick = () => {
    fetchCoordinates(selectedCard.address);
    setIsBottomSheetOpen(true);
  };

  const handleWriteReviewButtonClick = () => {
    router.push("reviews/reviewsInput");
  }
  return (
    <>
    <Header
        title={selectedCard.title}
        showFavoriteIcon={WithMapIcon.args.showFavoriteIcon}
        showMapIcon={WithMapIcon.args.showMapIcon}
      />
    <ScrollContainer>
      <PageContainer>
        <ImageContainer />
        <PlaceInfo
          isLiked={isLiked}
          toggleLike={toggleLike}
          address={selectedCard.address}
          handleAddressClick={handleAddressClick}
          category={selectedCard.category}
          placeName={selectedCard.title}
          openingHours={selectedCard.hours}
          features={selectedCard.features}
        />
        <ReviewSection />
        <WriteReviewButton onClick={handleWriteReviewButtonClick} />
      </PageContainer>
      {isBottomSheetOpen && (
        <MapBottomSheet
          center={center}
          address={address}
          closeBottomSheet={() => setIsBottomSheetOpen(false)}
        />
      )}
    </ScrollContainer>
    </>
  );
};

export default PlaceDetailPage;

const ScrollContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  padding-bottom: 0; 
  margin-bottom: 0; 
`;

const PageContainer = styled.div`
  flex: 1;
  padding: 20px 20px 0 20px;
  background-color: ${({ theme }) => theme.colors.defaultBackground};
  display: flex;
  flex-direction: column;
`;

const NotFound = styled.div`
  text-align: center;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.divider};
  margin-top: 50px;
`;
