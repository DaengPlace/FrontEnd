"use client";

import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import styled from "styled-components";
import Image from "next/image";
import { ChevronLeft } from "@styled-icons/bootstrap/ChevronLeft";
import { ChevronRight } from "@styled-icons/bootstrap/ChevronRight";

const images = [
  { src: "/assets/mainpage/banner1.svg", alt: "banner image 1" },
  { src: "/assets/mainpage/banner2.svg", alt: "banner image 2" },
];

const Banner = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 clearInterval
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <BannerContainer>
      <ArrowButton onClick={handlePrev} position="left">
        <StyledChevronLeft />
      </ArrowButton>

      <CarouselWrapper>
        <SlideContainer $currentIndex={currentIndex}>
          {images.map((image, index) => (
            <Slide key={index}>
              <StyledImage
                src={image.src}
                alt={image.alt}
                width={600}
                height={300}
              />
            </Slide>
          ))}
        </SlideContainer>
      </CarouselWrapper>

      <ArrowButton onClick={handleNext} position="right">
        <StyledChevronRight />
      </ArrowButton>

      {/* 인디케이터 */}
      <Indicators>
        {images.map((_, index) => (
          <Dot key={index} $isActive={index === currentIndex} />
        ))}
      </Indicators>
    </BannerContainer>
  );
};

export default Banner;

const BannerContainer = styled.div`
  text-align: center;
  margin-top: 50px;
  width: 100%;
  max-width: 600px;
  position: relative;
`;

const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const SlideContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(-${({ $currentIndex }) => $currentIndex * 100}%);
`;

const Slide = styled.div`
  min-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const ArrowButton = styled.div`
  position: absolute;
  top: 50%;
  ${({ position }) => position}: 10px;
  transform: translateY(-50%);
  z-index: 10;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  width: 40px;
  height: 40px;
`;

const StyledChevronLeft = styled(ChevronLeft)`
  color: white;
  width: 24px;
  height: 24px;
`;

const StyledChevronRight = styled(ChevronRight)`
  color: white;
  width: 24px;
  height: 24px;
`;

const Indicators = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 10px;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ $isActive }) => ($isActive ? "black" : "gray")};
`;