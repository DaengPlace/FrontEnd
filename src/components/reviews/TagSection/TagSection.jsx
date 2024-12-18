import React, { useState } from "react";
import styled from "styled-components";
import { ChevronDown } from "@styled-icons/bootstrap/ChevronDown";
import { ChevronUp } from "@styled-icons/bootstrap/ChevronUp";
import theme from "@/styles/theme";

const tags = [
  {  traitTagId: 1, icon: "🐕", text: "활동적인 아이에게 추천해요", count: 0 },
  {  traitTagId: 2, icon: "🤫", text: "조용한 아이에게 추천해요", count: 0 },
  {  traitTagId: 3, icon: "🐶", text: "다른 강아지들과 어울릴 수 있어요", count: 0 },
  {  traitTagId: 4, icon: "🧍‍", text: "주인과 단 둘이 재밌게 놀 수 있어요", count: 0 },
  {  traitTagId: 5, icon: "🙋", text: "다른 사람들과 어울릴 수 있어요", count: 0 },
  {  traitTagId: 6, icon: "🎉", text: "특색있는 공간이에요", count: 0 },
  {  traitTagId: 7, icon: "✨", text: "깔끔해요", count: 0 },
  {  traitTagId: 8, icon: "💸", text: "가격이 합리적이에요", count: 0 },
  {  traitTagId: 9, icon: "🌻", text: "뷰가 좋아요", count: 0 },
];

const TagSection = ({ reviews }) => {
  const [showAllTags, setShowAllTags] = useState(false);

  const updatedTags = tags.map((tag) => {
    const count = reviews.reduce((acc, review) => {
      const isMatched = review.traitTags?.some(
        (trait) => trait.traitTagId === tag.traitTagId
      );
      return acc + (isMatched ? 1 : 0);
    }, 0);
  
    return { ...tag, count };
  });

  const totalReviews = reviews.length || 1;
  const displayedTags = showAllTags ? updatedTags : updatedTags.slice(0, 4);

  return (
    <TagListContainer>
      <Header>
        <Span>한눈에 보는 특징</Span>
        <ParticipantInfo>{reviews.length}명 참여</ParticipantInfo>
      </Header>
      <TagList>
        {displayedTags.map((tag, index) => {
          const percentage = (tag.count / totalReviews) * 100;
          return (
            <TagItem key={index} percentage={percentage}>
              <TagIcon>{tag.icon}</TagIcon>
              <TagText>{tag.text}</TagText>
              <TagCount>{tag.count}</TagCount>
            </TagItem>
          );
        })}
      </TagList>


      {!showAllTags ? (
        <ButtonWrapper onClick={() => setShowAllTags(true)}>
          <MoreButton>더보기</MoreButton>
          <ChevronDown style={{color: 'black'}} width={16} height={16} />
        </ButtonWrapper>
      ) : (
        <ButtonWrapper onClick={() => setShowAllTags(false)}>
          <MoreButton>더보기</MoreButton>
          <ChevronUp style={{color: 'black'}} width={16} height={16} />
        </ButtonWrapper>
      )}

    </TagListContainer>
  );
};

export default TagSection;

const TagListContainer = styled.div`
  margin-top: 20px;
`;

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

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 10px;
`;

const TagItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(
    to right,
    #ffe082 ${(props) => props.percentage}%,
    white ${(props) => props.percentage}% 
  );
  padding: 10px;
  border-radius: 10px;
  margin-left: 10px;
  margin-right: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
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
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
`;

const ParticipantInfo = styled.span`
  font-size: 14px;
  font-weight: bold;
  text-align: right;
  margin-right: 10px;
`;

const MoreButton = styled.div`
  padding: 10px;
  color: black;
  text-align: center;
  font-size: 15px;
`;
