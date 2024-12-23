import React from "react";
import styled from "styled-components";

const TagSection = ({ tags, onTagClick }) => (
  <Section>
    <SubTitle>어떤 점이 좋았나요?</SubTitle>
    <SubSubTitle>이 곳에 어울리는 키워드를 골라주세요. (3개 이상)</SubSubTitle>
    <TagList>
      {[
        "🐕 활동적인 아이에게 추천해요",
        "🤫 조용한 아이에게 추천해요",
        "🐶 다른 강아지들과 어울릴 수 있어요",
        "🧍‍ 주인과 단 둘이 재밌게 놀 수 있어요",
        "🙋 다른 사람들과 어울릴 수 있어요",
        "🎉 특색있는 공간이에요",
        "✨ 깔끔해요",
        "💸 가격이 합리적이에요",
        "🌻 뷰가 좋아요",
      ].map((tag) => (
        <Tag
          key={tag}
          selected={tags.includes(tag)}
          onClick={() => onTagClick(tag)}
        >
          {tag}
        </Tag>
      ))}
    </TagList>
  </Section>
);

export default TagSection;

const Section = styled.div`
  width: 100%;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
  border-radius: 20px;
  padding: 10px 20px;
  background-color: white;
`;

const SubTitle = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  padding: 10px 5px;
`;

const SubSubTitle = styled.h4`
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-left: 6px;
  margin-top: -15px;
  color: ${({ theme }) => theme.colors.divider};
`;

const TagList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Tag = styled.button`
  padding: 10px;
  font-size: 14px;
  border: 1px solid ${({ selected }) => (selected ? "#0019F4" : "#e0e0e0")};
  background-color: white;
  color: ${({ selected }) => (selected ? "#0019F4" : "#333")};
  border-radius: 10px;
  cursor: pointer;

`;
