import React from "react";
import styled from "styled-components";

const FilterButtons = ({
  filters,
  selectedFilters,
  hoveredFilter,
  onFilterClick,
  onHover,
}) => (
  <FilterButtonsContainer>
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
);

const FilterButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
  margin-top: 10px;
  margin-left: 30px;
`;

const FilterButton = styled.button`
  padding: 6px 10px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  background-color: ${({ selected, hovered }) =>
    selected ? "#0019F4" : hovered ? "#e0e0e0" : "white"};
  color: ${({ selected }) => (selected ? "white" : "black")};
  border: 1px solid ${({ selected }) => (selected ? "#4caf50" : "lightgray")};
`;

export default FilterButtons;
