import React from "react";
import styled from "styled-components";

const CategorySelector = ({
  selectedCategory,
  setSelectedCategory,
  hoveredCategory,
  setHoveredCategory,
}) => {
  const categories = ["전체", "서비스", "음식점", "의료시설", "문화시설"];

  return (
    <CategoryContainer>
      {categories.map((category) => (
        <CategoryItem
          key={category}
          isSelected={category === selectedCategory}
          isHovered={category === hoveredCategory}
          onClick={() => setSelectedCategory(category)}
          onMouseEnter={() => setHoveredCategory(category)}
          onMouseLeave={() => setHoveredCategory(null)}
        >
          {category}
        </CategoryItem>
      ))}
    </CategoryContainer>
  );
};

export default CategorySelector;

const CategoryContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 10px 0;
  margin-bottom: 10px;
  margin-top: -15px;
  gap: 5px;
  color: black;
`;

const CategoryItem = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isSelected", "isHovered"].includes(prop),
})`
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bolder;
  background-color: ${({ isSelected, isHovered }) =>
    isSelected ? "blue" : isHovered ? "#e0e0e0" : "white"};
  color: ${({ isSelected }) => (isSelected ? "white" : "black")};
  border: 1px solid lightgray;
`;
