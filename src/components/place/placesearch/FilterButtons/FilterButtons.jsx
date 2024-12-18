import React, { useRef } from "react";
import styled from "styled-components";
import { ChevronLeft } from "@styled-icons/bootstrap/ChevronLeft";
import { ChevronRight } from "@styled-icons/bootstrap/ChevronRight";

const FilterButtons = ({
  filters,
  selectedFilters,
  hoveredFilter,
  onFilterClick,
  onHover,
}) => {
  const containerRef = useRef(null);

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -150, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 150, behavior: "smooth" });
  };

  return (
    <SliderContainer>
      <ChevronLeft style={{marginBottom: "7px", color: "gray"}} width={25} height={25} onClick={scrollLeft}>&lt;</ChevronLeft>
      <FilterButtonsContainer ref={containerRef}>
        {filters.map((filter) => (
          <FilterButton
            key={filter}
            onClick={() => onFilterClick(filter)}
            onMouseEnter={() => onHover(filter)}
            onMouseLeave={() => onHover(null)}
            selected={selectedFilters.includes(filter)}
            hovered={filter === hoveredFilter}
          >
            {filter}
          </FilterButton>
        ))}
      </FilterButtonsContainer>
      <ChevronRight style={{marginBottom: "7px", color: "gray"}} width={25} height={25} onClick={scrollRight}>&gt;</ChevronRight>
    </SliderContainer>
  );
};

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 0px 20px;
`;

const FilterButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  flex-wrap: nowrap;
  scroll-behavior: smooth;
  padding: 8px 0;
  margin-bottom: 16px;
  margin-top: 10px;
  margin-left: 3px;
  margin-right: 10px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const FilterButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !["hovered", "selected"].includes(prop),
})`
  flex: 0 0 auto;
  padding: 6px 10px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  background-color: ${({ selected, hovered }) =>
    selected ? "#0019F4" : hovered ? "#e0e0e0" : "white"};
  color: ${({ selected }) => (selected ? "white" : "black")};
  border: 1px solid ${({ selected }) => (selected ? "#4caf50" : "lightgray")};
  white-space: nowrap;
`;

export default FilterButtons;
