import React from "react";
import styled from "styled-components";

const tags = [
  { icon: "🐕", text: "활동적인 아이에게 추천해요", count: 12 },
  { icon: "🐶", text: "다른 강아지들과 어울릴 수 있어요", count: 10 },
  { icon: "🎉", text: "특색 있는 공간이에요", count: 8 },
  { icon: "💸", text: "가격이 합리적이에요", count: 10 },
];

const TagSection = () => {
  const maxCount = Math.max(...tags.map((tag) => tag.count));

  return (
    <TagList>
      <Header>
        <Span>한눈에 보는 특징</Span>
        <ParticipantInfo>3명 참여</ParticipantInfo>
      </Header>
      {tags.map((tag, index) => {
        const percentage = (tag.count / maxCount) * 100;
        return (
          <TagItem key={index} percentage={percentage}>
            <TagIcon>{tag.icon}</TagIcon>
            <TagText>{tag.text}</TagText>
            <TagCount>{tag.count}</TagCount>
          </TagItem>
        );
      })}
    </TagList>
  );
};

export default TagSection;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


const TagList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 20px;
`;

const TagItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(
    to right,
    #ffe082 ${(props) => props.percentage}%,
    #f9f9f9 ${(props) => props.percentage}%
  );
  padding: 10px;
  border-radius: 10px;
  margin-left: 10px;
  margin-right: 10px;
`;

const TagIcon = styled.span`
  font-size: 18px;
`;

const TagText = styled.span`
  flex: 1;
  margin-left: 10px;
`;

const TagCount = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #555;
`;
const Span = styled.span`
  font-size: 20;
  font-weight: bold;
  padding:10px; 
`
const ParticipantInfo = styled.span`
  font-size: 14px;
  font-weight: bold;
  text-align: right;
  margin-right: 10px;
`;