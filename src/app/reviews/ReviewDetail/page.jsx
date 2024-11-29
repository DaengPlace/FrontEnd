"use client";

import React, {useState} from "react";
import styled from "styled-components";
import Image from "next/image";
import Header from "@/components/common/Header/Header";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { WithMapIcon } from "@/components/common/Header/Header.stories";
import Divider from "@/components/common/Divider/Divider";

const ReviewDetailPage = () => {
    const [likedReviews, setLikedReviews] = useState({});
    const toggleLike = (id) => {
        setLikedReviews((prev) => ({
        ...prev,
        [id]: !prev[id],
        }));
    };
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };
    
  const review = {
    id: 1,
    category: "반려동물용품점",
    title: "간식곳간",
    author: "뽀삐엄마",
    date: "2024.11.01",
    rating: 5,
    image: "/assets/image.png",
    review: `
      야외 공간이 넓어서 뛰어놀기 참 좋네요!
      재방문 의사 100% 입니다^^
      음료 종류도 다양하고 아이들 간식도 정말 다양해요 ㅎㅎ
    `,
  };

  return (
    <>
      <HeaderWrapper>
        <Header
          title="리뷰 상세"
          showFavoriteIcon={WithMapIcon.args.showFavoriteIcon}
          showMapIcon={WithMapIcon.args.showMapIcon}
        />
      </HeaderWrapper>
        <SubHeader>
          <CategoryBadge>{review.category}</CategoryBadge>
          <Title>{review.title}</Title>
          <Divider />
        </SubHeader>
        <Container>
        <ReviewCard>
        <CardHeader>
          <AvatarWrapper>
              <Image
                src="/assets/image (1).png"
                alt="사용자 프로필"
                width={60}
                height={60}
                style={{ borderRadius: "50%" }}
              />
            </AvatarWrapper>
            <UserInfo>
            <Author>{review.author}</Author>
            <span style={{marginBottom:"20px"}}>|</span>
            <Date>{review.date}</Date>
            <LikeButton onClick={() => toggleLike(review.id)}>
              {likedReviews[review.id] ? (
                <FavoriteIcon style={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon style={{ color: "#ccc" }} />
              )}
            </LikeButton>
            <IconButton onClick={toggleDropdown}>
                <MoreVertIcon />
            </IconButton>
            {isOpen && (
                <Menu>
                <MenuItem>수정</MenuItem>
                <MenuItem>삭제</MenuItem>
                </Menu>
            )}
            </UserInfo>
            </CardHeader>
            <RatingContainer>
            <Rating>
              {Array.from({ length: Math.round(review.rating) }).map((_, i) => (
                <span style={{marginRight:"-5px"}}key={i}>⭐</span>
              ))}
            </Rating>
            </RatingContainer>
          <CardContent>
            <ImageWrapper>
              <Image
                src={review.image}
                alt={`리뷰 이미지 ${review.id}`}
                width={540} 
                height={540} 
                objectFit="cover" 
                style={{ borderRadius: "10px" }}
                priority
                />
            </ImageWrapper>
            <Text>{review.review}</Text>
          </CardContent>
        </ReviewCard>
      </Container>
    </>
  );
};

export default ReviewDetailPage;

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: 1000;
  background-color: white;
`;

const Container = styled.div`
  margin-bottom: 20px;
  margin-left: 10px;
  padding: 20px 20px;
  margin-right: 10px;
`;

const SubHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 16px;
  margin-top: 70px;
  margin-left: 20px;
`;

const CategoryBadge = styled.div`
  display: inline-block;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  background: #01003f;
  border-radius: 10px;
  text-align: center;
  line-height: 1;
  white-space: nowrap;
`;
const UserInfo = styled.div`
  margin-top: 20px;
  display: flex;
  margin-left: 5px;
`
const Title = styled.h2`
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ReviewCard = styled.div`
  margin-bottom: 10px;
  padding-bottom: 5px;
  margin-top: 15px;
  margin-left: 10px;
  cursor: pointer;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  margin-top: -60px;
  width: 100%;
`;
const AvatarWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 20px;
  margin-left: -20px;
  flex-shrink: 0;
`;
const RatingContainer = styled.div`
  margin-left: 50px;
  display: flex;
`
const Author = styled.span`
  font-weight: bold;
  margin-left: 8px;
  margin-right: 4px;
  margin-bottom: 20px;
  font-size: 14px;
  white-space: nowrap;
`;

const Date = styled.span`
  font-size: 15px;
  margin-bottom: 17px;
  margin-left: 4px;
  margin-top: 2px;
`;

const CardContent = styled.div``;

const Rating = styled.div`
  font-size: 14px;
  margin-top: -25px;
  margin-left: 1px;
`;

const Text = styled.p`
  margin-top: 20px;
  font-size: 16px;
`;

const ImageWrapper = styled.div`
  margin-top: 15px;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
`;
const LikeButton = styled.div`
  cursor: pointer;
  margin-left: 297px;
  width:40px;
  height:30px;
  margin-top: 5px;

  &:hover svg {
    transform: scale(1.2); 
  }
`;
const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(-16px) translateY(-2.5px);
  svg {
    color: #ABABAB; 
    transition: transform 0.2s ease, color 0.2s ease;
  }
  &:hover svg {
    transform: scale(1.2);
  }
`;
const Menu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 100px;
  z-index: 1000;
  overflow: hidden;
`;

const MenuItem = styled.div`
  padding: 8px 12px;
  font-size: 14px;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #f4f4f4;
  }
`;