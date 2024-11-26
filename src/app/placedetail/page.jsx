"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useJsApiLoader } from "@react-google-maps/api";
import ImageContainer from "@/components/placedetail/ImageContainer/ImageContainer";
import PlaceInfo from "@/components/placedetail/PlaceInfo/PlaceInfo";
import ReviewSection from "@/components/placedetail/ReviewSection/ReviewSection";
import MapBottomSheet from "@/components/placedetail/MapBottomSheet/MapBottomSheet";
import WriteReviewButton from "@/components/placedetail/WriteReviewButton/WriteReviewButton";
import { useRouter } from "next/navigation";

const PlaceDetailPage = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [center, setCenter] = useState({ lat: 37.658, lng: 126.832 });
  const [address, setAddress] = useState("경기도 고양시 일산동구 백마로 195");
  const [isLiked, setIsLiked] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !isLoaded) {
    return null;
  }

  const toggleLike = () => setIsLiked((prev) => !prev);

  const handleAddressClick = () => {
    setCenter({ lat: 37.658, lng: 126.832 });
    setIsBottomSheetOpen(true);
  };

  const handleWriteReviewButtonClick = () => {
    router.push("reviews/reviewsInput");
  }
  return (
    <ScrollContainer>
      <PageContainer>
        <ImageContainer />
        <PlaceInfo
          isLiked={isLiked}
          toggleLike={toggleLike}
          address={address}
          handleAddressClick={handleAddressClick}
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
  );
};

export default PlaceDetailPage;

const ScrollContainer = styled.div`
  height: auto;
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
`;

const PageContainer = styled.div`
  flex: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.defaultBackground};
`;
