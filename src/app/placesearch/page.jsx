"use client";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useRouter, useSearchParams } from "next/navigation";
import SearchBar from "@/components/placesearch/SearchBar/SearchBar";
import Tabs from "@/components/placesearch/Tabs/Tabs";
import FilterButtons from "@/components/placesearch/FilterButtons/FilterButtons";
import CardList from "@/components/placesearch/CardList/CardList";
import BottomSheet from "@/components/placesearch/BottomSheet/BottomSheet";
import { sidoOptions, gunguOptions } from "@/data/data";
import { Map, ArrowUp } from "@styled-icons/bootstrap";
import { cards as initialCards } from "@/data/cardsData";

const PlaceSearchPage = () => {
  const router = useRouter();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedSido, setSelectedSido] = useState("");
  const [selectedGungu, setSelectedGungu] = useState("");
  const [showGunguDropdown, setShowGunguDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [hoveredFilter, setHoveredFilter] = useState(null);
  const [cards, setCards] = useState(initialCards || []);
  const [userLocation, setUserLocation] = useState(null);
  const [isLocationPermissionGranted, setIsLocationPermissionGranted] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [buttonBottom, setButtonBottom] = useState(30);
  const bottomRef = useRef(null);
  const scrollableRef = useRef(null);
  const searchParams = useSearchParams();
  const permissionGranted = searchParams.get("permissionGranted") === "true";

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

  const handleCategoryClick = (category) => setSelectedCategory(category);
  const handleHover = (category) => setHoveredCategory(category);

  const handleFilterClick = (filter) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter]
    );
  };

  const handleHover2 = (filter) => setHoveredFilter(filter);

  const handleCardClick = () => {
    router.push("/placedetail");
  };

  const toggleLike = (e, id) => {
    e.stopPropagation();
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, isLiked: !card.isLiked } : card
      )
    );
  };

  useEffect(() => {
    if (permissionGranted && navigator.geolocation) {
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
  }, [permissionGranted]);

  const handleMapView = () => {
    if (userLocation) {
      router.push(`/placemap?lat=${userLocation.lat}&lng=${userLocation.lng}`);
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
        ]}
        selectedFilters={selectedFilters}
        hoveredFilter={hoveredFilter}
        onFilterClick={handleFilterClick}
        onHover={handleHover2}
      />
      <CardList cards={cards} onCardClick={handleCardClick} toggleLike={toggleLike} />
      {/* 리스트 마지막 감지용 */}
      <div ref={bottomRef} style={{ height: "1px" }}></div>
      <MapButton bottom={buttonBottom} onClick={handleMapView}>
        <MapIcon />
        지도 보기
      </MapButton>
      {showScrollToTop && (
        <ScrollToTopButton bottom={buttonBottom} onClick={scrollToTop}>
          <ArrowUpIcon />
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
  );
};

const ScrollableContainer = styled.div`
  overflow-y: auto;
  height: calc(100vh - 65px);
  padding-bottom: 70px;
  -ms-overflow-style: none;
  scrollbar-width: none;

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

  svg {
    width: 15px;
    height: 15px;
    margin-bottom: 4px;
  }
`;

const ArrowUpIcon = styled(ArrowUp)`
  width: 20px;
  height: 20px;
`;

export default PlaceSearchPage;
