import React from 'react';
import FacilityCard from '../FacilityCard/FacilityCard';
import styled from 'styled-components';
import theme from '../../../styles/theme.js';
import { useRouter } from 'next/navigation';

const FacilitiesSection = ({sectionTitle, facilities, isCompact = false}) => {

  const router = useRouter();

  return (
    <SectionContainer $isCompact={isCompact}>
      <SectionTitle>{sectionTitle}</SectionTitle>
        <CardContainer $isCompact={isCompact}>
          {facilities.slice(0, 5).map((fac, index) => (
            <FacilityCard
              key={fac.placeId || index}
              // image={fac.image}
              image={fac.image || '/assets/mypage/facilityImage.png'}
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
    span {
      color: ${theme.colors.primary};
    }
`;

const CardContainer = styled.div`
    display: flex;
    gap: 16px;
    margin: 10px 0;
    overflow-x: auto;
    white-space: nowrap;
    padding: 5px 25px 10px 5px;

    &::-webkit-scrollbar {
        height: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${theme.colors.divider};
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
        background-color: ${theme.colors.defaultBackground}; /* 스크롤바 배경 */
    }
`;