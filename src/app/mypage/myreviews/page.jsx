"use client";

import Header from '@/components/common/Header/Header';
import { OnlyHomeIcon } from '@/components/common/Header/Header.stories';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { reviews } from "@/data/reviewData";
import theme from "@/styles/theme.js";
import { MoreVert, Favorite, FavoriteBorder } from "@mui/icons-material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Image from 'next/image';

const MyReviews = () => {

  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null); // 드롭다운 참조를 위한 Ref

  const handleDropdownToggle = (id) => {
    setActiveDropdown((prev) => (prev === id ? null:id));
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      // 드롭다운 외부 클릭 감지
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null); // 드롭다운 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <Container>
      <Header 
        title="리뷰 목록" 
        showFavoriteIcon={OnlyHomeIcon.args.showFavoriteIcon} 
        showMapIcon={OnlyHomeIcon.args.showMapIcon}
        showHomeIcon={OnlyHomeIcon.args.showHomeIcon}  
      />
    
      <ReviewsList>

        {reviews.map((review) => (
          <ReviewCard key={review.id}>

            <CardHeader>
              <Category>{review.category}</Category>
              <FacilityTitle>{review.title}</FacilityTitle>
            </CardHeader>

            <CardContent>

              <ReviewHeader>
                <AuthorInfo>
                  <AuthorImage src="/assets/mypage/defaultProfileImage.png" alt={review.title} width={50} height={50} />
                  <TextContent>
                    <Author>{review.author} | <Date>{review.date}</Date></Author>
                    <Rating><span>★</span> {review.rating.toFixed(1)}</Rating>
                  </TextContent>
                </AuthorInfo>
                <Actions>
                  <MoreVert onClick={() => handleDropdownToggle(review.id)} />  
                  {activeDropdown === review.id && (
                    <Dropdown ref={dropdownRef}>
                      <DropdownItem>수정</DropdownItem>
                      <DropdownItem>삭제</DropdownItem>
                    </Dropdown>
                  )}

                </Actions>
              </ReviewHeader>

              <ReviewContent>
                <Content>{review.review}</Content>
              </ReviewContent>

              <VisualSection>
                <ReviewImage src={review.image} alt={review.title} width={120} height={120} />
              </VisualSection>
            </CardContent>

          </ReviewCard>
        ))}

      </ReviewsList>
    
    </Container>
  );
};

export default MyReviews;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReviewsList = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 70px;
`;

const ReviewCard = styled.div`
  width: 100%;
  border-radius: 20px;
  // box-shadow: 0 4px 6px rgba(0,0,0,0.2);
  border: 1px solid ${theme.colors.divider};
  margin-bottom: 20px;
  overflow: hidden;
  cursor: pointer;
  padding: 5px;
`;

const CardHeader = styled.div`
  margin: 20px 20px 10px 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${theme.colors.divider};
`;

const Category = styled.div`
  width: 120px;
  height: 24px;
  background-color: ${theme.colors.tertiary};
  color: white;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-size: 13px;
  font-weight: bold;
`;

const FacilityTitle = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-top: 10px;
`;

const CardContent = styled.div`

`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorImage = styled(Image)`
  width: 50px;
  height: 50px;
`;

const TextContent = styled.div`
  padding-left: 10px;
`;

const Author = styled.span`

`;

const Date = styled.span`

`;

const Rating = styled.div`
  font-size: 13px;
  padding-top: 3px;
  color: ${theme.colors.divider};
  span {
    color: #FFBF00;
  }
`;

const Actions = styled.div`
  color: ${theme.colors.divider}
`;

const Dropdown = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  width: 100px;
  background-color: white;
  text-align: center;

  border: 1px solid ${theme.colors.divider};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  z-index: 1000;
  padding: 10px 0;
`;  

const DropdownItem = styled.div`
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: ${theme.colors.tertiary};
    color: white;
    border-radius: 8px;
  }
`;

const ReviewContent = styled.div`
  padding: 10px 0 10px 20px;
  font-size: 14px;
`;

const Content = styled.div`

`;

const VisualSection = styled.div`
  padding-left: 20px;
`;

const ReviewImage = styled(Image)`
  width: 120px;
  height: 120px;
`;