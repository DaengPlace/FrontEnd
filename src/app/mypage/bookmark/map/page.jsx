"use client";

import Header from "@/components/common/Header/Header";
import { OnlyHomeIcon } from "@/components/common/Header/Header.stories";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useJsApiLoader } from "@react-google-maps/api";
import Map from "@/components/place/placemap/Map/Map";
import FloatingButton from "@/components/place/placemap/FloatingButton/FloatingButton";
import { CircularProgress } from "@mui/material";
import { getBookmarks } from "@/apis/favorite/getBookmarks";
import { getPlacesByPlaceId } from "@/apis/places/getPlacesByPlaceId";

const BookmarkMapPage = () => {
  const router = useRouter();
  const [center, setCenter] = useState({ lat: 36.5, lng: 127.5 }); // 전국 중심 좌표
  const [zoom, setZoom] = useState(7); // 전국 시야 줌 레벨
  const [markers, setMarkers] = useState([]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  // 장소 좌표 가져오기
  const fetchCoordinatesFromAPI = async () => {
    try {
      // 1. 즐겨찾기 목록 조회
      const bookmarkResponse = await getBookmarks();
      const bookmarks = bookmarkResponse.data.places || [];

      // 2. 각 placeId에 대한 상세 정보 요청
      const markerPromises = bookmarks.map(async (bookmark) => {
        const placeDetails = await getPlacesByPlaceId(bookmark.placeId);
        const location = placeDetails.data.location;

        // Geocoding API를 통해 주소를 좌표로 변환
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            location
          )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );
        const geocodeData = await response.json();

        if (geocodeData.status === "OK" && geocodeData.results.length > 0) {
          return {
            id: placeDetails.data.placeId,
            position: geocodeData.results[0].geometry.location,
            name: placeDetails.data.name,
            category: placeDetails.data.category,
          };
        }
        return null;
      });

      const resolvedMarkers = await Promise.all(markerPromises);
      setMarkers(resolvedMarkers.filter((marker) => marker !== null));
    } catch (error) {
      console.error("Error fetching bookmark locations:", error);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      fetchCoordinatesFromAPI();
    }
  }, [isLoaded]);

  const handleBackToList = () => {
    router.push("/mypage/bookmark"); // 목록 보기로 이동
  };

  if (!isLoaded) {
    return (
      <LoadingContainer>
        <CircularProgress />
        <LoadingText>지도를 불러오는 중입니다...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <Header
        title="즐겨찾기"
        showHomeIcon={OnlyHomeIcon.args.showHomeIcon}
        showFavoriteIcon={OnlyHomeIcon.args.showFavoriteIcon}
        showMapIcon={OnlyHomeIcon.args.showMapIcon}
      />
      <MapContainer>
        <Map center={center} zoom={zoom} markers={markers} userLocation={null} />
        <FloatingButton onClick={handleBackToList} />
      </MapContainer>
    </Container>
  );
};

export default BookmarkMapPage;

const Container = styled.div`
  width: 100%;
`;

const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoadingText = styled.p`
  margin-top: 10px;
  font-size: 16px;
  color: #666;
`;