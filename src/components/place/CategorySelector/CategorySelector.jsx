import React from "react";

const CategorySelector = ({
  selectedCategory,
  setSelectedCategory,
  hoveredCategory,
  setHoveredCategory,
}) => {
  const categories = ["전체", "서비스", "음식점", "의료시설", "문화시설"];

  const categoryContainerStyle = {
    display: "flex",
    justifyContent: "flex-start",
    padding: "10px 0",
    marginBottom: "20px",
    gap: "10px",
    color: "black",
  };

  const categoryItemStyle = (isSelected, isHovered) => ({
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "bolder",
    backgroundColor: isSelected ? "blue" : isHovered ? "#e0e0e0" : "white",
    color: isSelected ? "white" : "black",
    border: "1px solid lightgray",
  });

  return (
    <div style={categoryContainerStyle}>
      {categories.map((category) => (
        <div
          key={category}
          style={categoryItemStyle(
            category === selectedCategory,
            category === hoveredCategory
          )}
          onClick={() => setSelectedCategory(category)}
          onMouseEnter={() => setHoveredCategory(category)}
          onMouseLeave={() => setHoveredCategory(null)}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default CategorySelector;
