"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BottomSheet from "@/components/place/placesearch/BottomSheet/BottomSheet";
import { sidoOptions, gunguOptions } from "@/data/data";
import { useRouter } from "next/navigation";

const SearchPage = () => {
  const router = useRouter();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedSido, setSelectedSido] = useState("");
  const [selectedGungu, setSelectedGungu] = useState("");
  const [showGunguDropdown, setShowGunguDropdown] = useState(false);

  useEffect(() => {
    setIsBottomSheetOpen(true);
  }, []);

  const handleCloseClick = () => {
    router.push("/main");
  }
  const handleSidoChange = (event) => {
    const value = event.target.value;
    setSelectedSido(value);
    setShowGunguDropdown(value && value !== "전국");
    if (value === "전국") setSelectedGungu("");
  };

  const handleGunguChange = (event) => setSelectedGungu(event.target.value);

  return (
    <Container>
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleCloseClick}
        onSearch={() => alert("검색 실행")}
        onReset={() => {
          setSelectedSido("");
          setSelectedGungu("");
        }}
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
    </Container>
  );
};


export default SearchPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f8f8;
`;
