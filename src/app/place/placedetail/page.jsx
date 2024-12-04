"use client";
import React, { useState, useEffect, Suspense } from "react";
import styled from "styled-components";
import { useJsApiLoader } from "@react-google-maps/api";
import ImageContainer from "@/components/place/placedetail/ImageContainer/ImageContainer";
import PlaceInfo from "@/components/place/placedetail/PlaceInfo/PlaceInfo";
import ReviewSection from "@/components/place/placedetail/ReviewSection/ReviewSection";
import MapBottomSheet from "@/components/place/placedetail/MapBottomSheet/MapBottomSheet";
import BottomSheet from "@/components/common/BottomSheet/BottomSheet";
import WriteReviewButton from "@/components/place/placedetail/WriteReviewButton/WriteReviewButton";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/common/Header/Header";
import { WithMapIcon } from "@/components/common/Header/Header.stories";
import { cards } from "@/data/cardsData";

const PlaceDetailPage = () => {
  return (
    <Suspense>
      <ActualPlaceDetailPage />
    </Suspense>
  )
}

const ActualPlaceDetailPage = () => {
  const searchParams = useSearchParams();
  const id = parseInt(searchParams.get("id"), 10);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isMapBottomSheetOpen, setIsMapBottomSheetOpen] = useState(false);
  const [isReviewBottomSheetOpen, setIsReviewBottomSheetOpen] = useState(false);
  const [center, setCenter] = useState(null);
  const [address, setAddress] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const selectedCard = cards.find((card) => card.id === id);
  
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
    if (selectedCard) {
      setIsClient(true);
      setAddress(selectedCard.address);
      fetchCoordinates(selectedCard.address);
    }
  }, [selectedCard]);
  
  if (!selectedCard) {
    return <NotFound>선택한 장소의 정보를 찾을 수 없습니다.</NotFound>;
  }
  
  if (!isClient || !isLoaded) {
    return null;
  }

  const toggleLike = () => setIsLiked((prev) => !prev);

  const handleAddressClick = () => {
    fetchCoordinates(selectedCard.address);
    setIsMapBottomSheetOpen(true);
  };

  const handleWriteReviewButtonClick = () => {
    setIsReviewBottomSheetOpen(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      alert(`파일이 업로드되었습니다: ${file.name}`);
    }
  };

  const handleCancel = () => {
    const fileInput = document.getElementById("file-upload");
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <>
      <Header
        title={selectedCard.title}
        showHomeIcon={WithMapIcon.args.showHomeIcon}
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
        {isMapBottomSheetOpen && (
          <MapBottomSheet
            center={center}
            address={address}
            closeBottomSheet={() => setIsMapBottomSheetOpen(false)}
          />
        )}
        {isReviewBottomSheetOpen && (
          <>
            <BottomSheet
              title="리뷰 작성을 위해"
              content={
                <StyledContent>
                  <p>해당 시설에서 발급받은 영수증을 스캔해주세요</p>
                </StyledContent>
              }
              onClose={() => setIsReviewBottomSheetOpen(false)}
              onConfirm={() => {
                setIsReviewBottomSheetOpen(false);
                router.push("/reviews/receiptCapture");
              }}
              cancelText="사진 업로드"
              confirmText="영수증 촬영"
              cancelHandler={(e) => {
                e.stopPropagation(); 
                const fileInput = document.getElementById("file-upload");
                if (fileInput) {
                  fileInput.click(); 
                }
              }}
            />
            <HiddenFileInput
              type="file"
              id="file-upload"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files[0];
                if (file) {
                  setUploadedFile(file);
                  alert(`파일이 업로드되었습니다: ${file.name}`);
                }
              }}
            />
          </>
        )}
      </ScrollContainer>
    </>
  );
};

export default PlaceDetailPage;

const ScrollContainer = styled.div`
  margin-top: 30px;
  flex: 1;
  height: 100vh;
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

const StyledContent = styled.div`
  margin: -10px 0 30px 0;
  font-size: 18px;
  font-weight: bold;
  text-align: center;

  p {
    line-height: 1.5;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;
