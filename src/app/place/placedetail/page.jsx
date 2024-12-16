"use client";
import React, { useState, useEffect, Suspense, useRef } from "react";
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
import axios from "axios";
import useReviewStore from "@/stores/reviewStore";
import AuthGuard from "@/components/common/AuthGuard/AuthGuard";
import { getPlaceDetails } from "@/apis/place/places";
import { addFavorite, removeFavorite } from "@/apis/place/favorite";

const PlaceDetailPage = () => {
  return (
    <Suspense>
      <ActualPlaceDetailPage />
    </Suspense>
  )
}

const ActualPlaceDetailPage = () => {
  const searchParams = useSearchParams();
  const placeId = parseInt(searchParams.get("placeId"), 10);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isMapBottomSheetOpen, setIsMapBottomSheetOpen] = useState(false);
  const [isReviewBottomSheetOpen, setIsReviewBottomSheetOpen] = useState(false);
  const [center, setCenter] = useState(null);
  const [address, setAddress] = useState("");
  const [isUploadAction, setIsUploadAction] = useState(false);
  const fileInputRef = useRef(null);
  const { setPlaceName, setVisitDate, setCategory } = useReviewStore();
  const [selectedCard, setSelectedCard] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 

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
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };
  
  useEffect(() => {
    if (placeId) {
      fetchPlaceDetails(placeId); 
    }
  }, [placeId]);
  const fetchPlaceDetails = async () => {
    try {
      const data = await getPlaceDetails(placeId);
      setSelectedCard(data);
      setPlaceName(data.name);
      setCategory(data.category);
    } catch (error) {
      console.error("Error fetching place details:", error);
      setSelectedCard(null);
    }
  };

  useEffect(() => {
    if (selectedCard) {
      setPlaceName(selectedCard.name);
      setCategory(selectedCard.category);
      setIsClient(true);
      setAddress(selectedCard.location);
      fetchCoordinates(selectedCard.location);
    }
  }, [selectedCard]);
  
  if (!selectedCard) {
    return <NotFound>선택한 장소의 정보를 찾을 수 없습니다.</NotFound>;
  }
  
  if (!isClient || !isLoaded) {
    return null;
  }

  const toggleLike = async () => {
    try {
      if (selectedCard.is_favorite) {
        await removeFavorite(placeId); 
        console.log("즐겨찾기 삭제 성공");
      } else {
        await addFavorite(placeId); 
        console.log("즐겨찾기 등록 성공");
      }

      setSelectedCard((prevCard) => ({
        ...prevCard,
        is_favorite: !prevCard.is_favorite, 
      }));
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };

  const handleAddressClick = () => {
    fetchCoordinates(selectedCard.address);
    setIsMapBottomSheetOpen(true);
  };

  const handleWriteReviewButtonClick = () => {
    setIsReviewBottomSheetOpen(true);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
  
      try {
        const formData = new FormData();
        formData.append("file", selectedFile, selectedFile.name);

        const uploadResponse = await axios.post(
          "https://api.daengplace.com/ocr/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        if (uploadResponse.status === 200) {
          const filePath = uploadResponse.data;
          console.log("File uploaded successfully. Path:", filePath);
  
          const analyzeResponse = await axios.post(
            "https://api.daengplace.com/ocr/analyze",
            null,
            {
              params: { filePath: filePath },
            }
          );
  
          if (analyzeResponse.status === 200) {
            const extractedTexts = analyzeResponse.data;
            console.log(extractedTexts);
            const combinedText = extractedTexts.join("");
            const placeName = useReviewStore.getState().placeName;
            console.log("Extracted texts:", combinedText);
  
            if (combinedText.includes(placeName)) {
              const visitDateMatch = combinedText.match(/\d{4}[./-]\d{2}[./-]\d{2}/); 
              const visitDate = visitDateMatch ? visitDateMatch[0].replace(/[\/-]/g, ".") : "날짜 없음";
              console.log("Extracted visit date:", visitDate);
              setVisitDate(visitDate);
              router.push(`/reviews/reviewScan?placeId=${placeId}`);
            } else {
              alert("해당 장소 방문 기록이 확인되지 않았습니다.");
            }
          } else {
            console.error("Failed to analyze text:", analyzeResponse.statusText);
          }
        } else {
          console.error("Failed to upload image:", uploadResponse.statusText);
        }
      } catch (error) {
        console.error("Error during OCR process:", error);
      }
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
            isLiked={selectedCard.is_favorite}
            toggleLike={toggleLike}
            address={selectedCard.location}
            handleAddressClick={handleAddressClick}
            category={selectedCard.category}
            placeName={selectedCard.name}
            openhours={selectedCard.operationHour}
            features={{
              inside: selectedCard.inside,
              outside: selectedCard.outside,
              isParking: selectedCard.is_parking,
              petFee: selectedCard.pet_fee,
              weightLimit: selectedCard.weight_limit,
            }}
          />
          <ReviewSection
            placeId={placeId}
            rating={selectedCard.rating}
            reviewCount={selectedCard.review_count}
            reviews={selectedCard.reviews}
           />
          <AuthGuard><WriteReviewButton onClick={handleWriteReviewButtonClick} /></AuthGuard>
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
              content={
                <StyledContent>
                  <p>리뷰 작성을 위해<br />해당 시설에서 발급받은 영수증을 스캔해주세요</p>
                </StyledContent>
              }
              onClose={() => setIsReviewBottomSheetOpen(false)}
              onCancel={handleButtonClick}
              onConfirm={() => {
                setIsReviewBottomSheetOpen(false);
                router.push(`/reviews/receiptCapture?placeId=${placeId}`);
              }}
              cancelText="사진 업로드"
              confirmText="영수증 촬영"
            />
            <HiddenFileInput
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleFileChange}
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
