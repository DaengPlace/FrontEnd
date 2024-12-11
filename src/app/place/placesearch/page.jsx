"use client";
import React, { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import axios from "axios";
import styled from "styled-components";
import { useRouter, useSearchParams } from "next/navigation";
import SearchBar from "@/components/place/placesearch/SearchBar/SearchBar";
import Tabs from "@/components/place/placesearch/Tabs/Tabs";
import FilterButtons from "@/components/place/placesearch/FilterButtons/FilterButtons";
import CardList from "@/components/place/placesearch/CardList/CardList";
import BottomSheet from "@/components/place/placesearch/BottomSheet/BottomSheet";
import { sidoOptions, gunguOptions } from "@/data/data";
import { Map, ArrowUp } from "@styled-icons/bootstrap";
import Header from "@/components/common/Header/Header";
import { WithMapIcon } from "@/components/common/Header/Header.stories";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const PlaceSearchPage = () => {
  return (
    <Suspense>
      <ActualPlaceSearchPage />
    </Suspense>
  )
}

const ActualPlaceSearchPage = () => {
  const router = useRouter();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedSido, setSelectedSido] = useState("");
  const [selectedGungu, setSelectedGungu] = useState("");
  const [showGunguDropdown, setShowGunguDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [hoveredFilter, setHoveredFilter] = useState(null);
  const [cards, setCards] = useState([]);
  const [allCards, setAllCards] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isLocationPermissionGranted, setIsLocationPermissionGranted] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [buttonBottom, setButtonBottom] = useState(30);
  const bottomRef = useRef(null);
  const scrollableRef = useRef(null);
  const searchParams = useSearchParams();
  const [page, setpage] = useState(1);
  const size = 20;
  
  const handleOpenBottomSheet = () => setIsBottomSheetOpen(true);
  const handleCloseBottomSheet = () => setIsBottomSheetOpen(false);
  const handleSidoChange = (event) => {
    const value = event.target.value;
    setSelectedSido(value);
    if (value && value !== "전국") {
      setShowGunguDropdown(true);
    } else {
      setShowGunguDropdown(false);
      setSelectedGungu("");
    }
  };

  const handleGunguChange = (event) => {
    setSelectedGungu(event.target.value);
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
    filterCards(category, selectedFilters);
  };

  const handleHover = (category) => setHoveredCategory(category);
  
  const handleFilterClick = (filter) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter) 
        : [...prevFilters, filter]; 
      filterCards(selectedCategory, updatedFilters); 
      return updatedFilters;
    });
  };

  const filterCards = (category, filters) => {
    let filteredCards = allCards;
    if (category !== "전체") {
      filteredCards = filteredCards.filter((card) => card.mainCategory === category);
    }
    if (filters.length > 0) {
      filters.forEach((filter) => {
        if (filter === "주차 가능") {
          filteredCards = filteredCards.filter((card) => card.is_parking); 
        } else if (filter === "실내공간") {
          filteredCards = filteredCards.filter((card) => card.inside); 
        } else if (filter === "야외공간") {
          filteredCards = filteredCards.filter((card) => card.outside); 
        } else if (filter === "무게 제한 없음") {
          filteredCards = filteredCards.filter((card) => !card.weight_limit); 
        } else if (filter === "애견 동반 요금 없음") {
          filteredCards = filteredCards.filter((card) => !card.pet_fee); 
        } else if (filter === "영업중") {
          filteredCards = filteredCards.filter((card) => card.isOpenNow); 
        }
      });
    }

    setCards(filteredCards); 
  };

  const handleHover2 = (filter) => setHoveredFilter(filter);

  const toggleLike = (e, id) => {
    e.stopPropagation();
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, isLiked: !card.isLiked } : card
      )
    );
  };
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        () => {
          alert("현재 위치를 가져올 수 없습니다.");
        }
      );
    }
  }, []);
  
  useEffect(() => {
    const lat = parseFloat(searchParams.get("lat")); 
    const lng = parseFloat(searchParams.get("lng")); 
  
    if (!isNaN(lat) && !isNaN(lng)) {
      setUserLocation({ lat, lng }); 
      fetchPlaces(lat, lng, page, size); 
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: latitude, lng: longitude });
            fetchPlaces(latitude, longitude, page, size); 
          },
          () => {
            alert("현재 위치를 가져올 수 없습니다.");
          }
        );
      }
      console.error("Invalid latitude or longitude in URL.");
    }
  }, [searchParams, page]);

  const fetchPlaces = async (lat, lng, page, size) => {
    try {
      const response = await axios.get("https://api.daengplace.com/places", {
        params: {
          latitude: lat,
          longitude: lng,
          page,
          size,
        },
      });
      const places = response.data.data.places || [];
      const mappedPlaces = places.map((place) => ({
        ...place,
        mainCategory: categoryMapping[place.category] || "기타",
        isOpenNow: checkIsOpen(place.operationHour), 
      }));
      setAllCards(mappedPlaces); 
      setCards(mappedPlaces);
      setSearchedLocation({ lat, lng });
      console.log(places);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  const checkIsOpen = (operationHour) => {
    if (!operationHour || !operationHour.todayOpen || !operationHour.todayClose) {
      return false;
    }
  
    const { todayOpen, todayClose } = operationHour;
  
    const now = new Date();
    const [openHour, openMinute, openSecond] = todayOpen.split(":").map(Number);
    const [closeHour, closeMinute, closeSecond] = todayClose.split(":").map(Number);
  
    const openTime = new Date();
    openTime.setHours(openHour, openMinute, openSecond || 0);
  
    const closeTime = new Date();
    closeTime.setHours(closeHour, closeMinute, closeSecond || 0); 
  
    if (closeTime <= openTime) {
      closeTime.setDate(closeTime.getDate() + 1);
    }
  
    return now >= openTime && now <= closeTime;
  };

  const handleCardClick = (placeId) => {
    router.push(`/place/placedetail?placeId=${placeId}`);
  };

  const handleMapView = () => {
    const location = searchedLocation || userLocation;
    if (location) {
      const { lat, lng } = location;
      router.push(`/place/placemap?lat=${lat}&lng=${lng}`);
    } else {
      alert("위치를 가져올 수 없습니다.");
    }
  };
  
  const scrollToTop = () => {
    const container = document.getElementById("scrollable-container");
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const container = document.getElementById("scrollable-container");
    const handleScroll = () => {
      if (container) {
        const scrollTop = container.scrollTop;
        if (scrollTop > 10) {
          setShowScrollToTop(true);
        } else {
          setShowScrollToTop(false);
        }
      }
    };

    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setButtonBottom(20); 
        } else {
          setButtonBottom(30); 
        }
      },
      {
        root: scrollableRef.current,
        threshold: 0.1,
      }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [cards]);
  
  return (
    <>
      <Header
        title="동반가능시설 검색"
        showFavoriteIcon={WithMapIcon.args.showFavoriteIcon}
        showHomeIcon={WithMapIcon.args.showHomeIcon}
        showMapIcon={WithMapIcon.args.showMapIcon}
      />
    <ScrollableContainer id="scrollable-container" ref={scrollableRef}>
      <SearchBar onClick={handleOpenBottomSheet} />
      <Tabs
        categories={["전체", "서비스", "음식점", "의료시설", "문화시설"]}
        selectedCategory={selectedCategory}
        hoveredCategory={hoveredCategory}
        onCategoryClick={handleCategoryClick}
        onHover={handleHover}
      />
      <hr></hr>
      <FilterButtons
        filters={[
          "주차 가능",
          "실내공간",
          "야외공간",
          "무게 제한 없음",
          "애견 동반 요금 없음",
          "영업중"
        ]}
        selectedFilters={selectedFilters}
        hoveredFilter={hoveredFilter}
        onFilterClick={handleFilterClick}
        onHover={handleHover2}
      />
      <CardList cards={cards} onCardClick={(placeId) => handleCardClick(placeId)} toggleLike={toggleLike} keyExtractor={(card) => card.id || card.placeId} />
      {/* 리스트 마지막 감지용 */}
      <div ref={bottomRef} style={{ height: "1px" }}></div>
      <MapButton bottom={buttonBottom} onClick={handleMapView}>
        <MapIcon />
        지도 보기
      </MapButton>
      {showScrollToTop && (
        <ScrollToTopButton bottom={buttonBottom} onClick={scrollToTop}>
          <KeyboardArrowUpIcon sx={{ fontSize: 36, marginBottom:"-10px"}} />
          <span>맨위로</span>
        </ScrollToTopButton>
      )}
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
        onSearch={() => alert("검색 실행")}
        onReset={() => alert("초기화 실행")}
        sidoOptions={sidoOptions}
        gunguOptions={gunguOptions}
        selectedSido={selectedSido}
        selectedGungu={selectedGungu}
        setSelectedSido={setSelectedSido}
        setSelectedGungu={setSelectedGungu}
        onSidoChange={handleSidoChange}
        onGunguChange={handleGunguChange}
        showGunguDropdown={showGunguDropdown}
      />
    </ScrollableContainer>
    </>
  );
};

const ScrollableContainer = styled.div`
  overflow-y: auto;
  height: 100vh;
  padding-bottom: 50px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding-top: 70px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const MapButton = styled.button`
  position: fixed;
  bottom: ${({ bottom }) => `${bottom}px`};
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.colors.defaultBackground};
  color: ${({ theme }) => theme.colors.primary};
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 40px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

const MapIcon = styled(Map)`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: ${({ bottom }) => `${bottom}px`}; 
  right: calc(50% - 280px); 
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.defaultBackground};
  color: ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 1000;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
  
  span {
    margin-bottom: 10px;
  }

`;

export default PlaceSearchPage;
