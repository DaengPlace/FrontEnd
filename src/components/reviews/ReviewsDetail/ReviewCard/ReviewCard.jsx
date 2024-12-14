"use client";

import React from "react";
import styled from "styled-components";
import Image from "next/image";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import axios from "axios";

const ReviewCard = ({ review, setReview, likedReviews, isOpen, toggleDropdown, accessToken }) => {
  const NativeDate = global.Date;

  const formatDate = (dateString) => {
    const date = new NativeDate(dateString); 
    if (isNaN(date)) {
      return "Invalid date";
    }
    const kstOffset = 9 * 60 * 60 * 1000; 
    const localDate = new NativeDate(date.getTime() + kstOffset);
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, "0");
    const day = String(localDate.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const toggleLike = async (placeId, reviewId) => {
    try {
      const isCurrentlyLiked = review.liked;

      const response = isCurrentlyLiked
        ? await axios.delete(
            `https://api.daengplace.com/reviews/likes/${placeId}/and/${reviewId}`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
          )
        : await axios.post(
            `https://api.daengplace.com/reviews/likes/${placeId}/and/${reviewId}`,
            {},
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );

      const { likeCount, liked } = response.data.data;
      setReview((prevReview) => ({
        ...prevReview,
        liked,
        likeCount,
      }));
    } catch (error) {
      console.error("Failed to toggle like:", error.response?.data || error.message);
      alert(error.response?.data?.message || "An error occurred while toggling like.");
    }
  };

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
          <Author>{review.memberNickname}</Author>
          <span style={{ marginBottom: "20px" }}>|</span>
          <Date>{formatDate(review.createdAt)}</Date>
        </UserInfo>
        <LikeButton
                onClick={(event) => toggleLike(review.placeId, review.reviewId, event)}
            >
                {review.liked ? (
                    <FavoriteIcon style={{ color: "red" }} />
                ) : (
                    <FavoriteBorderIcon style={{ color: "#ccc" }} />
                )}
          </LikeButton>
        <DropdownMenu isOpen={isOpen} toggleDropdown={toggleDropdown} reviewId={review.reviewId} 
          placeId={review.placeId} 
          accessToken={accessToken} />
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
            src={review.image || "/assets/image.png"}
            alt={`리뷰 이미지 ${review.reviewId}`}
            width={540}
            height={540}
            objectFit="cover"
            style={{ borderRadius: "10px" }}
            priority
          />
        </ImageWrapper>
        <Text>{review.content}</Text>
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
const LikeButton = styled.div`
  cursor: pointer;
  margin-left: auto;
  width:40px;
  height:30px;
  align-items: center;
  justify-content: center;
  &:hover svg {
    transform: scale(1.2);
  }
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
  margin-top: 2px;
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
