"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Banner from "@/components/place/Banner/Banner";
import Footer from "@/components/place/Footer/Footer";
import CategorySelector from "@/components/place/CategorySelector/CategorySelector";
import ReviewList from "@/components/place/ReviewList/ReviewList";
import { Permission } from "@/components/common/BottomSheet/BottomSheet.stories";

const BottomSheet = dynamic(() => import("@/components/common/BottomSheet/BottomSheet"), { ssr: false });

const PlacePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  const reviews = [
    {
      id: 1,
      author: "뽀삐엄마",
      date: "2024.11.01",
      title: "간식곳간",
      review: "야외 공간이 넓어서 뛰어놀기 참 좋네요! 재방문...",
      category: "반려동물용품점",
      image: "/assets/image.png",
    },
    {
      id: 2,
      author: "뽀삐엄마",
      date: "2024.11.01",
      title: "간식곳간",
      review: "야외 공간이 넓어서 뛰어놀기 참 좋네요! 재방문...",
      category: "반려동물용품점",
      image: "/assets/image.png",
    },
    {
      id: 3,
      author: "뽀삐엄마",
      date: "2024.11.01",
      title: "간식곳간",
      review: "야외 공간이 넓어서 뛰어놀기 참 좋네요! 재방문...",
      category: "반려동물용품점",
      image: "/assets/image.png",
    },
  ];

  const imagesContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    marginTop: "20px",
  };

  const nearbyFacilitiesTextStyle = {
    position: "absolute",
    top: "10px",
    left: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "black",
    padding: "5px 10px",
  };

  const nearbyFacilitiesTextStyle2 = {
    position: "absolute",
    top: "10px",
    left: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
    padding: "5px 10px",
  };

  return (
    <div style={{ flexGrow: 1, padding: "20px", backgroundColor: "#F8F8F8" }}>
      <Banner />
      {/* 이미지 섹션 */}
      <section style={imagesContainerStyle}>
        <div style={{ position: "relative", cursor: "pointer" }}>
          <img
            src="/assets/image 18.png"
            alt="내 주변 동반가능시설"
            style={{
              width: "270px",
              height: "118.8px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
            onClick={() => setIsBottomSheetOpen(true)}
          />
          <div style={nearbyFacilitiesTextStyle}>
            <div>내 주변 동반가능시설</div>
            <div>찾아보기</div>
          </div>
        </div>
        <div style={{ position: "relative", cursor: "pointer" }}>
          <img
            src="/assets/image 17.png"
            alt="성향별 추천 시설"
            style={{
              width: "270px",
              height: "118.8px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
          <div style={nearbyFacilitiesTextStyle2}>
            <div>성향별 추천 시설</div>
            <div>알아보기</div>
          </div>
        </div>
      </section>

      {/* 카테고리 및 리뷰 섹션 */}
      <section style={{ marginTop: "20px", background: "#fff", padding: "20px", borderRadius: "20px", border:"1px solid #ABABAB" }}>
        <h2>카테고리별 인기 리뷰 🔥</h2>
        <CategorySelector
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          hoveredCategory={hoveredCategory}
          setHoveredCategory={setHoveredCategory}
        />
        <hr></hr>
        <ReviewList reviews={reviews} />
      </section>
      <hr style={{marginTop:"30px"}}></hr>
      <Footer />
      {isBottomSheetOpen && (
        <BottomSheet
          title={Permission.args.title}
          content={Permission.args.content}
          cancelText={Permission.args.cancelText}
          confirmText={Permission.args.confirmText}
          onClose={() => setIsBottomSheetOpen(false)}
          onConfirm={() => {
            alert("위치 정보 사용에 동의하셨습니다.");
            setIsBottomSheetOpen(false);
            router.push("/placesearch");
          }}
        />
      )}
    </div>
  );
};

export default PlacePage;
