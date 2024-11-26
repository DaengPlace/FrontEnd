import React from "react";
import styled from "styled-components";

const Tabs = ({
  categories,
  selectedCategory,
  hoveredCategory,
  onCategoryClick,
  onHover,
}) => (
  <TabsContainer>
    {categories.map((category) => (
      <TabButton
        key={category}
        onClick={() => onCategoryClick(category)}
        onMouseEnter={() => onHover(category)}
        onMouseLeave={() => onHover(null)}
        selected={category === selectedCategory}
        hovered={category === hoveredCategory}
      >
        {category}
      </TabButton>
    ))}
  </TabsContainer>
);

const TabsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  margin-left: 20px;
`;

const TabButton = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== "hovered" && prop !== "selected",
  })`
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bolder;
  background-color: ${({ selected, hovered }) =>
    selected ? "#0019F4" : hovered ? "#e0e0e0" : "white"};
  color: ${({ selected }) => (selected ? "white" : "black")};
  border: 1px solid lightgray;
`;

export default Tabs;
