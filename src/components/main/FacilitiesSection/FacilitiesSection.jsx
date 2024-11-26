import React from 'react';
import FacilityCard from '../FacilityCard/FacilityCard';
import styled from 'styled-components';
import theme from '../../../styles/theme.js';

const FacilitiesSection = ({sectionTitle, facilities}) => {
  return (
    <SectionContainer>
      <SectionTitle>{sectionTitle}</SectionTitle>
        <CardContainer>
          {facilities.slice(0, 5).map((fac) => (
            <FacilityCard
              key={fac.id}
              image={fac.image}
              category={fac.category}
              name={fac.name}
              rating={fac.rating}
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
    margin: 2px 12px;
    padding-left: 20px;
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