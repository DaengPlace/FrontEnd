import React, { useRef, useState } from 'react';
import FacilityCard from '../FacilityCard/FacilityCard';
import styled from 'styled-components';
import theme from '../../../styles/theme.js';
import { useRouter } from 'next/navigation';

const FacilitiesSection = ({sectionTitle, facilities, isCompact = false}) => {

  const router = useRouter();
  const cardContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // 마우스 드래그 시작
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - cardContainerRef.current.offsetLeft);
    setScrollLeft(cardContainerRef.current.scrollLeft);
  };

  // 마우스 이동 중
  const handleMouseMove = (e) => {
    if (!isDragging) return; // 드래그 중이 아닐 때
    e.preventDefault();
    const x = e.pageX - cardContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // 드래그 속도 조절
    cardContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // 드래그 종료
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <SectionContainer $isCompact={isCompact}>
      <SectionTitle>{sectionTitle}</SectionTitle>
        <CardContainer 
          ref={cardContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseUp}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          $isCompact={isCompact}
        >
          {facilities.slice(0, 5).map((fac, index) => (
            <FacilityCard
              key={fac.placeId || index}
              placeId={fac.placeId}
              // image={fac.image}
              image={'/assets/image 19.svg'}
              category={fac.type}
              name={fac.name}
              rating={fac.rating || 0}
            />
          ))}
        </CardContainer>
    </SectionContainer>
  );
};

export default FacilitiesSection;

const SectionContainer = styled.div`
  width: 100%;
  text-align: left;
  margin: ${({ $isCompact }) => ($isCompact ? "0" : "2px 12px")};
  padding-left: ${({ $isCompact }) => ($isCompact ? "15px" : "20px")};
`;

const SectionTitle = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-top: 5px;
    margin-left: 10px;
    span {
      color: ${theme.colors.primary};
    }
`;

const CardContainer = styled.div`
  display: flex;
  gap: 16px;
  margin: 10px 0;
  overflow-x: scroll;
  white-space: nowrap;
  padding: 5px 25px 10px 5px;
  cursor: grab;

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &:active {
    cursor: grabbing;
  }
`;