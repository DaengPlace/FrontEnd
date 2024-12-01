"use client";
import React from "react";
import styled from "styled-components";

const Tabs = ({ selectedCategory, onCategoryClick, hoveredCategory, setHoveredCategory }) => {
  const categories = ["전체", "서비스", "음식점", "의료시설", "문화시설"];

  return (
    <TabsContainer>
      {categories.map((category) => (
        <Tab
          key={category}
          onClick={() => onCategoryClick(category)}
          onMouseEnter={() => setHoveredCategory(category)}
          onMouseLeave={() => setHoveredCategory(null)}
          selected={category === selectedCategory}
          hovered={category === hoveredCategory}
        >
          {category}
        </Tab>
      ))}
    </TabsContainer>
  );
};

export default Tabs;

const TabsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  margin-left: 20px;
`;

const Tab = styled.button.withConfig({
  shouldForwardProp: (prop) => !["hovered", "selected"].includes(prop),
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
