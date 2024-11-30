"use client";

import React from "react";
import styled from "styled-components";
import Image from "next/image";
import LikeButton from "../LikeButton/LikeButton";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

const ReviewCard = ({ review, likedReviews, toggleLike, isOpen, toggleDropdown }) => {
  return (
    <Card>
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
          <span style={{ marginBottom: "20px" }}>|</span>
          <Date>{review.date}</Date>
        </UserInfo>
        <LikeButton isLiked={likedReviews[review.id]} onClick={() => toggleLike(review.id)} />
        <DropdownMenu isOpen={isOpen} toggleDropdown={toggleDropdown} />
      </CardHeader>
      <RatingContainer>
        <Rating>
          {Array.from({ length: Math.round(review.rating) }).map((_, i) => (
            <span style={{ marginRight: "-5px" }} key={i}>
              ⭐
            </span>
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
    </Card>
  );
};

export default ReviewCard;

const Card = styled.div`
  margin-bottom: 10px;
  padding-bottom: 5px;
  margin-left: 10px;
  margin-top: -20px;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  width: 100%;
`;

const AvatarWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 20px;
  flex-shrink: 0;
`;

const UserInfo = styled.div`
  margin-top: 20px;
  display: flex;
  margin-left: 5px;
`;

const Author = styled.span`
  font-weight: bold;
  margin-left: 8px;
  margin-right: 4px;
  font-size: 14px;
`;

const Date = styled.span`
  font-size: 15px;
  margin-left: 4px;
`;

const RatingContainer = styled.div`
  margin-left: 50px;
  display: flex;
`;

const Rating = styled.div`
  font-size: 14px;
  margin-top: -25px;
  margin-left: 20px;
`;

const CardContent = styled.div``;

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
