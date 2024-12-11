"use client";
import React, { useState, useEffect, Suspense } from "react";
import styled from "styled-components";
import { useRouter, useSearchParams } from "next/navigation";
import { useJsApiLoader } from "@react-google-maps/api";
import { sidoOptions, gunguOptions } from "@/data/data";
import axios from "axios";
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
  return (
    <Suspense>
      <ActualPlaceMap />
    </Suspense>
  )
}

const ActualPlaceMap = () => {
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
  const [allMarkers, setAllMarkers] = useState([]);
  const [markers, setMarkers] = useState([]);

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

  useEffect(() => {
    if (userLocation) {
      setSelectedCategory("전체");
      fetchPlaces(userLocation.lat, userLocation.lng);
    }
  }, [userLocation]);

  const fetchPlaces = async (latitude, longitude) => {
    try {
      const response = await axios.get("https://api.daengplace.com/places", {
        params: { latitude, longitude, page: 1, size: 20 },
      });
      const places = response.data.data.places || [];
      const fetchedMarkers = places.map((place) => ({
        id: place.placeId,
        position: { lat: place.latitude, lng: place.longitude },
        name: place.name,
        category: place.category,
        is_parking: place.is_parking, 
        inside: place.inside, 
        outside: place.outside, 
        weight_limit: place.weight_limit, 
        pet_fee: place.pet_fee, 
        operationHour: place.operationHour, 
      }));
      setAllMarkers(fetchedMarkers); 
      setMarkers(fetchedMarkers); 
      console.log(places);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };
  const handleSidoChange = (event) => {
    const value = event.target.value;
    setSelectedSido(value);
    setShowGunguDropdown(value && value !== "전국");
    if (!value) setSelectedGungu("");
  };

  const handleGunguChange = (event) => setSelectedGungu(event.target.value);

  const handleBackToList = () => {
    if (!isNaN(lat) && !isNaN(lng)) {
      router.push(`/place/placesearch?lat=${lat}&lng=${lng}`);
    } else {
      alert("지도 데이터를 불러올 수 없습니다.");
    }
  };

  const categoryMapping = {
    미용: "서비스",
    반려동물용품: "서비스",
    위탁관리: "서비스",
    식당: "음식점",
    카페: "음식점",
    문예회관: "문화시설",
    박물관: "문화시설",
    미술관: "문화시설",
    여행지: "문화시설",
    동물병원: "의료시설",
    동물약국: "의료시설",
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const updatedFilters = [...selectedFilters];
    filterMarkers(category, selectedFilters); 
  };

  const handleFilterClick = (filter) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter];
      filterMarkers(selectedCategory, updatedFilters);
      return updatedFilters;
    });
  };

  const filterMarkers = (category, filters) => {
    let filteredMarkers = allMarkers;

    if (category !== "전체") {
      filteredMarkers = filteredMarkers.filter((marker) => {
        const mainCategory = categoryMapping[marker.category];
        return mainCategory === category;
      });
    }

    if (filters.length > 0) {
      filters.forEach((filter) => {
        if (filter === "주차 가능") {
          filteredMarkers = filteredMarkers.filter((marker) => marker.is_parking);
        } else if (filter === "실내공간") {
          filteredMarkers = filteredMarkers.filter((marker) => marker.inside);
        } else if (filter === "야외공간") {
          filteredMarkers = filteredMarkers.filter((marker) => marker.outside);
        } else if (filter === "무게 제한 없음") {
          filteredMarkers = filteredMarkers.filter((marker) => marker.weight_limit === 0);
        } else if (filter === "애견 동반 요금 없음") {
          filteredMarkers = filteredMarkers.filter((marker) => marker.pet_fee === 0);
        } else if (filter === "영업중") {
          filteredMarkers = filteredMarkers.filter((marker) => {
            const { todayOpen, todayClose } = marker.operationHour || {};
            if (!todayOpen || !todayClose) return false;
  
            const now = new Date();
            const [openHour, openMinute] = todayOpen.split(":").map(Number);
            const [closeHour, closeMinute] = todayClose.split(":").map(Number);
  
            const openTime = new Date();
            openTime.setHours(openHour, openMinute);
  
            const closeTime = new Date();
            closeTime.setHours(closeHour, closeMinute);
  
            if (closeTime <= openTime) {
              closeTime.setDate(closeTime.getDate() + 1); 
            }
  
            return now >= openTime && now <= closeTime;
          });
        }
      });
    }

    setMarkers(filteredMarkers);
    console.log("Filtered Markers:", filteredMarkers);
    console.log("All Markers:", allMarkers);
console.log("Selected Filters:", filters);
console.log("All Markers with Parking Info:", allMarkers.map((marker) => marker.pet_fee));

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
        showHomeIcon={WithMapIcon.args.showHomeIcon}
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
        filters={["주차 가능", "실내공간", "야외공간", "무게 제한 없음", "애견 동반 요금 없음", "영업중"]}
        selectedFilters={selectedFilters}
        onFilterClick={handleFilterClick}
        hoveredFilter={hoveredFilter}
        setHoveredFilter={setHoveredFilter}
      />
      <Map center={center} zoom={zoom} markers={markers} userLocation={userLocation} />
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
  margin-top: 70px;
`;
export default PlaceMap;
