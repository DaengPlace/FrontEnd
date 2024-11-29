"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter, useSearchParams } from "next/navigation";
import { useJsApiLoader } from "@react-google-maps/api";
import { sidoOptions, gunguOptions } from "@/data/data";
import SearchBar from "@/components/place/placemap/SearchBar/SearchBar";
import Tabs from "@/components/place/placemap/Tabs/Tabs";
import FilterButtons from "@/components/place/placemap/FilterButtons/FilterButtons";
import Map from "@/components/place/placemap/Map/Map";
import BottomSheet from "@/components/place/placemap/BottomSheet/BottomSheet";
import FloatingButton from "@/components/place/placemap/FloatingButton/FloatingButton";
import { CircularProgress } from "@mui/material";
import Header from "@/components/common/Header/Header";
import { WithMapIcon } from "@/components/common/Header/Header.stories";

const PlaceMap = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const lat = parseFloat(searchParams.get("lat"));
  const lng = parseFloat(searchParams.get("lng"));

  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.978 });
  const [zoom, setZoom] = useState(14);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [hoveredFilter, setHoveredFilter] = useState(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedSido, setSelectedSido] = useState("");
  const [selectedGungu, setSelectedGungu] = useState("");
  const [showGunguDropdown, setShowGunguDropdown] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (!isNaN(lat) && !isNaN(lng)) {
      setCenter({ lat, lng });
      setUserLocation({ lat, lng });
      setZoom(14);
    }
  }, [lat, lng]);

  const handleSidoChange = (event) => {
    const value = event.target.value;
    setSelectedSido(value);
    setShowGunguDropdown(value && value !== "전국");
    if (!value) setSelectedGungu("");
  };

  const handleGunguChange = (event) => setSelectedGungu(event.target.value);

  const handleBackToList = () => {
    router.push("/place/placesearch?permissionGranted=true"); 
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedFilters([]); 
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
    <>
    <Header
        title="동반가능시설 검색"
        showFavoriteIcon={WithMapIcon.args.showFavoriteIcon}
        showMapIcon={WithMapIcon.args.showMapIcon}
      />
    <MapContainerWrapper>
      <SearchBar onClick={() => setIsBottomSheetOpen(true)} />
      <Tabs
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
        hoveredCategory={hoveredCategory}
        setHoveredCategory={setHoveredCategory}
      />
      <hr></hr>
      <FilterButtons
        filters={["주차 가능", "실내공간", "야외공간", "무게 제한 없음", "애견 동반 요금 없음"]}
        selectedFilters={selectedFilters}
        onFilterClick={(filter) =>
          setSelectedFilters((prev) =>
            prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
          )
        }
        hoveredFilter={hoveredFilter}
        setHoveredFilter={setHoveredFilter}
      />
      <Map center={center} zoom={zoom} userLocation={userLocation} />
      <FloatingButton onClick={handleBackToList} />
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        sidoOptions={sidoOptions}
        gunguOptions={gunguOptions}
        selectedSido={selectedSido}
        selectedGungu={selectedGungu}
        setSelectedSido={setSelectedSido}
        setSelectedGungu={setSelectedGungu} 
        showGunguDropdown={showGunguDropdown}
        onSidoChange={handleSidoChange}
        onGunguChange={handleGunguChange}
      />
    </MapContainerWrapper>
    </>
  );
};

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
const MapContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0;
  padding: 0;
  margin-top: 20px;
`;
export default PlaceMap;
